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
import Separator from '../ui/separator/Separator.vue'
import axios from 'axios'
import { useTableStore } from '@/store/table'
import type { Task } from '@/components/Company/data/schema'
import { useToast } from '@/components/ui/toast/use-toast'
import type { GenericSelectListModel, SelectList } from '@/common/SelectList'
import { string } from 'zod'
import _ from 'lodash'

const tableStore = inject('tableStore', useTableStore('customer'))
// Form Modal
interface Company {
	name?: string
	business_registration_id: string
	whatsapp_phone_number: string
	email: string
	// Address

	postcode: string
	streetAddress: string
	city: string
	state: string
	country: SelectList | null
}

const form = reactive<Company>({
	name: '',
	business_registration_id: '',
	whatsapp_phone_number: '',
	email: '',

	streetAddress: '',
	postcode: '',
	city: '',
	state: '',
	country: null
})

const countries: GenericSelectListModel = reactive({
	is_loading: false,
	is_open: false,
	data: [{ value: '', label: '' }]
})

const searchCountryQuery = ref('')

async function fetchCountries(query?: string) {
	countries.is_loading = true
	try {
		const response = await axios.get(
			`http://127.0.0.1:8000/api/country/list?search=${query || ''}`,
			{
				withCredentials: true,
				headers: {
					'Cache-Control': 'no-cache',
					Pragma: 'no-cache',
					Expires: '0'
				}
			}
		)

		countries.data = response.data.Result
	} catch (error) {
		console.error('There was an error fetching the select list:', error)
	} finally {
		countries.is_loading = false
	}
}

const is_loading = ref(false)
const is_dialog_open = ref(false)
const { toast } = useToast()

watch(
	searchCountryQuery,
	_.debounce(async (newQuery) => {
		if (is_dialog_open.value) {
			await fetchCountries(newQuery)
		}
	}, 500)
)
async function submit() {
	is_loading.value = true
	const drfCsrf = JSON.parse(document.getElementById('drf_csrf')?.textContent || '{}')
	try {
		const response = await axios.post(
			'http://127.0.0.1:8000/api/customer',
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

function handleCountrySelect(country: any) {
	form.country = country.id

	countries.is_open = false
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
					<DialogTitle>Create Custsomer</DialogTitle>
					<DialogDescription>
						Insert the details of the customer here. Click create when you're done.
					</DialogDescription>
				</DialogHeader>
				<!-- :validation-schema="vendorSchema" -->
				<div class="grid gap-4 py-4">
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="name" class="text-right"> Company Name </Label>
						<Input
							id="name"
							v-model="form.name"
							placeholder="Geroge Sdn Bhd"
							class="col-span-3"
						/>
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="business_registration_id" class="text-right">
							Business ID
						</Label>
						<Input
							id="business_registration_id"
							v-model="form.business_registration_id"
							placeholder="820720-X"
							class="col-span-3"
						/>
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="whatsapp_phone" class="text-right required:">
							Whatsapp Phone
						</Label>
						<Input
							id="whatsapp_phone"
							v-model="form.whatsapp_phone_number"
							placeholder="012-9886348"
							class="col-span-3"
						/>
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="email" class="text-right leading-normal"> Email </Label>
						<Input
							id="email"
							v-model="form.email"
							placeholder="hello@example.com"
							class="col-span-3"
						/>
					</div>
					<Separator />
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="country" class="text-right leading-normal"> Country </Label>
						<div class="col-span-3">
							<Popover v-model:open="countries.is_open">
								<PopoverTrigger as-child>
									<Button
										variant="outline"
										role="combobox"
										:aria-expanded="countries.is_open"
										class="w-full justify-between px-3"
										:disabled="countries.is_loading"
									>
										{{
											form.country
												? countries.data.find(
														(country) => country.id === form.country
													)?.label
												: 'Select country'
										}}
										<VIcon
											name="fa-circle-notch"
											v-if="countries.is_loading"
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
											v-model="searchCountryQuery"
											placeholder="Search country..."
										/>
										<CommandEmpty>No country found.</CommandEmpty>
										<CommandList>
											<CommandGroup>
												<CommandItem
													v-for="country in countries.data"
													:key="country.id"
													:value="country.value ?? ''"
													@select="() => console.log('clicked')"
												>
													{{ country.label }}
													<VIcon
														name="fa-check"
														:class="[
															'ml-auto h-4 w-4',
															form.country === country.id
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
						<Label for="state" class="text-right leading-normal"> State </Label>
						<Input
							id="state"
							v-model="form.state"
							placeholder="Selangor"
							class="col-span-3"
						/>
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="city" class="text-right leading-normal"> City </Label>
						<Input
							id="city"
							v-model="form.city"
							placeholder="Puchong"
							class="col-span-3"
						/>
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="email" class="text-right leading-normal"> Address </Label>
						<Input
							id="email"
							v-model="form.streetAddress"
							placeholder="Lot 2000, Taman Jalan Indah"
							class="col-span-3"
						/>
					</div>
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="email" class="text-right leading-normal"> Post Code </Label>
						<Input
							id="email"
							v-model="form.postcode"
							placeholder="22000"
							class="col-span-3"
						/>
					</div>
					<Separator />
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
