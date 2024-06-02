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

import { Label } from '@/components/ui/label'

import { Button } from '@/components/ui/button'
import { ref, reactive, onMounted, inject } from 'vue'
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
import { useTableStore } from '@/store/table'
import type { Task } from './data/schema'
import { useToast } from '@/components/ui/toast/use-toast'

// make sure user is unique
const tableStore = inject('tableStore', useTableStore('user'))

interface DataTableEditModalProps {
	row: Task
}

const props = defineProps<DataTableEditModalProps>()

// Form Modal
interface UserModal {
	id?: string
	password: string
	confirm_password: string
}

const form = reactive<UserModal>({
	id: props.row.id,
	password: '',
	confirm_password: ''
})

const is_loading = ref(false)
const is_dialog_open = ref(false)
const error_message = ref<String | null>(null)
const { toast } = useToast()

async function submit() {
	error_message.value = null
	if (form.password != form.confirm_password) {
		error_message.value = 'Passwords do not match.'
		return
	}

	if (form.password == '' || form.confirm_password == '') {
		error_message.value = 'Password cannot be blank.'
		return
	}

	if (form.password.length < 8) {
		error_message.value = 'Passowrd must consists more than 8 characters'
		return
	}

	is_loading.value = true
	const drfCsrf = JSON.parse(document.getElementById('drf_csrf')?.textContent || '{}')
	try {
		const response = await axios.post(
			'/api/user/change-password/',
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
		toast({
			title: response.data.Result,
			variant: 'success'
		})

		form.confirm_password = ''
		form.password = ''
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
	is_dialog_open.value = !is_dialog_open.value
}
</script>

<template>
	<div>
		<div>
			<Button variant="default" size="sm" class="hidden h-8 lg:flex" @click="toggleDialog">
				<!-- <MixerHorizontalIcon class="mr-2 h-4 w-4" /> -->
				<VIcon name="fa-lock" class="size-4" />
			</Button>
		</div>
		<Dialog :open="is_dialog_open" @update:open="is_dialog_open = $event">
			<DialogContent :isSideBar="false" class="sm:max-w-[700px]">
				<DialogHeader>
					<DialogTitle>Change Password</DialogTitle>
					<DialogDescription>
						Insert the latest password of the user here. Click update when you're done.
					</DialogDescription>
				</DialogHeader>
				<!-- :validation-schema="vendorSchema" -->
				<div class="grid gap-4 py-4">
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="password" class="text-right"> Password </Label>
						<Input
							id="password"
							v-model="form.password"
							placeholder="********"
							class="col-span-3"
							type="password"
						/>
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="confirm_password" class="text-right"> Confirm Password </Label>
						<Input
							id="confirm_password"
							v-model="form.confirm_password"
							placeholder="********"
							class="col-span-3"
							type="password"
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
						Update</Button
					>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	</div>
</template>
