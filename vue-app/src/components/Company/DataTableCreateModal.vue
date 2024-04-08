<script setup lang="ts">
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
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

const tableStore = inject('tableStore', useTableStore('company'))
// Form Modal
interface Company {
	id?: number
	name?: string
	// country: string;
	whatsapp_business_account_id: string
}

const form = reactive<Company>({
	id: undefined,
	name: '',
	whatsapp_business_account_id: ''
})

const companies = ref<Task | null>()
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
						<Label for="name" class="text-right"> Name </Label>
						<Input
							id="name"
							v-model="form.name"
							placeholder="Geroge Sdn Bhd"
							class="col-span-3"
						/>
					</div>
					<!-- <div class="grid grid-cols-4 items-center gap-4">
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
										name
											? companies.find((c) => c.name === name)?.label
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
												:key="company.id"
												:value="company.id"
												@select="
													(ev) => {
														if (typeof ev.detail.value === 'string') {
															value = ev.detail.value
														}
														open = false
													}
												"
											>
												{{ company.name }}
												<Check
													:class="
														cn(
															'ml-auto h-4 w-4',
															value === company.id
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
				</div> -->
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
