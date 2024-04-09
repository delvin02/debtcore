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
import { useToast } from '@/components/ui/toast/use-toast'

// make sure user is unique
const tableStore = inject('tableStore', useTableStore('user'))

interface SelectList {
	id?: number
	value?: string
	label?: string
}

// Form Modal
interface UserModal {
	id?: number
	name?: string
	surname?: string
	email: string
	role: number | null
	// country: string;
	password: string
	confirm_password: string

	// FK
	company: number | null
}

interface GenericSelectListModel<T> {
	is_loading: boolean
	is_open: boolean
	data: T[]
}
const form = reactive<UserModal>({
	id: undefined,
	name: '',
	surname: '',
	email: '',
	company: null,
	role: null,
	password: '',
	confirm_password: ''
})

// default select list model
const companies: GenericSelectListModel<SelectList> = reactive({
	is_loading: true,
	is_open: false,
	data: [{ value: '', label: '' }]
})

const roles: GenericSelectListModel<SelectList> = reactive({
	is_loading: true,
	is_open: false,
	data: [{ value: '', label: '' }]
})

// fetching data
async function fetchCompanies() {
	companies.is_loading = true
	try {
		const companyResponse = await axios.get('http://127.0.0.1:8000/api/company/list', {
			withCredentials: true,
			headers: {
				'Cache-Control': 'no-cache',
				Pragma: 'no-cache',
				Expires: '0'
			}
		})

		companies.data = companyResponse.data.Result.map((company: SelectList) => ({
			id: company.id,
			value: company.value,
			label: company.label
		}))
	} catch (error) {
		console.error('There was an error fetching the select list:', error)
	} finally {
		companies.is_loading = false
	}
}

async function fetchRoles() {
	roles.is_loading = true
	try {
		const roleResponse = await axios.get('http://127.0.0.1:8000/api/role-choices/', {
			withCredentials: true,
			headers: {
				'Cache-Control': 'no-cache',
				Pragma: 'no-cache',
				Expires: '0'
			}
		})

		roles.data = roleResponse.data.data.map((role: SelectList) => ({
			id: role.id,
			value: role.value,
			label: role.label
		}))
	} catch (error) {
		console.error('There was an error fetching the select list:', error)
	} finally {
		roles.is_loading = false
	}
}

const init_form = async () => {
	await fetchCompanies()
	await fetchRoles()
}

const is_loading = ref(false)
const is_dialog_open = ref(false)
const error_message = ref<String | null>(null)
const { toast } = useToast()

function validateForm() {
	const validations = [
		{ condition: form.name === '', message: 'Name cannot be blank' },
		{ condition: form.email === '', message: 'Email cannot be blank' },
		{ condition: form.company == null, message: 'Company must be selected' },
		{ condition: form.password != form.confirm_password, message: 'Passwords do not match' },
		{
			condition: form.password.length < 9,
			message: 'Password must consists more than 8 characters'
		},
		{ condition: form.password == '', message: 'Password cannot be blank' }
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
	const isValid = validateForm()
	if (!isValid) {
		return
	}
	is_loading.value = true
	const drfCsrf = JSON.parse(document.getElementById('drf_csrf')?.textContent || '{}')
	try {
		const response = await axios.post(
			'http://127.0.0.1:8000/api/user',
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
		init_form()
	}
	is_dialog_open.value = !is_dialog_open.value
}

function handleCompanySelect(company: any) {
	form.company = company.id

	companies.is_open = false
}

function handleRoleSelect(role: SelectList) {
	form.role = role.id || 0
	roles.is_open = false
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
					<DialogTitle>Create User</DialogTitle>
					<DialogDescription>
						Insert the details of the user here. Click create when you're done.
					</DialogDescription>
				</DialogHeader>
				<!-- :validation-schema="vendorSchema" -->
				<div class="grid gap-4 py-4">
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="surname" class="text-right"> Surname </Label>
						<Input
							id="surname"
							v-model="form.surname"
							placeholder="Lee"
							class="col-span-3"
						/>
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="name" class="text-right"> Name </Label>
						<Input
							id="name"
							v-model="form.name"
							placeholder="Susan"
							class="col-span-3"
						/>
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="email" class="text-right"> Email </Label>
						<Input
							id="email"
							v-model="form.email"
							placeholder="Amalina"
							class="col-span-3"
						/>
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="companyname" class="text-right"> Country </Label>
						<div class="col-span-3">
							<Popover v-model:open="companies.is_open">
								<PopoverTrigger as-child>
									<Button
										variant="outline"
										role="combobox"
										:aria-expanded="companies.is_open"
										class="w-full justify-between px-3"
										:disabled="companies.is_loading"
									>
										{{
											form.company
												? companies.data.find(
														(company) => company.id === form.company
													)?.label
												: 'Select company'
										}}
										<VIcon
											name="fa-circle-notch"
											v-if="companies.is_loading"
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
										<CommandInput class="h-9" placeholder="Search company..." />
										<CommandEmpty>No company found.</CommandEmpty>
										<CommandList>
											<CommandGroup>
												<CommandItem
													v-for="company in companies.data"
													:key="company.value"
													:value="company.value ?? ''"
													@select="() => handleCompanySelect(company)"
												>
													{{ company.label }}
													<VIcon
														name="fa-check"
														:class="[
															'ml-auto h-4 w-4',
															form.company === company.id
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
						<Label for="companyname" class="text-right"> Role </Label>
						<div class="col-span-3">
							<Popover v-model:open="roles.is_open">
								<PopoverTrigger as-child>
									<Button
										variant="outline"
										role="combobox"
										:aria-expanded="roles.is_open"
										class="w-full justify-between px-3"
										:disabled="roles.is_loading"
									>
										{{
											form.role
												? roles.data.find((role) => role.id === form.role)
														?.label
												: 'Select Role'
										}}
										<VIcon
											name="fa-circle-notch"
											v-if="companies.is_loading"
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
											placeholder="Search framework..."
										/>
										<CommandEmpty>No framework found.</CommandEmpty>
										<CommandList>
											<CommandGroup>
												<CommandItem
													v-for="role in roles.data"
													:key="role.value"
													:value="role.value ?? ''"
													@select="() => handleRoleSelect(role)"
												>
													{{ role.label }}
													<VIcon
														name="fa-check"
														:class="[
															'ml-auto h-4 w-4',
															form.role === role.id
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
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="password" class="text-right"> Password </Label>
						<Input
							id="password"
							v-model="form.password"
							placeholder="***********"
							class="col-span-3"
							type="password"
						/>
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="confirm_password" class="text-right"> Confirm Password </Label>
						<Input
							id="confirm_password"
							v-model="form.confirm_password"
							placeholder="***********"
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
						Create</Button
					>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	</div>
</template>
