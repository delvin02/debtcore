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
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ref, reactive, inject, watch, computed } from 'vue'
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import Separator from '../ui/separator/Separator.vue'
import axios from 'axios'
import { format, parseISO } from 'date-fns'
import type { Task } from '@/components/Debt/data/schema'
import { useToast } from '@/components/ui/toast/use-toast'
import _ from 'lodash'

// Form Modal
interface CompanyBukku {
	bukku_api: string
	bukku_subdomain: string
	bukku_access_token: string
}

const form = reactive<CompanyBukku>({
	bukku_api: '',
	bukku_subdomain: '',
	bukku_access_token: ''
})

const is_loading = ref(false)
const is_dialog_open = ref(false)
const error_message = ref<String | null>(null)
const { toast } = useToast()

async function init() {
	try {
		const response = await axios.get(`/api/company/setup/bukku`)

		Object.assign(form, response.data.Result)
	} catch (error) {
		is_dialog_open.value = false
		toast({
			title: 'Whoops, something went wrong',
			description: 'An unexpected error occurred',
			variant: 'destructive'
		})
	} finally {
		is_loading.value = false
	}
}

function validateForm() {
	const validations = [
		{
			condition: form.bukku_api == null || form.bukku_api == '',
			message: 'API name cannot be blank'
		},
		{
			condition: form.bukku_subdomain == null || form.bukku_subdomain == '',
			message: 'Subdomain cannot be blank'
		},
		{
			condition: form.bukku_access_token == null || form.bukku_access_token == '',
			message: 'Access Token cannot be blank'
		}
	]

	for (let validation of validations) {
		if (validation.condition) {
			error_message.value = validation.message
			return false
		}
	}
	return true
}

async function test() {
	const isValid = validateForm()
	if (!isValid) {
		return
	}
	try {
		const response = await axios.post(
			'api/company/setup/test-bukku',
			{
				...form
			},
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
		error_message.value = ''
		toast({
			title: response.data.Result,
			variant: 'success'
		})
	} catch (error) {
		toast({
			title: 'Test failed',
			description: 'Credentials may not be correct',
			variant: 'destructive'
		})
	} finally {
		is_loading.value = false
	}
}

async function submit() {
	// checking
	is_loading.value = true
	try {
		const response = await axios.patch(
			`/api/company/setup/bukku`,
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
		error_message.value = ''
		toast({
			title: response.data.Result,
			variant: 'success'
		})
	} catch (error) {
		toast({
			title: 'Whoops, something went wrong',
			description: 'An unexpected error occurred',
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
</script>

<template>
	<div>
		<div>
			<Button variant="default" size="sm" class="p-2 px-3" @click="toggleDialog">
				<!-- <MixerHorizontalIcon class="mr-2 h-4 w-4" /> -->
				Configure Bukku
			</Button>
		</div>
		<Dialog :open="is_dialog_open" @update:open="is_dialog_open = $event">
			<DialogScrollContent :isSideBar="false" class="sm:max-w-[700px]">
				<DialogHeader>
					<DialogTitle>Configure Bukku</DialogTitle>
					<DialogDescription>
						Insert the details of the bukku credentials here. Click configure when
						you're done.
					</DialogDescription>
				</DialogHeader>
				<!-- :validation-schema="vendorSchema" -->
				<div class="grid gap-4 py-4">
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="bukku_api" class="text-right"> API </Label>
						<Input
							id="bukku_api"
							v-model="form.bukku_api"
							placeholder="https://api.bukku.fyi/"
							class="col-span-3"
						/>
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="bukku_subdomain" class="text-right"> Subdomain </Label>
						<Input
							id="bukku_subdomain"
							v-model="form.bukku_subdomain"
							placeholder="kckok"
							class="col-span-3"
						/>
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="bukku_access_token" class="text-right"> Access Token </Label>
						<Textarea
							id="bukku_access_token"
							v-model="form.bukku_access_token"
							placeholder="eyJ0eXAiOiJKV1QiLCJhb...."
							class="col-span-3"
						/>
					</div>
				</div>
				<div class="grid grid-cols-4 items-center gap-4" v-if="error_message">
					<Label for="name" class="text-red-600 col-span-3 col-start-2">
						<VIcon name="fa-exclamation-triangle" class="size-4 fill-red-600" />
						{{ error_message }}
					</Label>
				</div>
				<DialogFooter class="flex">
					<Button type="submit" variant="secondary" @click="test" :disabled="is_loading">
						<VIcon
							name="fa-circle-notch"
							v-if="is_loading"
							animation="spin"
							speed="slow"
							class="w-fit h-fit mr-2"
						/>
						Test</Button
					>
					<Button type="submit" @click="submit" :disabled="is_loading">
						<VIcon
							name="fa-circle-notch"
							v-if="is_loading"
							animation="spin"
							speed="slow"
							class="w-fit h-fit mr-2"
						/>
						Configure</Button
					>
				</DialogFooter>
			</DialogScrollContent>
		</Dialog>
	</div>
</template>
