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
	id?: number
	name?: string
	// country: string;
	whatsapp_business_account_id: string,
	is_active: boolean
}

const form = reactive<Company>({
	id: props.row.id,
	name: props.row.name,
	//
	whatsapp_business_account_id: '',
	is_active: false
})

const companies = [{ value: 'semix sdn bhd', label: 'Semix Sdn Bhd' }]
const open = ref(false)
const value = ref('')
const is_loading = ref(true)
const is_dialog_open = ref(false)
const { toast } = useToast()

async function init() {
	try {
		const response = await axios.get(`http://127.0.0.1:8000/api/company/${props.row.id}/`)

		form.name = response.data.Result.name
		form.whatsapp_business_account_id = response.data.Result.whatsapp_business_account_id
		form.is_active = response.data.Result.is_active
		is_loading.value = false
	} catch (error) {
		is_loading.value = false
	}
}

async function submit() {
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
					<Label for="name" class="text-right"> Name </Label>
					<Input
						id="name"
						v-model="form.name"
						placeholder="Geroge Sdn Bhd"
						class="col-span-3"
					/>
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="companyname" class="text-right"> Country </Label>
					<div class="col-span-3">
						<Popover v-model:open="open">
							<PopoverTrigger as-child>
								<Button
									variant="outline"
									role="combobox"
									:aria-expanded="open"
									class="w-full justify-between px-3"
								>
									{{
										value
											? companies.find((company) => company.value === value)
													?.label
											: 'Select company'
									}}
									<VIcon
										name="fa-angle-down"
										class="h-4 w-4 shrink-0 opacity-50"
									/>
								</Button>
							</PopoverTrigger>
							<PopoverContent class="w-[500px] p-1">
								<Command>
									<CommandInput class="h-9" placeholder="Search framework..." />
									<CommandEmpty>No framework found.</CommandEmpty>
									<CommandList>
										<CommandGroup>
											<CommandItem
												v-for="company in companies"
												:key="company.value"
												:value="company.value"
												@select="
													(ev) => {
														if (typeof ev.detail.value === 'string') {
															value = ev.detail.value
														}
														open = false
													}
												"
											>
												{{ company.label }}
												<VIcon name="fa-check"
													:class="
														cn(
															'ml-auto h-4 w-4',
															value === company.value
																? 'opacity-100'
																: 'opacity-0'
														)
													"
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
					<Label for="is_active" class="text-right leading-normal">
						Is Active
					</Label>
					<Checkbox id="is_active" :checked="form.is_active" @update:checked="form.is_active=!form.is_active"/>
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
		</DialogContent>
	</Dialog>
</div>
</template>
