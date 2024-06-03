<script setup lang="ts">
import {
	Dialog,
	DialogContent,
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import Separator from '../ui/separator/Separator.vue'
import axios from 'axios'
import { format, parseISO, addDays } from 'date-fns'
import { useTableStore } from '@/store/table'
import { useToast } from '@/components/ui/toast/use-toast'
import _ from 'lodash'
import type { Task } from '@/components/Transaction/data/schema'
import { CalendarDate, type DateValue, getLocalTimeZone } from '@internationalized/date'

const tableStore = inject('tableStore', useTableStore('transaction'))

interface DataTableEditModalProps {
	row: Task
}

const props = defineProps<DataTableEditModalProps>()

// Form Modal
interface Debt {
	id: number
	invoice: string
	scheduled_date: Date | string | null
}

const form = reactive<Debt>({
	id: props.row.id,
	invoice: props.row.invoice,
	scheduled_date: null
})

const is_loading = ref(false)
const is_dialog_open = ref(false)
const error_message = ref<String | null>(null)
const { toast } = useToast()
const tomorrow = addDays(new Date(), 1)
const formattedTomorrow = new CalendarDate(
	tomorrow.getFullYear(),
	tomorrow.getMonth() + 1,
	tomorrow.getDate()
)

async function init() {
	try {
		const response = await axios.get(`/api/transaction/${props.row.id}/scheduled_date`)
		Object.assign(form, response.data.Result)

		if (response.data.Result.scheduled_date) {
			const parsedDate = parseISO(response.data.Result.scheduled_date)
			form.scheduled_date = format(parsedDate, 'yyyy-MM-dd')
		} else {
			form.scheduled_date = null // or set a default value or keep as undefined
		}

		console.log(form.scheduled_date)
	} catch (error) {
		toast({
			title: 'Whoops, something went wrong',
			description: 'There was an error in initialising the form',
			variant: 'destructive'
		})
	} finally {
		is_loading.value = false
	}
}

// function validateForm() {
// 	const validations = [
// 		{ condition: form.invoice == null, message: 'Invoice cannot be blank' },
// 		{ condition: form.invoice_date?.toString == null, message: 'Invoice Date cannot be blank' },
// 		{ condition: form.status == null, message: 'Status cannot be blank' },
// 		{ condition: form.customer == null, message: 'Customer cannot be blank' }
// 	]

// 	for (let  validation of validations) {
// 		if (validation.condition) {
// 			error_message.value = validation.message
// 			return false
// 		}
// 	}
// 	return true
// }

async function submit() {
	// checking
	//const isValid = validateForm()
	// if (!isValid) {
	// 	return
	// }
	is_loading.value = true
	try {
		const response = await axios.patch(
			`/api/transaction/${props.row.id}/scheduled_date`,
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
	} catch (error: any) {
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
		init()
		// fetchCountries(searchCustomerQuery.value)
		// fetchStatuses()
	}
}

function updateScheduleDate(payload: any) {
	const date = new Date(payload)
	form.scheduled_date = format(date, 'yyyy-MM-dd')
}
</script>

<template>
	<div>
		<div>
			<Button
				variant="default"
				size="sm"
				class="h-8 lg:flex"
				@click="toggleDialog"
			>
				<!-- <MixerHorizontalIcon class="mr-2 h-4 w-4" /> -->
				<VIcon name="fa-pen" class="size-4" />
			</Button>
		</div>
		<Dialog :open="is_dialog_open" @update:open="is_dialog_open = $event">
			<DialogContent :isSideBar="false" class="sm:max-w-[700px]">
				<DialogHeader>
					<DialogTitle>Reschedule Reminder</DialogTitle>
				</DialogHeader>
				<!-- :validation-schema="vendorSchema" -->
				<div class="grid gap-4 py-4">
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="invoice" class="text-right"> Invoice </Label>
						<Input id="invoice" v-model="form.invoice" class="col-span-3" disabled />
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="email" class="text-right"> Schedule Date </Label>
						<div class="col-span-3">
							<Popover>
								<PopoverTrigger as-child>
									<Button
										:variant="'outline'"
										:class="
											cn(
												'w-full justify-start text-left font-normal',
												!form.scheduled_date && 'text-muted-foreground'
											)
										"
									>
										<VIcon name="bi-calendar-fill" class="mr-2 size-4" />
										<span>{{ form.scheduled_date ?? 'Select a date' }}</span>
									</Button>
								</PopoverTrigger>
								<PopoverContent class="w-auto p-0">
									<Calendar
										mode="date"
										:min-value="formattedTomorrow"
										@update:model-value="updateScheduleDate($event)"
										:masks="{ L: 'YYYY-MM-DD' }"
										:modelConfig="{
											type: 'string',
											mask: 'YYYY/MM/DD'
										}"
										is-required
									></Calendar>
								</PopoverContent>
							</Popover>
						</div>
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
