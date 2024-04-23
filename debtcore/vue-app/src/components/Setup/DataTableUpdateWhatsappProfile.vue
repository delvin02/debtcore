<script setup lang="ts">
import {
	Dialog,
	DialogScrollContent,
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
import Separator from '../ui/separator/Separator.vue'
import axios from 'axios'
import { format, parseISO } from 'date-fns'
import { useTableStore } from '@/store/table'
import type { Task } from '@/components/Setup/data/schema'
import { useToast } from '@/components/ui/toast/use-toast'
import type { GenericSelectListModel, SelectList } from '@/common/SelectList'
import _ from 'lodash'
import Textarea from '../ui/textarea/Textarea.vue'
import type { Url } from 'url'

const phoneStore = inject('phoneStore', useTableStore('phone'))

interface DataTableWhatsappProfile {
	row: Task
}

const props = defineProps<DataTableWhatsappProfile>()

// Form Modal
interface Profile {
	phone_number_id: string
	image_url?: string
	about?: string
	address?: string
	description?: string
	email: string
	vertical: string | number
	website1: string
	website2: string

	new_image?: File | null
}

const form = reactive<Profile>({
	phone_number_id: props.row.phone_number_id,
	image_url: '',
	about: '',
	address: '',
	description: '',
	email: '',
	vertical: '',
	website1: '',
	website2: '',
	new_image: null
})

const categories: GenericSelectListModel = reactive({
	is_loading: false,
	is_open: false,
	data: [{ value: '', label: '' }]
})

async function fetchCategories() {
	categories.is_loading = true
	try {
		var url = `/api/setup/whatsapp_business/category/list`
		const response = await axios.get(url, {
			withCredentials: true,
			headers: {
				'Cache-Control': 'no-cache',
				Pragma: 'no-cache',
				Expires: '0'
			}
		})
		categories.data = response.data.Result
	} catch (error: any) {
		var message = error.response.data.message || ''
		toast({
			title: 'Whoops, something went wrong',
			description: message,
			variant: 'destructive'
		})
	} finally {
		categories.is_loading = false
	}
}

const is_loading = ref(false)
const is_dialog_open = ref(false)
const error_message = ref<String | null>(null)
const { toast } = useToast()

async function init() {
	try {
		const response = await axios.get(`/api/setup/whatsapp-profile/${form.phone_number_id}`)
		Object.assign(form, response.data.Result)
	} catch (error: any) {
		var message = error.response.data.message || ''
		toast({
			title: 'Whoops, something went wrong',
			description: message,
			variant: 'destructive'
		})
	} finally {
		is_loading.value = false
	}
}

const previewImageUrl = computed(() => {
	if (form.new_image) {
		return URL.createObjectURL(form.new_image)
	}
	return form.image_url
})

// function validateForm() {
// 	const validations = [
// 		{ condition: form.invoice == null, message: 'Invoice cannot be blank' },
// 		{ condition: form.due_date?.toString == null, message: 'Due Date cannot be blank' },
// 		{ condition: form.status == null, message: 'Status cannot be blank' },
// 		{ condition: form.customer == null, message: 'Customer cannot be blank' }
// 	]

// 	for (let validation of validations) {
// 		if (validation.condition) {
// 			error_message.value = validation.message
// 			return false
// 		}
// 	}
// 	return true
// }

async function submit() {
	// checking
	// const isValid = validateForm()
	// if (!isValid) {
	// 	return
	// }
	is_loading.value = true
	try {
		const response = await axios.patch(
			`/api/setup/whatsapp-profile/${form.phone_number_id}`,
			{
				...form
			},
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
		)
		toggleProfile()
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
function toggleProfile() {
	is_dialog_open.value = !is_dialog_open.value
	if (is_dialog_open.value) {
		init()
		fetchCategories()
	}
}

function handleCategorySelect(category: any) {
	form.vertical = category.id
	categories.is_open = false
}

const handleFileUpload = (event: Event) => {
	const input = event.target as HTMLInputElement
	if (input.files?.length) {
		const file = input.files[0]

		// Check if the file size is under 5MB
		if (file.size > 5 * 1024 * 1024) {
			toast({
				title: 'The file size must be under 5MB',
				variant: 'destructive'
			})
			input.value = ''
			return
		}

		form.new_image = file
	}
}
</script>

<template>
	<div>
		<div>
			<Button variant="default" size="sm" class="p-2 px-3" @click="toggleProfile">
				Profile
			</Button>
		</div>
		<Dialog :open="is_dialog_open" @update:open="is_dialog_open = $event">
			<DialogScrollContent :isSideBar="false" class="sm:max-w-[700px]">
				<DialogHeader>
					<DialogTitle>Whatsapp Profile</DialogTitle>
					<DialogDescription>
						Insert the details of the debt here. Click edit when you're done.
					</DialogDescription>
				</DialogHeader>
				<div class="grid gap-4 py-4">
					<div class="flex justify-center">
						<img
							id="picture"
							:src="previewImageUrl"
							class="mx-auto size-48 mb-4 h-full"
						/>
					</div>
					<div class="grid grid-cols-4 items-center">
						<Label for="profile_picture" class="mr-4 text-right">
							Profile Picture
						</Label>
						<div class="col-span-3">
							<Input
								id="profile_picture"
								type="file"
								@change="handleFileUpload"
								class="col-span-3"
							/>
						</div>
						<p class="col-start-2 col-span-3 text-sm text-gray-500 dark:text-gray-300">
							Recommended Type: 640px x 640px <b>JPG/JPEG</b> (MAX. 5MB)
						</p>
					</div>

					<Separator />

					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="about" class="text-right"> About </Label>
						<Input
							id="about"
							v-model="form.about"
							placeholder="We supply exceptional concrete for builders."
							class="col-span-3"
						/>
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="address" class="text-right"> Address </Label>
						<Input
							id="address"
							v-model="form.address"
							placeholder="We supply exceptional concrete for builders."
							class="col-span-3"
						/>
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="description" class="text-right"> Description </Label>
						<Textarea
							id="description"
							v-model="form.description"
							placeholder="Description..."
							class="col-span-3"
						/>
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="email" class="text-right"> Email </Label>
						<Input
							id="email"
							v-model="form.email"
							placeholder="We supply exceptional concrete for builders."
							class="col-span-3"
						/>
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="websites" class="text-right"> Websites </Label>
						<div class="flex gap-2 col-span-3">
							<Input
								id="website"
								v-model="form.website1"
								placeholder="https://facebook.com"
								class="w-1/2"
							/>
							<Input
								id="website"
								v-model="form.website2"
								placeholder="https://kckok.my"
								class="w-1/2"
							/>
						</div>
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="customer" class="text-right leading-normal"> Category </Label>
						<div class="col-span-3">
							<Popover v-model:open="categories.is_open">
								<PopoverTrigger as-child>
									<Button
										variant="outline"
										role="combobox"
										:aria-expanded="categories.is_open"
										class="w-full justify-between px-3"
										:disabled="categories.is_loading"
									>
										{{
											form.vertical
												? categories.data.find(
														(category) => category.id === form.vertical
													)?.label
												: 'Select Category'
										}}
										<VIcon
											name="fa-circle-notch"
											v-if="categories.is_loading"
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
											placeholder="Search category..."
										/>
										<CommandEmpty>No category found.</CommandEmpty>
										<CommandList v-if="!categories.is_loading">
											<CommandGroup>
												<CommandItem
													v-for="category in categories.data"
													:key="category.id"
													:value="category.value ?? ''"
													@select="() => handleCategorySelect(category)"
												>
													{{ category.label }}
													<VIcon
														name="fa-check"
														:class="[
															'ml-auto h-4 w-4',
															form.vertical === category.id
																? 'opacity-100'
																: 'opacity-0'
														]"
													/>
												</CommandItem>
											</CommandGroup>
										</CommandList>
										<CommandList v-else>
											<VIcon
												name="fa-circle-notch"
												animation="spin"
												speed="slow"
												class="w-fit h-fit mr-2 my-2 mx-auto"
											/>
										</CommandList>
									</Command>
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
						Update</Button
					>
				</DialogFooter>
			</DialogScrollContent>
		</Dialog>
	</div>
</template>
