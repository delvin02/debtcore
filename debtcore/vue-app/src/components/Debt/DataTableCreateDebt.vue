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
import type { Task } from '@/components/Company/data/schema'
import { useToast } from '@/components/ui/toast/use-toast'
import type { GenericSelectListModel, SelectList } from '@/common/SelectList'
import _ from 'lodash'

const tableStore = inject('tableStore', useTableStore('debt'))
// Form Modal
interface Debt {
	invoice?: string
	customer?: number | null
	amount?: number | string | null
	invoice_date: Date | string | null
	term: number
	status: number | null
	document: File | null
}

const form = reactive<Debt>({
	invoice: '',
	customer: null,
	amount: null,
	invoice_date: null,
	term: 7,
	status: null,
	document: null
})

const customers: GenericSelectListModel = reactive({
	is_loading: false,
	is_open: false,
	data: [{ value: '', label: '' }]
})

const statuses: GenericSelectListModel = reactive({
	is_loading: false,
	is_open: false,
	data: [{ value: '', label: '' }]
})

const searchCustomerQuery = ref('')

async function fetchCountries(query?: string) {
	customers.is_loading = true
	try {
		const response = await axios.get(`/api/customer/list?search=${query || ''}`, {
			withCredentials: true,
			headers: {
				'Cache-Control': 'no-cache',
				Pragma: 'no-cache',
				Expires: '0'
			}
		})

		customers.data = response.data.Result
	} catch (error) {
		console.error('There was an error fetching the select list:', error)
	} finally {
		customers.is_loading = false
	}
}

async function fetchStatuses() {
	customers.is_loading = true
	try {
		const response = await axios.get(`/api/debt/status/create/list`, {
			withCredentials: true,
			headers: {
				'Cache-Control': 'no-cache',
				Pragma: 'no-cache',
				Expires: '0'
			}
		})

		statuses.data = response.data.Result
		// defaulted to 'draft'
		form.status = 1
	} catch (error) {
		let errorMessage = 'There was an error fetching the select list.'
		toast({
			title: 'Whoops, something went wrong',
			description: errorMessage,
			variant: 'destructive'
		})
	} finally {
		statuses.is_loading = false
	}
}

const is_loading = ref(false)
const is_dialog_open = ref(false)
const error_message = ref<String | null>(null)
const invoice_date = ref()
const { toast } = useToast()

watch(
	searchCustomerQuery,
	_.debounce(async (newQuery) => {
		if (is_dialog_open.value) {
			await fetchCountries(newQuery)
		}
	}, 500)
)

function validateForm() {
	const validations = [
		{ condition: form.invoice === '', message: 'Invoice cannot be blank' },
		{ condition: form.invoice_date?.toString == null, message: 'Invoice Date cannot be blank' },
		{ condition: form.status == null, message: 'Status cannot be blank' },
		{ condition: form.customer == null, message: 'Customer cannot be blank' }
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
	try {
		const response = await axios.post(
			'/api/debt',
			{
				...form
			},
			{
				headers: {
					'Content-Type': 'multipart/form-data'
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
	is_dialog_open.value = !is_dialog_open.value
	if (is_dialog_open.value) {
		fetchCountries(searchCustomerQuery.value)
		fetchStatuses()
	}
}

function handleCustomerSelect(customer: any) {
	form.customer = customer.id
	customers.is_open = false
}

function handleStatusSelect(status: any) {
	form.status = status.id
	statuses.is_open = false
}

function handleFileChange(event: Event) {
	const input = event.target as HTMLInputElement
	if (input.files?.length) {
		const file = input.files[0]

		// only PDF
		if (file.type !== 'application/pdf') {
			toast({
				title: 'Please select a PDF file',
				variant: 'destructive'
			})
			input.value = ''
			return
		}

		// Check if the file size is under 5MB
		if (file.size > 5 * 1024 * 1024) {
			toast({
				title: 'The file size must be under 5MB',
				variant: 'destructive'
			})
			input.value = ''
			return
		}
		form.document = file
	}
}

function updateDueDate(payload: any) {
	const date = new Date(payload)
	form.invoice_date = format(date, 'yyyy-MM-dd')
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
				<VIcon name="fa-plus" class="size-4" />
			</Button>
		</div>
		<Dialog :open="is_dialog_open" @update:open="is_dialog_open = $event">
			<DialogContent :isSideBar="false" class="sm:max-w-[700px]">
				<DialogHeader>
					<DialogTitle>Create Debt</DialogTitle>
					<DialogDescription>
						Insert the details of the debt here. Click create when you're done.
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
							v-model="form.invoice"
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
							<Popover v-model:open="customers.is_open">
								<PopoverTrigger as-child>
									<Button
										variant="outline"
										role="combobox"
										:aria-expanded="customers.is_open"
										class="w-full justify-between px-3"
										:disabled="customers.is_loading"
									>
										{{
											form.customer
												? customers.data.find(
														(customer) => customer.id === form.customer
													)?.label
												: 'Select customer'
										}}
										<VIcon
											name="fa-circle-notch"
											v-if="customers.is_loading"
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
											v-model="searchCustomerQuery"
											placeholder="Search country..."
										/>
										<CommandEmpty>No customer found.</CommandEmpty>
										<CommandList>
											<CommandGroup>
												<CommandItem
													v-for="customer in customers.data"
													:key="customer.id"
													:value="customer.value ?? ''"
													@select="() => handleCustomerSelect(customer)"
												>
													{{ customer.label }}
													<VIcon
														name="fa-check"
														:class="[
															'ml-auto h-4 w-4',
															form.customer === customer.id
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
						<Label for="amount" class="text-right">
							Amount
							<span
								class="absolute translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 text-red-500 rounded-full"
								>*</span
							>
						</Label>
						<Input
							id="amount"
							:modelValue="form.amount === null ? '' : form.amount"
							@update:modelValue="
								(newValue) => (form.amount = newValue === '' ? null : newValue)
							"
							placeholder="800.00"
							class="col-span-3"
						/>
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="email" class="text-right">
							Invoice Date
							<span
								class="absolute translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 text-red-500 rounded-full"
								>*</span
							>
						</Label>

						<div class="col-span-3">
							<Popover>
								<PopoverTrigger as-child>
									<Button
										:variant="'outline'"
										:class="
											cn(
												'w-full justify-start text-left font-normal',
												!form.invoice_date && 'text-muted-foreground'
											)
										"
									>
										<VIcon
											name="fa-regular-calendar-alt"
											class="mr-2 h-4 w-4"
										/>
										<span>{{
											form.invoice_date ? form.invoice_date : 'Pick a date'
										}}</span>
									</Button>
								</PopoverTrigger>
								<PopoverContent class="w-auto p-0">
									<Calendar
										v-model="form.invoice_date"
										@update:model-value="updateDueDate($event)"
										:masks="{ L: 'YYYY-MM-DD' }"
										:modelConfig="{
											type: 'string',
											mask: 'YYYY/MM/DD'
										}"
									></Calendar>
								</PopoverContent>
							</Popover>
						</div>
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="amount" class="text-right">
							Payment Term
							<span
								class="absolute translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 text-red-500 rounded-full"
								>*</span
							>
						</Label>
						<Input id="amount" v-model="form.term" placeholder="7" class="col-span-3" />
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="mobile" class="text-right">
							Status
							<span
								class="absolute translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 text-red-500 rounded-full"
								>*</span
							>
						</Label>
						<div class="col-span-3">
							<Popover v-model:open="statuses.is_open">
								<PopoverTrigger as-child>
									<Button
										variant="outline"
										role="combobox"
										:aria-expanded="statuses.is_open"
										class="w-full justify-between px-3"
										:disabled="statuses.is_loading"
									>
										{{
											form.status
												? statuses.data.find(
														(status) => status.id === form.status
													)?.label
												: 'Select status'
										}}
										<VIcon
											name="fa-circle-notch"
											v-if="statuses.is_loading"
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
										<CommandList>
											<CommandGroup>
												<CommandItem
													v-for="status in statuses.data"
													:key="status.id"
													:value="status.value ?? ''"
													@select="() => handleStatusSelect(status)"
												>
													{{ status.label }}
													<VIcon
														name="fa-check"
														:class="[
															'ml-auto h-4 w-4',
															form.status === status.id
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
					<Separator />
					<div class="grid grid-cols-4 items-center gap-x-4 text-primary">
						<Label for="mobile" class="text-right">
							Attachment
							<span
								class="absolute translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 text-red-500 rounded-full"
								>*</span
							>
						</Label>
						<div class="col-span-3">
							<Input
								id="name"
								type="file"
								@change="handleFileChange"
								class="col-span-3"
							/>
						</div>
						<p
							class="col-start-2 col-span-3 mt-1 text-sm text-gray-500 dark:text-gray-300"
						>
							Accepted Type: <b>PDF</b> (MAX. 5MB)
						</p>
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
						Create</Button
					>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	</div>
</template>
