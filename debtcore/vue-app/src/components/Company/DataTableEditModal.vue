<script setup lang="ts">
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter
} from '@/components/ui/dialog'

import { Input } from '@/components/ui/input'

import { Label } from '@/components/ui/label'

import { Button } from '@/components/ui/button'
import { ref, reactive, inject, watch } from 'vue'
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

const tableStore = inject('tableStore', useTableStore('company'))

interface DataTableEditModalProps {
	row: Task
}

const props = defineProps<DataTableEditModalProps>()

// Form Modal
interface Company {
	id: number
	name?: string
	country?: number | null
	phone?: string
	email?: string
	website?: string
	// country: string;
	whatsapp_business_account_id: string
	is_active: boolean
}

const form = reactive<Company>({
	id: props.row.id,
	name: props.row.name,
	country: null,

	phone: '',
	email: '',
	website: '',

	//
	whatsapp_business_account_id: '',
	is_active: false
})

const countries: GenericSelectListModel = reactive({
	is_loading: false,
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
		toast({
			title: 'Whoops, something went wrong',
			description: 'There was an error fetching the select list',
			variant: 'destructive'
		})
	} finally {
		countries.is_loading = false
	}
}

const is_loading = ref(true)
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

async function init() {
	try {
		const response = await axios.get(`/api/company/${props.row.id}/`)

		Object.assign(form, response.data.Result)
		if (form.country) {
			await fetchCountries('', form.country)
		}
		is_loading.value = false
	} catch (error) {
		toast({
			title: 'Whoops, something went wrong',
			description: 'Failed to retrieved the data',
			variant: 'destructive'
		})
	} finally {
		is_loading.value = false
	}
}

function validateForm() {
	const validations = [
		{ condition: form.name === '', message: 'Name cannot be blank' },
		{ condition: form.country?.toString == null, message: 'Country cannot be blank' }
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
			`http://127.0.0.1:8000/api/company/${props.row.id}/`,
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
			description: errorMessage,
			variant: 'destructive'
		})
	} finally {
		is_loading.value = false
	}
}
function toggleDialog() {
	if (!is_dialog_open.value) {
		init()
	}
	is_dialog_open.value = !is_dialog_open.value
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
			<Button variant="default" size="sm" class="h-8 ml-2 flex" @click="toggleDialog">
				<VIcon name="fa-pen" class="size-4" />
			</Button>
		</div>
		<Dialog :open="is_dialog_open" @update:open="is_dialog_open = $event">
			<DialogContent :isSideBar="false" class="sm:max-w-[700px]">
				<DialogHeader>
					<DialogTitle>Edit Company</DialogTitle>
					<DialogDescription>
						Insert the details of the company here. Click edit when you're done.
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
												: 'Select Country'
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
										<CommandList>
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
						<Label for="name" class="text-right leading-normal">
							Whatsapp Business Account ID
						</Label>
						<Input
							id="name"
							v-model="form.whatsapp_business_account_id"
							placeholder="XXXXXXX-XXXXXXX-XXXXXXX-XXXXXXX"
							class="col-span-3"
						/>
					</div>
					<Separator />
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="is_active" class="text-right leading-normal"> Active </Label>
						<Checkbox
							id="is_active"
							:checked="form.is_active"
							@update:checked="form.is_active = !form.is_active"
						/>
					</div>
				</div>
				<div class="grid grid-cols-4 items-center gap-4" v-if="error_message">
					<Label for="name" class="text-red-600 col-span-3 col-start-2">
						<VIcon name="fa-exclamation-triangle" class="size-4 fill-red-600" />
						{{ error_message }}
					</Label>
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
			</DialogContent>
		</Dialog>
	</div>
</template>
