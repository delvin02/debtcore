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
import { ref, reactive, inject, onBeforeUnmount } from 'vue'
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
import type { Task } from '@/components/Company/data/schema'
import { useToast } from '@/components/ui/toast/use-toast'
import type { GenericSelectListModel, SelectList } from '@/common/SelectList'
import { string } from 'zod'

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
})

const countries: GenericSelectListModel= reactive({
	is_loading: true,
	is_open: false,
	data: [{ value: '', label: '' }]
})

// async function fetchCountries() {
// 	countries.is_loading = true
// 	try {
// 		const companyResponse = await axios.get('http://127.0.0.1:8000/api/country/list', {
// 			withCredentials: true,
// 			headers: {
// 				'Cache-Control': 'no-cache',
// 				Pragma: 'no-cache',
// 				Expires: '0'
// 			}
// 		})

// 		countries.data = companyResponse.data.Result.map((company: SelectList) => ({
// 			id: company.id,
// 			value: company.value,
// 			label: company.label
// 		}))
// 	} catch (error) {
// 		console.error('There was an error fetching the select list:', error)
// 	} finally {
// 		countries.is_loading = false
// 	}
// }

// const init_form = async () => {
// 	await fetchCountries()
// }

const open = ref(false)
const value = ref('')
const is_loading = ref(false)
const is_dialog_open = ref(false)
const { toast } = useToast()

async function submit() {
	is_loading.value = true
	const drfCsrf = JSON.parse(document.getElementById('drf_csrf')?.textContent || '{}')
	try {
		const response = await axios.post(
			'http://127.0.0.1:8000/api/company',
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
	// if (!is_dialog_open.value) {
	// 	init_form()
	// }
	is_dialog_open.value = !is_dialog_open.value
}

// function handleCountrySelect(country: any) {
// 	form.country = country.id

// 	countries.is_open = false
// }
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
			</DialogContent>
		</Dialog>
	</div>
</template>
