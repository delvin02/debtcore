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
import { format } from 'date-fns';
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
	amount?: number | null
	due_date: Date | null
	status: number | null
	document: File | null
}

const form = reactive<Debt>({	
	invoice: '',
	customer: null,
	amount: null,
	due_date: null,
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
		const response = await axios.get(
			`http://127.0.0.1:8000/api/customer/list?search=${query || ''}`,
			{
				withCredentials: true,
				headers: {
					'Cache-Control': 'no-cache',
					Pragma: 'no-cache',
					Expires: '0'
				}
			}
		)

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
		const response = await axios.get(
			`http://127.0.0.1:8000/api/status/list`,
			{
				withCredentials: true,
				headers: {
					'Cache-Control': 'no-cache',
					Pragma: 'no-cache',
					Expires: '0'
				}
			}
		)

		statuses.data = response.data.Result
	} catch (error) {
		console.error('There was an error fetching the select list:', error)
	} finally {
		statuses.is_loading = false
	}
}

const is_loading = ref(false)
const is_dialog_open = ref(false)
const error_message = ref<String | null>(null)
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
		{ condition: form.due_date?.toString == null, message: 'Due Date cannot be blank' },
		{ condition: form.status == null, message: 'Status cannot be blank' },
		{ condition: form.customer == null, message: 'Customer cannot be blank' },

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
		const response = await axios.post(
			'http://127.0.0.1:8000/api/debt',
			{
				...form
			},
			{
				headers: {
					'Content-Type': 'multipart/form-data',
					[drfCsrf.csrfHeaderName]: drfCsrf.csrfToken
				}
			}
		)
		toggleDialog()
		await tableStore.refresh(tableStore.page_index)
		toast({
			title: 'Company created successfully.',
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
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
        form.document = input.files[0]; // Assign the first selected file
    }
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
						<Label for="invoice" class="text-right"> Invoice
							<span class="absolute translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 text-red-500 rounded-full">*</span>

						</Label>
						<Input
							id="invoice"
							v-model="form.invoice"
							placeholder="INV-001"
							class="col-span-3"
						/>
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="customer" class="text-right leading-normal"> Customer
							<span class="absolute translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 text-red-500 rounded-full">*</span>
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
						<Label for="amount" class="text-right"> Amount
							<span class="absolute translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 text-red-500 rounded-full">*</span>

						</Label>
						<Input
							id="amount"
							v-model="form.amount"
							placeholder="800.00"
							class="col-span-3"
						/>
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
							<Label for="email" class="text-right"> Due Date </Label>
							<div class="col-span-3">
									<Popover>
											<PopoverTrigger as-child>
													<Button
															:variant="'outline'"
															:class="
																	cn(
																			'w-full justify-start text-left font-normal',
																			!form.due_date && 'text-muted-foreground'
																	)
															"
													>
															<VIcon name="fa-calendar" class="mr-2 h-4 w-4" />
															<span>{{ form.due_date ? format(form.due_date, 'PPP') : 'Pick a date' }}</span>
													</Button>
											</PopoverTrigger>
											<PopoverContent class="w-auto p-0">
												<Calendar :model-value="form.due_date" @change="date => form.due_date = date" />
											</PopoverContent>
									</Popover>
							</div>
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
							<Label for="mobile" class="text-right"> Status </Label>
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
							<Label for="mobile" class="text-right"> Attachment </Label>
							<div class="col-span-3 ">
									<Input id="name" type="file" @change="handleFileChange" class="col-span-3" />
							</div> 
							<p class="col-start-2 col-span-3 mt-1 text-sm text-gray-500 dark:text-gray-300">SVG, PNG, JPG or JPEG, PDF (MAX. 1080x720px).</p>
					</div>
				</div>
				<Separator/>
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
