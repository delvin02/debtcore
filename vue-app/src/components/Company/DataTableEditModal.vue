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
import { ref, reactive, inject } from 'vue'
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

const tableStore = inject('tableStore', useTableStore('company'))

interface DataTableEditModalProps {
	row: Task
}

const props = defineProps<DataTableEditModalProps>()

// Form Modal
interface Company {
	id: number
	name?: string
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
	phone: '',
	email: '',
	website: '',

	//
	whatsapp_business_account_id: '',
	is_active: false
})

const open = ref(false)
const value = ref('')
const is_loading = ref(true)
const is_dialog_open = ref(false)
const error_message = ref<String | null>(null)
const { toast } = useToast()

async function init() {
	try {
		const response = await axios.get(`http://127.0.0.1:8000/api/company/${props.row.id}/`)

		form.name = response.data.Result.name
		form.phone = response.data.Result.phone
		form.email = response.data.Result.email
		form.website = response.data.Result.website
		form.whatsapp_business_account_id = response.data.Result.whatsapp_business_account_id
		form.is_active = response.data.Result.is_active
		is_loading.value = false
	} catch (error) {
		is_loading.value = false
	}
}

function validateForm() {
	const validations = [{ condition: form.name === '', message: 'Name cannot be blank' }]

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
	const drfCsrf = JSON.parse(document.getElementById('drf_csrf')?.textContent || '{}')
	try {
		const response = await axios.patch(
			`http://127.0.0.1:8000/api/company/${props.row.id}/`,
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
		toast({
			title: response.data.Result,
			variant: 'success'
		})
	} catch (error) {
		let errorMessage = 'An unexpected error occurred.' // Default error message
		if (axios.isAxiosError(error) && error.response) {
			// Check if the error details exist and are structured as expected
			if (error.response.data.details && typeof error.response.data.details === 'object') {
				// Extract the first error message from the details object
				const errorKeys = Object.keys(error.response.data.details)
				if (errorKeys.length > 0 && error.response.data.details[errorKeys[0]].length > 0) {
					errorMessage = error.response.data.details[errorKeys[0]][0]
				}
			} else if (error.response.data.error) {
				// Fallback to a top-level 'error' field if present
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
	if (!is_dialog_open.value) {
		init()
	}
	is_dialog_open.value = !is_dialog_open.value
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
						<Label for="phone" class="text-right required:"> Phone </Label>
						<Input
							id="phone"
							v-model="form.phone"
							placeholder="012-9886348"
							class="col-span-3"
						/>
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="email" class="text-right leading-normal">
							Email
						</Label>
						<Input
							id="email"
							v-model="form.email"
							placeholder="hello@example.com"
							class="col-span-3"
						/>
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="website" class="text-right leading-normal">
							Website
						</Label>
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
						<Label for="is_active" class="text-right leading-normal"> Is Active </Label>
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
