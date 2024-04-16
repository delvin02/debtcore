<script setup lang="ts">
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogFooter
} from '@/components/ui/dialog'

import { Input } from '@/components/ui/input'
import { Calendar } from '@/components/ui/calendar'
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
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import Separator from '../ui/separator/Separator.vue'
import axios from 'axios'
import { format, parseISO } from 'date-fns'
import { useTableStore } from '@/store/table'
import type { Task } from '@/components/Debt/data/schema'
import { useToast } from '@/components/ui/toast/use-toast'
import type { GenericSelectListModel, SelectList } from '@/common/SelectList'
import _ from 'lodash'


// Form Modal
interface CompanyForm {
  name: string
  country: number | ''
  whatsapp_business_account_id: string
  whatsapp_phone_number_id: string
	notes: string
	is_active: boolean
	is_onboarded: boolean
	live_date: Date | string | ''
}

const form = reactive<CompanyForm>({
	name: '',
  country: '',
  whatsapp_business_account_id: '',
  whatsapp_phone_number_id: '',
	notes: '',
	is_active: false,
	is_onboarded: false,
	live_date: ''
})

const countries: GenericSelectListModel = reactive({
	is_loading: false,
	is_open: false,
	data: [{ value: '', label: '' }]
})


const searchCountryQuery = ref('')

async function fetchCountries(query?: string) {
	countries.is_loading = true
	try {
		const response = await axios.get(
			`http://127.0.0.1:8000/api/country/list?search=${query || ''}`,
			{
				withCredentials: true,
				headers: {
					'Cache-Control': 'no-cache',
					Pragma: 'no-cache',
					Expires: '0'
				}
			}
		)

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
		if (is_dialog_open.value) {
			await fetchCountries(newQuery)
		}
	}, 500)
)

async function init() {
	try {
		const response = await axios.get(`http://127.0.0.1:8000/api/company/setup/`)

		Object.assign(form, response.data.Result);


		is_loading.value = false
	} catch (error) {
		is_loading.value = false
	}
}

function validateForm() {
	const validations = [
		{ condition: form.name == null, message: 'Invoice cannot be blank' },
		{ condition: form.country?.toString == null, message: 'Due Date cannot be blank' },
		{ condition: form.whatsapp_business_account_id == null, message: 'Status cannot be blank' },
		{ condition: form.whatsapp_phone_number_id == null, message: 'Customer cannot be blank' }
	]

	for (let validation of validations) {
		if (validation.condition) {
			error_message.value = validation.message
			return false
		}
	}
	return true
}

async function submit() {
	// checking
	const isValid = validateForm()
	if (!isValid) {
		return
	}
	is_loading.value = true
	try {
		const response = await axios.patch(
			`http://127.0.0.1:8000/api/debt/1/`,
			{
				...form
			},
			{
				headers: {
					'Content-Type': 'application/json',
				}
			}
		)
		toggleDialog()
		toast({
			title: response.data.Result,
			variant: 'success'
		})
	} catch (error) {
		let errorMessage = 'An unexpected error occurred.'
		if (axios.isAxiosError(error) && error.response) {
			if (error.response.data.details && typeof error.response.data.details === 'object') {
				const errorKeys = Object.keys(error.response.data.details)
				if (errorKeys.length > 0 && error.response.data.details[errorKeys[0]].length > 0) {
					errorMessage = error.response.data.details[errorKeys[0]][0]
				}
			} else if (error.response.data.error) {
				errorMessage = error.response.data.error
			}
		}
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
		fetchCountries(searchCountryQuery.value)
	}
}

function handleCountrySelect(country: any) {
	form.country = country.id
	countries.is_open = false
}



function updateDueDate(payload: any) {
	const date = new Date(payload)
	form.live_date = format(date, 'yyyy-MM-dd')
}
</script>

<template>
	<div>
		<div>
			<Button
				variant="default"
				size="sm"
				class="p-2"
				@click="toggleDialog"
			>
				<!-- <MixerHorizontalIcon class="mr-2 h-4 w-4" /> -->
				Edit Company
			</Button>
		</div>
		<Dialog :open="is_dialog_open" @update:open="is_dialog_open = $event">
			<DialogContent :isSideBar="false" class="sm:max-w-[700px]">
				<DialogHeader>
					<DialogTitle>Edit Debt</DialogTitle>
					<DialogDescription>
						Insert the details of the debt here. Click edit when you're done.
					</DialogDescription>
				</DialogHeader>
				<!-- :validation-schema="vendorSchema" -->
				<div class="grid gap-4 py-4">
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="invoice" class="text-right">
							Invoice
							<span
								class="absolute translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 text-red-500 rounded-full"
								>*</span
							>
						</Label>
						<Input
							id="invoice"
							v-model="form.name"
							placeholder="INV-001"
							class="col-span-3"
						/>
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="customer" class="text-right leading-normal">
							Customer
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
												: 'Select customer'
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
						<Label for="whatsapp_business_id" class="text-right">
							WABA ID
							<span
								class="absolute translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 text-red-500 rounded-full"
								>*</span
							>
						</Label>
						<Input
							id="whatsapp_business_id"
							v-model="form.whatsapp_business_account_id"
							placeholder="XXXXXXXXXXXX"
							class="col-span-3"
						/>
					</div>
				</div>
				<Separator />
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
