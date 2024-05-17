<script setup lang="ts">
import {
	Dialog,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogScrollContent,
	DialogFooter
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

import { Label } from '@/components/ui/label'

import { Button } from '@/components/ui/button'
import { ref, reactive, inject, watch, computed } from 'vue'
import { cn } from '@/lib/utils'
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
import type { Task } from './data/schema'
import { useTableStore } from '@/store/table'
import { useToast } from '@/components/ui/toast/use-toast'
import { Checkbox } from '@/components/ui/checkbox'
import type { GenericSelectListModel, SelectList } from '@/common/SelectList'
import _ from 'lodash'

const tableStore = inject('tableStore', useTableStore('customer'))

interface DataTableEditModalProps {
	row: Task
}

const props = defineProps<DataTableEditModalProps>()

// Form Modal
interface Company {
	name?: string
	business_registration_id: string
	whatsapp_phone_number: string
	email: string
	// Address

	streetAddress?: string
	postcode?: string
	city?: string
	state?: string
	country?: number | null
}

const form = reactive<Company>({
	name: '',
	business_registration_id: '',
	whatsapp_phone_number: '',
	email: '',

	streetAddress: '',
	postcode: '',
	city: '',
	state: '',
	country: 0
})

const countries: GenericSelectListModel = reactive({
	is_loading: false,
	is_open: false,
	data: [{ value: '', label: '' }]
})

const is_loading = ref(true)
const is_dialog_open = ref(false)
const error_message = ref<String | null>(null)
const { toast } = useToast()

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
	} catch (error: any) {
		var message = error.response.data.message || ''
		toast({
			title: 'Whoops, something went wrong',
			description: message,
			variant: 'destructive'
		})
	} finally {
		countries.is_loading = false
	}
}

watch(
	searchCountryQuery,
	_.debounce(async (newQuery) => {
		await fetchCountries(newQuery, form.country!)
	}, 300)
)
async function init() {
	try {
		const response = await axios.get(`/api/customer/${props.row.id}/`)

		Object.assign(form, response.data.Result)
		if (form.country) {
			await fetchCountries('', form.country)
		}
		is_loading.value = false
	} catch (error) {
		is_loading.value = false
	}
}

function validateForm() {
	const validations = [
		{ condition: form.name === '', message: 'Name cannot be blank' },
		{ condition: form.whatsapp_phone_number === '', message: 'Whatsapp Phone cannot be blank' },
		{ condition: form.email === '', message: 'Email cannot be blank' },
		{ condition: form.country == null, message: 'Country cannot be blank' }
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

	// process
	is_loading.value = true
	try {
		const response = await axios.patch(
			`/api/customer/${props.row.id}/`,
			{
				...form
			},
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
		toggleDialog()
		await tableStore.refresh(tableStore.page_index)
		toast({
			title: response.data.Result,
			variant: 'success'
		})
	} catch (error) {
		let errorMessage = 'An unexpected error occurred.'
		toast({
			title: 'Whoops, something went wrong',
			description: errorMessage || '',
			variant: 'destructive'
		})
	} finally {
		is_loading.value = false
	}
}
function toggleDialog() {
	is_dialog_open.value = !is_dialog_open.value

	if (is_dialog_open.value) {
		init()
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
				class="hidden h-8 ml-2 lg:flex"
				@click="toggleDialog"
			>
				<!-- <MixerHorizontalIcon class="mr-2 h-4 w-4" /> -->
				<VIcon name="fa-pen" class="size-4" />
			</Button>
		</div>
		<Dialog :open="is_dialog_open" @update:open="is_dialog_open = $event">
			<DialogScrollContent :isSideBar="false" class="sm:max-w-[700px]">
				<DialogHeader>
					<DialogTitle>Edit Custsomer</DialogTitle>
					<DialogDescription>
						Insert the details of the customer here. Click edit when you're done.
					</DialogDescription>
				</DialogHeader>
				<div>
					<div class="grid gap-4 py-4">
						<div class="grid grid-cols-4 items-center gap-4">
							<Label for="name" class="text-right">
								Company Name
								<span
									class="absolute translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 text-red-500 rounded-full"
									>*</span
								>
							</Label>
							<Input
								id="name"
								v-model="form.name"
								placeholder="Geroge Sdn Bhd"
								class="col-span-3"
							/>
						</div>
						<div class="grid grid-cols-4 items-center gap-4">
							<Label for="whatsapp_phone" class="text-right required:">
								Whatsapp Phone
								<span
									class="absolute translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 text-red-500 rounded-full"
									>*</span
								>
							</Label>
							<Input
								id="whatsapp_phone"
								v-model="form.whatsapp_phone_number"
								placeholder="01110155555"
								class="col-span-3"
							/>
						</div>
						<div class="grid grid-cols-4 items-center gap-4">
							<Label for="email" class="text-right leading-normal">
								Email
								<span
									class="absolute translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 text-red-500 rounded-full"
									>*</span
								>
							</Label>
							<Input
								id="email"
								v-model="form.email"
								placeholder="hello@example.com"
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
							<Label for="business_registration_id" class="text-right">
								Business ID
							</Label>
							<Input
								id="business_registration_id"
								v-model="form.business_registration_id"
								placeholder="820720-X"
								class="col-span-3"
							/>
						</div>
						<Separator />
						<div class="grid grid-cols-4 items-center gap-4">
							<Label for="email" class="text-right leading-normal"> Address </Label>
							<Input
								id="email"
								v-model="form.streetAddress"
								placeholder="Lot 2000, Taman Jalan Indah"
								class="col-span-3"
							/>
						</div>
						<div class="grid grid-cols-4 items-center gap-4">
							<Label for="state" class="text-right leading-normal"> State </Label>
							<Input
								id="state"
								v-model="form.state"
								placeholder="Selangor"
								class="col-span-3"
							/>
						</div>
						<div class="grid grid-cols-4 items-center gap-4">
							<Label for="city" class="text-right leading-normal"> City </Label>
							<Input
								id="city"
								v-model="form.city"
								placeholder="Puchong"
								class="col-span-3"
							/>
						</div>
						<div class="grid grid-cols-4 items-center gap-4">
							<Label for="email" class="text-right leading-normal"> Post Code </Label>
							<Input
								id="email"
								v-model="form.postcode"
								placeholder="22000"
								class="col-span-3"
							/>
						</div>
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
						Edit</Button
					>
				</DialogFooter>
			</DialogScrollContent>
		</Dialog>
	</div>
</template>
