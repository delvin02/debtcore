<script setup lang="ts">
import { ref, type Ref, reactive, inject, watch } from 'vue'
import {
	CalendarDate,
	DateFormatter,
	getLocalTimeZone,
	isEqualMonth,
	type DateValue
} from '@internationalized/date'
import { Button, buttonVariants } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
	RangeCalendarCell,
	RangeCalendarCellTrigger,
	RangeCalendarGrid,
	RangeCalendarGridBody,
	RangeCalendarGridHead,
	RangeCalendarGridRow,
	RangeCalendarHeadCell
} from '@/components/ui/range-calendar'
import { RangeCalendar } from '@/components/ui/range-calendar'
import { cn } from '@/lib/utils'
import { type DateRange, RangeCalendarRoot, useDateFormatter } from 'radix-vue'
import { type Grid, createMonth, toDate } from 'radix-vue/date'
import { useToast } from '@/components/ui/toast/use-toast'
import { useTableStore } from '@/store/table'

const tableStore = inject('tableStore', useTableStore('dashboard'))

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
	date: DateRange
}

const filterForm = reactive<Session>({
	date: value.value as DateRange
})

const { toast } = useToast()

const filter = () => {
	tableStore.set_filter(filterForm)
	tableStore.refresh(tableStore.page_index)
}

const df = new DateFormatter('en-US', {
	dateStyle: 'medium'
})

watch(
	() => filterForm.date,
	(newDate) => {
		if (!newDate.end) {
			return
		}
		filter()
		toast({
			title: 'Transaction dashboard refreshed',
			variant: 'success'
		})
	},
	{ deep: true }
)

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
</script>
<template>
	<!-- <Popover>
		<PopoverTrigger as-child>
			<Button
				variant="outline"
				:class="
					cn(
						'max-w-fit justify-start text-left font-normal',
						!filterForm.date && 'text-muted-foreground'
					)
				"
			>
				<VIcon name="bi-calendar-fill" class="mr-2 h-4 w-4" />
				<template v-if="filterForm.date.start">
					<template v-if="filterForm.date.end">
						{{ df.format(filterForm.date.start.toDate(getLocalTimeZone())) }}
						-
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
	</Popover> -->
	<Popover>
		<PopoverTrigger as-child>
			<Button
				variant="outline"
				:class="
					cn(
						'w-max-fit justify-start text-left font-normal',
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
				<div class="flex flex-col gap-y-4 mt-4 sm:flex-row sm:gap-x-4 sm:gap-y-0">
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
								{{ formatter.fullMonthAndYear(toDate(firstMonth.value)) }}
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
								{{ formatter.fullMonthAndYear(toDate(secondMonth.value)) }}
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
</template>
