<script setup lang="ts">
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'
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
import { cn } from '@/lib/utils'
import { ref, type Ref, onMounted, reactive, inject, watch } from 'vue'
import type { DateRange } from 'radix-vue'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { RangeCalendar } from '@/components/ui/range-calendar'
import type { GenericSelectListModel, SelectList } from '@/common/SelectList'
import axios from 'axios'
import { useToast } from '@/components/ui/toast/use-toast'
import { useTableStore } from '@/store/table'
import _ from 'lodash'

const tableStore = inject('tableStore', useTableStore('session'))

const today = new CalendarDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());

const value = ref({
	start: new CalendarDate(2024, 5, 20).subtract({ months: 3}),
	end: today
}) as Ref<DateRange>


interface Session {
		date: DateRange
		company: number | null
}

const filterForm = reactive<Session>({
		date: value.value as DateRange,
		company: null
})
const companies: GenericSelectListModel = reactive({
	is_loading: false,
	is_open: false,
	data: [{ value: '', label: '' }]
})

const { toast } = useToast()
const searchCompanyQuery = ref('')

async function fetchCompanies(query?: string) {
	companies.is_loading = true
	try {
		const response = await axios.get(`/api/company/list?search=${query || ''}`, {
			withCredentials: true,
			headers: {
				'Cache-Control': 'no-cache',
				Pragma: 'no-cache',
				Expires: '0'
			}
		})

		companies.data = response.data.Result
	} catch (error) {
		toast({
			title: 'Whoops, something went wrong',
			description: 'There is an error fetching the companies.',
			variant: 'destructive'
		})	
		} finally {
		companies.is_loading = false
	}
}

watch(
	searchCompanyQuery,
	_.debounce(async (newQuery) => {
		await fetchCompanies(newQuery)
	}, 300)
)
// const dataUrl = '/api/session/card'
// const init = async () => {
// 	try {
// 		const response = await axios.get(dataUrl)
// 		Object.assign(card_data, response.data.Result)
// 	} catch (error) {
// 		console.log(error)
// 	}
// }
const filter = () => {
	tableStore.set_filter(filterForm)
	tableStore.refresh(tableStore.page_index)
}

const all = () => {
	tableStore.set_filter({})
	tableStore.refresh(tableStore.page_index)
}
onMounted(() => {
	fetchCompanies()
})

const df = new DateFormatter('en-US', {
	dateStyle: 'medium'
})

function handleCompanySelect(company: any) {
	if (company.id == filterForm.company)
	{
		filterForm.company = null
	} else
	{
		filterForm.company = company.id
	}
	companies.is_open = false
}
</script>

<template>
	<div class="border border-secondary rounded p-4">
		<div class="flex flex-col gap-4">
			<div class="flex flex-row gap-x-2 justify-items-center items-center mx-auto w-full">
				<div class="w-1/3 text-right my-auto">
					<p>Schduled Date</p>
				</div>
				<Popover>
					<PopoverTrigger as-child>
						<Button
							variant="outline"
							:class="
								cn(
									'w-1/3 justify-start text-left font-normal',
									!filterForm.date && 'text-muted-foreground'
								)
							"
						>
							<CalendarIcon class="mr-2 h-4 w-4" />
							<template v-if="filterForm.date.start">
								<template v-if="filterForm.date.end">
									{{ df.format(filterForm.date.start.toDate(getLocalTimeZone())) }} -
									{{ df.format(filterForm.date.end.toDate(getLocalTimeZone())) }}
								</template>

								<template v-else>
									{{ df.format(filterForm.date.start.toDate(getLocalTimeZone())) }}
								</template>
							</template>
							<template v-else> Pick a date </template>
						</Button>
					</PopoverTrigger>
					<PopoverContent class="w-auto p-0">
						<RangeCalendar
							v-model="filterForm.date as DateRange"
							initial-focus
							:number-of-months="2"
							@update:start-value="(startDate) => (filterForm.date.start = startDate)"
						/>
					</PopoverContent>
				</Popover>
			</div>
			<div class="flex flex-row gap-x-2 justify-items-center items-center mx-auto w-full">
				<div class="w-1/3 text-right my-auto">
					<p>Company</p>
				</div>
				<Popover class="col-span-1" v-model:open="companies.is_open">
					<PopoverTrigger as-child>
						<Button
							variant="outline"
							role="combobox"
							:aria-expanded="companies.is_open"
							class="w-1/3 justify-between px-3"
							:disabled="companies.is_loading"
						>
							{{
								filterForm.company
									? companies.data.find((company) => company.id === filterForm.company)
											?.label
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
							<CommandInput
								class="h-9"
								v-model="searchCompanyQuery"
								placeholder="Search company..."
							/>
							<CommandEmpty>No company found.</CommandEmpty>
							<CommandList>
								<CommandGroup>
									<CommandItem
										v-for="company in companies.data"
										:key="company.id"
										:value="company.value ?? ''"
										@select="() => handleCompanySelect(company)"
									>
										{{ company.label }}
										<VIcon
											name="fa-check"
											:class="[
												'ml-auto h-4 w-4',
												filterForm.company === company.id
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
		<div class="flex self-end justify-end justify-self-end">
		<Button @click="filter" class="w-[100px]">Filter</Button>
		</div>
		<Separator  class="my-3" />
		<div class="flex justify-end space-x-2">
			<Button @click="all" class="w-[100px]">All</Button>
		</div>
	</div>
</template>
