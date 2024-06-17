<script setup lang="ts">
import { ref, type Ref, onMounted, reactive, inject, watch } from 'vue'
import {
	CalendarDate,
	DateFormatter,
	getLocalTimeZone,
	isEqualMonth,
	type DateValue
} from '@internationalized/date'
import { Button, buttonVariants } from '@/components/ui/button'
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
import {
	RangeCalendarCell,
	RangeCalendarCellTrigger,
	RangeCalendarGrid,
	RangeCalendarGridBody,
	RangeCalendarGridHead,
	RangeCalendarGridRow,
	RangeCalendarHeadCell
} from '@/components/ui/range-calendar'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { type DateRange, RangeCalendarRoot, useDateFormatter } from 'radix-vue'
import { type Grid, createMonth, toDate } from 'radix-vue/date'
import { RangeCalendar } from '@/components/ui/range-calendar'
import type { GenericSelectListModel } from '@/common/SelectList'
import axios from 'axios'
import { useToast } from '@/components/ui/toast/use-toast'
import { useTableStore } from '@/store/table'
import _ from 'lodash'

const tableStore = inject('tableStore', useTableStore('session'))

const today = new CalendarDate(
	new Date().getFullYear(),
	new Date().getMonth() + 1,
	new Date().getDate()
)

const value = ref({
	start: new CalendarDate(2024, 5, 20).subtract({ months: 3 }),
	end: today
}) as Ref<DateRange>

interface Session {
	invoice: string
	date: DateRange
	company: number | null
}

const filterForm = reactive<Session>({
	invoice: '',
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
	tableStore.refresh(0)
}
onMounted(() => {
	fetchCompanies()
})

const df = new DateFormatter('en-US', {
	dateStyle: 'medium'
})

const locale = ref('en-US')
const formatter = useDateFormatter(locale.value)

const placeholder = ref(value.value.start) as Ref<DateValue>
const secondMonthPlaceholder = ref(value.value.end) as Ref<DateValue>

const firstMonth = ref(
	createMonth({
		dateObj: placeholder.value,
		locale: locale.value,
		fixedWeeks: true,
		weekStartsOn: 0
	})
) as Ref<Grid<DateValue>>
const secondMonth = ref(
	createMonth({
		dateObj: secondMonthPlaceholder.value,
		locale: locale.value,
		fixedWeeks: true,
		weekStartsOn: 0
	})
) as Ref<Grid<DateValue>>

function updateMonth(reference: 'first' | 'second', months: number) {
	if (reference === 'first') {
		placeholder.value = placeholder.value.add({ months })
	} else {
		secondMonthPlaceholder.value = secondMonthPlaceholder.value.add({
			months
		})
	}
}

watch(placeholder, (_placeholder) => {
	firstMonth.value = createMonth({
		dateObj: _placeholder,
		weekStartsOn: 0,
		fixedWeeks: false,
		locale: locale.value
	})
	if (isEqualMonth(secondMonthPlaceholder.value, _placeholder)) {
		secondMonthPlaceholder.value = secondMonthPlaceholder.value.add({
			months: 1
		})
	}
})

watch(secondMonthPlaceholder, (_secondMonthPlaceholder) => {
	secondMonth.value = createMonth({
		dateObj: _secondMonthPlaceholder,
		weekStartsOn: 0,
		fixedWeeks: false,
		locale: locale.value
	})
	if (isEqualMonth(_secondMonthPlaceholder, placeholder.value))
		placeholder.value = placeholder.value.subtract({ months: 1 })
})

function handleCompanySelect(company: any) {
	if (company.id == filterForm.company) {
		filterForm.company = null
	} else {
		filterForm.company = company.id
	}
	companies.is_open = false
}
</script>

<template>
	<div class="border border-secondary rounded">
		<div class="bg-border/30 p-4">
			<div class="flex flex-col gap-4">
				<div
					class="flex flex-col md:flex-row gap-x-2 md:justify-items-center md:items-center mx-auto w-full"
				>
					<div class="w-1/3 text-left lg:text-right my-auto">
						<p>Invoice</p>
					</div>
					<Input id="invoice" v-model="filterForm.invoice" class="w-full lg:w-1/3" />
				</div>
				<Separator class="my-1" />
				<div
					class="flex flex-col md:flex-row gap-x-2 md:justify-items-center md:items-center mx-auto w-full"
				>
					<div class="w-1/3 text-left lg:text-right my-auto">
						<p>Schduled Date</p>
					</div>
					<Popover>
						<PopoverTrigger as-child>
							<Button
								variant="outline"
								:class="
									cn(
										'w-full lg:w-1/3 justify-start px-3',
										!value && 'text-muted-foreground'
									)
								"
							>
								<VIcon name="bi-calendar-fill" class="mr-2 h-4 w-4" />
								<template v-if="value.start">
									<template v-if="value.end">
										{{
											formatter.custom(toDate(value.start), {
												dateStyle: 'medium'
											})
										}}
										-
										{{
											formatter.custom(toDate(value.end), {
												dateStyle: 'medium'
											})
										}}
									</template>

									<template v-else>
										{{
											formatter.custom(toDate(value.start), {
												dateStyle: 'medium'
											})
										}}
									</template>
								</template>
								<template v-else> Pick a date </template>
							</Button>
						</PopoverTrigger>
						<PopoverContent class="w-auto p-0" align="end">
							<RangeCalendarRoot
								v-slot="{ weekDays }"
								v-model="filterForm.date as DateRange"
								v-model:placeholder="placeholder"
								class="p-3"
							>
								<div
									class="flex flex-col gap-y-4 mt-4 sm:flex-row sm:gap-x-4 sm:gap-y-0"
								>
									<div class="flex flex-col gap-4">
										<div class="flex items-center justify-between">
											<button
												:class="
													cn(
														buttonVariants({ variant: 'outline' }),
														'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
													)
												"
												@click="updateMonth('first', -1)"
											>
												<VIcon name="fa-chevron-left" class="size-4" />
											</button>
											<div :class="cn('text-sm font-medium')">
												{{
													formatter.fullMonthAndYear(
														toDate(firstMonth.value)
													)
												}}
											</div>
											<button
												:class="
													cn(
														buttonVariants({ variant: 'outline' }),
														'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
													)
												"
												@click="updateMonth('first', 1)"
											>
												<VIcon name="fa-chevron-right" class="size-4" />
											</button>
										</div>
										<RangeCalendarGrid>
											<RangeCalendarGridHead>
												<RangeCalendarGridRow>
													<RangeCalendarHeadCell
														v-for="day in weekDays"
														:key="day"
														class="w-full"
													>
														{{ day }}
													</RangeCalendarHeadCell>
												</RangeCalendarGridRow>
											</RangeCalendarGridHead>
											<RangeCalendarGridBody>
												<RangeCalendarGridRow
													v-for="(weekDates, index) in firstMonth.rows"
													:key="`weekDate-${index}`"
													class="mt-2 w-full"
												>
													<RangeCalendarCell
														v-for="weekDate in weekDates"
														:key="weekDate.toString()"
														:date="weekDate"
													>
														<RangeCalendarCellTrigger
															:day="weekDate"
															:month="firstMonth.value"
														/>
													</RangeCalendarCell>
												</RangeCalendarGridRow>
											</RangeCalendarGridBody>
										</RangeCalendarGrid>
									</div>
									<div class="flex flex-col gap-4">
										<div class="flex items-center justify-between">
											<button
												:class="
													cn(
														buttonVariants({ variant: 'outline' }),
														'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
													)
												"
												@click="updateMonth('second', -1)"
											>
												<VIcon name="fa-chevron-left" class="size-4" />
											</button>
											<div :class="cn('text-sm font-medium')">
												{{
													formatter.fullMonthAndYear(
														toDate(secondMonth.value)
													)
												}}
											</div>

											<button
												:class="
													cn(
														buttonVariants({ variant: 'outline' }),
														'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
													)
												"
												@click="updateMonth('second', 1)"
											>
												<VIcon name="fa-chevron-right" class="size-4" />
											</button>
										</div>
										<RangeCalendarGrid>
											<RangeCalendarGridHead>
												<RangeCalendarGridRow>
													<RangeCalendarHeadCell
														v-for="day in weekDays"
														:key="day"
														class="w-full"
													>
														{{ day }}
													</RangeCalendarHeadCell>
												</RangeCalendarGridRow>
											</RangeCalendarGridHead>
											<RangeCalendarGridBody>
												<RangeCalendarGridRow
													v-for="(weekDates, index) in secondMonth.rows"
													:key="`weekDate-${index}`"
													class="mt-2 w-full"
												>
													<RangeCalendarCell
														v-for="weekDate in weekDates"
														:key="weekDate.toString()"
														:date="weekDate"
													>
														<RangeCalendarCellTrigger
															:day="weekDate"
															:month="secondMonth.value"
														/>
													</RangeCalendarCell>
												</RangeCalendarGridRow>
											</RangeCalendarGridBody>
										</RangeCalendarGrid>
									</div>
								</div>
							</RangeCalendarRoot>
						</PopoverContent>
					</Popover>
				</div>
				<div
					class="flex flex-col md:flex-row gap-x-2 md:justify-items-center md:items-center mx-auto w-full"
				>
					<div class="w-1/3 text-left lg:text-right my-auto">
						<p>Company</p>
					</div>
					<Popover class="col-span-1" v-model:open="companies.is_open">
						<PopoverTrigger as-child>
							<Button
								variant="outline"
								role="combobox"
								:aria-expanded="companies.is_open"
								class="w-full lg:w-1/3 justify-between px-3"
								:disabled="companies.is_loading"
							>
								{{
									filterForm.company
										? companies.data.find(
												(company) => company.id === filterForm.company
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
						<PopoverContent class="md:w-[500px] p-1">
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
				<div class="flex self-end justify-end justify-self-end space-x-2">
					<Button @click="filter" class="w-[100px]">Filter</Button>
				</div>
			</div>
		</div>
		<Separator class="border-primary" />
		<div class="p-4">
			<div class="flex justify-end space-x-2">
				<Button @click="all" class="w-[100px]">All</Button>
			</div>
		</div>
	</div>
</template>
