<script setup lang="ts">
import tasks from '@/components/Dashboard/data/tasks.json'
import DataTable from '@/components/Dashboard/DataTable.vue'
import DashboardCard from '@/components/Dashboard/DashboardCard.vue'
import { columns } from '@/components/Dashboard/columns'
import type { Task } from '@/components/Dashboard/data/schema'
import axios from 'axios'
import { onMounted, provide, onBeforeUnmount, ref, type Ref } from 'vue'
import { useTableStore } from '@/store/table'
// import {
//   CalendarDate,
//   DateFormatter,
//   getLocalTimeZone,
// } from '@internationalized/date'
// import { Calendar as CalendarIcon } from 'lucide-vue-next'
// import type { DateRange } from 'radix-vue'
// import { RangeCalendar } from '@/components/ui/range-calendar'
// import { Button } from '@/components/ui/button'
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
// import { cn } from '@/lib/utils'

// const df = new DateFormatter('en-US', {
//   dateStyle: 'medium',
// })

// const value = ref({
//   start: new CalendarDate(2022, 1, 20),
//   end: new CalendarDate(2022, 1, 20).add({ days: -20 }),
// }) as Ref<DateRange>

const transactionStore = useTableStore('dashboard')

const transactionUrl = '/api/transaction'
const map_function = (task: any): Task => {
	const serialized_task = {
		id: task.id,
		invoice: task.invoice,
		customer_name: task.customer_name,
		event_display: task.event_display,
		scheduled_date: task.scheduled_date,
		status: task.status_display,
		additional_info: task.additional_info,
		change_info: task.change_info,
		editable: task.editable
	}
	return serialized_task
}

onMounted(async () => {
	await transactionStore.fetch(transactionUrl, 0, map_function) // Pass the URL when calling the action
})

provide('tableStore', transactionStore)

onBeforeUnmount(() => {
	transactionStore.$reset()
})
</script>

<template>
	<div class="p-8 space-y-8 h-full">
		<div class="flex items-center justify-between space-y-2">
			<div>
				<h2 class="text-2xl font-bold tracking-tight">Dashboard</h2>
			</div>
		</div>
		<!-- <Popover>
			<PopoverTrigger as-child>
				<Button
					variant="outline"
					:class="cn(
						'w-[280px] justify-start text-left font-normal',
						!value && 'text-muted-foreground',
					)"
				>
					<CalendarIcon class="mr-2 h-4 w-4" />
					<template v-if="value.start">
						<template v-if="value.end">
							{{ df.format(value.start.toDate(getLocalTimeZone())) }} - {{ df.format(value.end.toDate(getLocalTimeZone())) }}
						</template>

						<template v-else>
							{{ df.format(value.start.toDate(getLocalTimeZone())) }}
						</template>
					</template>
					<template v-else>
						Pick a date
					</template>
				</Button>
			</PopoverTrigger>
			<PopoverContent class="w-auto p-0">
				<RangeCalendar v-model="value" initial-focus :number-of-months="2" @update:start-value="(startDate) => value.start = startDate" />
			</PopoverContent>
		</Popover> -->
		<DashboardCard />
		<div v-if="transactionStore.is_loading" class="text-center">
			<VIcon name="fa-circle-notch" animation="spin" speed="slow" class="w-10 h-10" />
		</div>
		<div v-else>
			<DataTable :data="transactionStore.tasks" :columns="columns" />
		</div>
	</div>
</template>
