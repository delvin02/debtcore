<script setup lang="ts">
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogScrollContent
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ref, reactive, inject, watch } from 'vue'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import Separator from '../ui/separator/Separator.vue'
import axios from 'axios'
import { useTableStore } from '@/store/table'
import type { Task } from '@/components/Company/data/schema'
import { useToast } from '@/components/ui/toast/use-toast'
import type { GenericSelectListModel, SelectList } from '@/common/SelectList'
import _ from 'lodash'

const tableStore = inject('tableStore', useTableStore('company'))
// Form Modal
interface Company {
	name?: string
	phone: string
	email: string
	website: string

	// Address
	streetAddress: string
	city: string
	state: string
	// country: SelectList | null

	business_registration_id: string
	whatsapp_business_account_id: string
	country?: number | null
}

const form = reactive<Company>({
	name: '',
	phone: '',
	email: '',
	website: '',

	streetAddress: '',
	city: '',
	state: '',
	// country: null,
	business_registration_id: '',
	whatsapp_business_account_id: '',
	country: null
})

const countries: GenericSelectListModel = reactive({
	is_loading: true,
	is_open: false,
	data: [{ value: '', label: '' }]
})

const searchCountryQuery = ref('')

async function fetchCountries(query?: string, currentCountryId?: number) {
	countries.is_loading = true
	try {
		var url = `/api/country/list?search=${query}`
		if (currentCountryId) {
			url += `&current_country=${currentCountryId}`
		}
		const response = await axios.get(url, {
			withCredentials: true,
			headers: {
				'Cache-Control': 'no-cache',
				Pragma: 'no-cache',
				Expires: '0'
			}
		})
		countries.data = response.data.Result
	} catch (error) {
		console.error('There was an error fetching the select list:', error)
	} finally {
		countries.is_loading = false
	}
}

const is_loading = ref(false)
const is_dialog_open = ref(false)
const error_message = ref<String | null>(null)
const { toast } = useToast()

watch(
	searchCountryQuery,
	_.debounce(async (newQuery) => {
		if (countries.is_open) {
			await fetchCountries(newQuery, form.country!)
		}
	}, 500)
)

function validateForm() {
	const validations = [
		{ condition: form.name === '', message: 'Name cannot be blank' },
		{ condition: form.country == null, message: 'Whatsapp Phone cannot be blank' }
	]

	for (let validation of validations) {
		if (validation.condition) {
			error_message.value = validation.message
			return false
		}
	}

	return true // Indicate form is valid
}

async function submit() {
	// checking
	const isValid = validateForm()
	if (!isValid) {
		return
	}
	is_loading.value = true
	const drfCsrf = JSON.parse(document.getElementById('drf_csrf')?.textContent || '{}')
	try {
		await axios.post(
			'/api/company',
			{
				...form
			},
			{
				headers: {
					'Content-Type': 'application/json',
					[drfCsrf.csrfHeaderName]: drfCsrf.csrfToken
				}
			}
		)
		toggleDialog()
		await tableStore.refresh(tableStore.page_index)
		error_message.value = ''
		toast({
			title: 'Company created successfully.',
			variant: 'success'
		})
	} catch (error) {
		toast({
			title: 'Whoops, something went wrong',
			description: 'An unexpected error occured',
			variant: 'destructive'
		})
	} finally {
		is_loading.value = false
	}
}
function toggleDialog() {
	is_dialog_open.value = !is_dialog_open.value
	if (is_dialog_open.value) {
		fetchCountries(searchCountryQuery.value)
	}
}

function handleCountrySelect(country: any) {
	form.country = country.id
	countries.is_open = false
}

function updateCountryQuery(event: any) {
	searchCountryQuery.value = event.target.value
}
</script>

<template>
	<div>
		<div>
			<Button
				variant="default"
				size="sm"
				class="h-8 ml-2 flex"
				@click="toggleDialog"
			>
				<VIcon name="fa-plus" class="size-4" />
			</Button>
		</div>
		<Dialog :open="is_dialog_open" @update:open="is_dialog_open = $event">
			<DialogScrollContent :isSideBar="false" class="sm:max-w-[700px]">
				<DialogHeader>
					<DialogTitle>Create Company</DialogTitle>
					<DialogDescription>
						Insert the details of the company here. Click create when you're done.
					</DialogDescription>
				</DialogHeader>
				<!-- :validation-schema="vendorSchema" -->
				<div class="grid gap-4 py-4">
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="name" class="text-right required:"> Name </Label>
						<Input
							id="name"
							v-model="form.name"
							placeholder="Geroge Sdn Bhd"
							class="col-span-3"
						/>
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="country" class="text-right leading-normal">
							Country
							<span
								class="absolute translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 text-red-500 rounded-full"
								>*</span
							>
						</Label>
						<div class="col-span-3">
							<Popover v-model:open="countries.is_open">
								<PopoverTrigger as-child>
									<Button
										variant="outline"
										role="combobox"
										:aria-expanded="countries.is_open"
										class="w-full justify-between px-3"
										:disabled="countries.is_loading"
									>
										{{
											form.country
												? countries.data.find(
														(country) => country.id === form.country
													)?.label
												: 'Select country'
										}}
										<VIcon
											name="fa-circle-notch"
											v-if="countries.is_loading"
											animation="spin"
											class="w-4 h-4 mr-2"
										/>
										<VIcon
											v-else
											name="fa-angle-down"
											class="h-4 w-4 shrink-0 opacity-50"
										/>
									</Button>
								</PopoverTrigger>
								<PopoverContent class="w-[500px] p-1">
									<Command>
										<CommandInput
											class="h-9"
											v-model="searchCountryQuery"
											placeholder="Search country..."
											@input="updateCountryQuery"
										/>
										<CommandEmpty>No country found.</CommandEmpty>
										<CommandList v-if="!countries.is_loading">
											<CommandGroup>
												<CommandItem
													v-for="country in countries.data"
													:key="country.id"
													:value="country.value ?? ''"
													@select="() => handleCountrySelect(country)"
												>
													{{ country.label }}
													<VIcon
														name="fa-check"
														:class="[
															'ml-auto h-4 w-4',
															form.country === country.id
																? 'opacity-100'
																: 'opacity-0'
														]"
													/>
												</CommandItem>
											</CommandGroup>
										</CommandList>
										<CommandList v-else>
											<VIcon
												name="fa-circle-notch"
												v-if="true"
												animation="spin"
												speed="slow"
												class="w-fit h-fit mr-2 my-2 mx-auto"
											/>
										</CommandList>
									</Command>
								</PopoverContent>
							</Popover>
						</div>
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="phone" class="text-right required:"> Phone </Label>
						<Input
							id="phone"
							v-model="form.phone"
							placeholder="012-9886348"
							class="col-span-3"
						/>
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="email" class="text-right leading-normal"> Email </Label>
						<Input
							id="email"
							v-model="form.email"
							placeholder="hello@example.com"
							class="col-span-3"
						/>
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="website" class="text-right leading-normal"> Website </Label>
						<Input
							id="website"
							v-model="form.website"
							placeholder="www.kckok.my"
							class="col-span-3"
						/>
					</div>

					<Separator />
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="whatsapp_id" class="text-right leading-normal">
							Whatsapp Business Account ID
						</Label>
						<Input
							id="whatsapp_id"
							v-model="form.whatsapp_business_account_id"
							placeholder="XXXXXXX-XXXXXXX-XXXXXXX-XXXXXXX"
							class="col-span-3"
						/>
					</div>
				</div>
				<DialogFooter class="flex justify-end">
					<Button type="submit" @click="submit" :disabled="is_loading">
						<VIcon
							name="fa-circle-notch"
							v-if="is_loading"
							animation="spin"
							speed="slow"
							class="w-fit h-fit mr-2"
						/>
						Create</Button
					>
				</DialogFooter>
			</DialogScrollContent>
		</Dialog>
	</div>
</template>
