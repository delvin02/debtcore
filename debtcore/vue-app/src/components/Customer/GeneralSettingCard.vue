<script setup lang="ts">
import { ref, type Ref, onMounted, reactive, inject, watch } from 'vue'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from '@/components/ui/command'
import type { GenericSelectListModel } from '@/common/SelectList'
import axios from 'axios'
import { useToast } from '@/components/ui/toast/use-toast'
import { useTableStore } from '@/store/table'
import _ from 'lodash'
import { FaLastfmSquare } from 'oh-vue-icons/icons/fa'

const tableStore = inject('tableStore', useTableStore('customer'))

interface CustomerGeneralSetting {
	default_country: number | null
}

const form = reactive<CustomerGeneralSetting>({
	default_country: null
})

const countries: GenericSelectListModel = reactive({
	is_loading: false,
	is_open: false,
	data: [{ value: '', label: '' }]
})

const is_saving = ref(false)
const is_refresh_loading = ref(false)
const { toast } = useToast()
const searchCountryQuery = ref('')

async function fetchCountries(query?: string) {
	countries.is_loading = true
	try {
		const response = await axios.get(`/api/country/list?search=${query || ''}`, {
			withCredentials: true,
			headers: {
				'Cache-Control': 'no-cache',
				Pragma: 'no-cache',
				Expires: '0'
			}
		})

		countries.data = response.data.Result
	} catch (error) {
		toast({
			title: 'Whoops, something went wrong',
			description: 'There was an error fetching the country list',
			variant: 'destructive'
		})
	} finally {
		countries.is_loading = false
	}
}

watch(
	searchCountryQuery,
	_.debounce(async (newQuery) => {
		await fetchCountries(newQuery)
	}, 500)
)
const dataUrl = '/api/customer/settings'
const init = async () => {
	try {
		const response = await axios.get(dataUrl)
		Object.assign(form, response.data.Result)
	} catch (error) {
		toast({
			title: 'Whoops, something went wrong',
			description: 'Fail to load the general settings',
			variant: 'destructive'
		})
	}
}
const RefreshCustomer = async () => {
	is_refresh_loading.value = true
	try {
		const response = await axios.post(
			`/api/bukku/refresh-contact`,
			{
				...form
			},
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
		tableStore.refresh(tableStore.page_index)
		toast({
			title: response.data.Result,
			variant: 'success'
		})
	} catch (error: any) {
		console.log(error.data)
		let errorMessage = error.response.data.message
		toast({
			title: 'Whoops, something went wrong',
			description: errorMessage || 'An unexpected error occurred.',
			variant: 'destructive'
		})
	} finally {
		is_refresh_loading.value = false
	}
}

const save = async () => {
	is_saving.value = true
	try {
		const response = await axios.patch(
			`/api/customer/settings`,
			{
				...form
			},
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
		toast({
			title: response.data.Result,
			variant: 'success'
		})
	} catch (error) {
		let errorMessage = 'An unexpected error occurred.'
		toast({
			title: 'Whoops, something went wrong',
			description: errorMessage || '',
			variant: 'destructive'
		})
	} finally {
		is_saving.value = false
	}
}
onMounted(async () => {
	await init()
	fetchCountries()
})

function handleCountrySelect(country: any) {
	if (country.id == form.default_country) {
		form.default_country = null
	} else {
		form.default_country = country.id
	}
	countries.is_open = false
}
</script>

<template>
	<div class="border border-secondary rounded">
		<div class="bg-border/20 p-4">
			<div class="flex flex-col gap-4">
				<div
					class="flex flex-col md:flex-row gap-x-2 md:justify-items-center md:items-center mx-auto w-full"
				>
					<Button
						@click="RefreshCustomer"
						class="mx-auto w-[200px]"
						:disabled="is_refresh_loading"
						>Refresh Customer
						<VIcon
							name="md-refresh"
							class="ml-2 h-4 w-4"
							:animation="is_refresh_loading ? 'spin' : ''"
						/>
					</Button>
				</div>
				<Separator class="my-1" />
				<div
					class="flex flex-col md:flex-row gap-x-2 md:justify-items-center md:items-center mx-auto w-full"
				>
					<div class="flex flex-col w-full">
						<p class="text-center text-lg font-bold mb-2">General Settings</p>
						<div class="flex flex-row justify-center w-full">
							<div class="text-left lg:text-right my-auto mr-4">
								<p class="mr-3">Default Country</p>
							</div>
							<Popover class="col-span-2" v-model:open="countries.is_open">
								<PopoverTrigger as-child>
									<Button
										variant="outline"
										role="combobox"
										:aria-expanded="countries.is_open"
										class="w-full lg:w-1/3 justify-between px-3"
										:disabled="countries.is_loading"
									>
										{{
											form.default_country
												? countries.data.find(
														(country) =>
															country.id === form.default_country
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
								<PopoverContent class="md:w-[500px] p-1">
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
													@select="() => handleCountrySelect(country)"
												>
													{{ country.label }}
													<VIcon
														name="fa-check"
														:class="[
															'ml-auto h-4 w-4',
															form.default_country === country.id
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
				</div>
				<div class="flex self-end justify-end justify-self-end space-x-2">
					<Button @click="save" class="w-[100px]" :disabled="is_saving"> Save </Button>
				</div>
			</div>
		</div>
	</div>
</template>
