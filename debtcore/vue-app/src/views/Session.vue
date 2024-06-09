<script setup lang="ts">
import { CalendarDate } from '@internationalized/date'
import DataTable from '@/components/Session/DataTable.vue'
import DashboardCard from '@/components/Session/DashboardCard.vue'
import { columns } from '@/components/Session/columns'
import type { Task } from '@/components/Session/data/schema'
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

const tableStore = useTableStore('session')

const sessionUrl = `/api/session`
const map_function = (task: any): Task => {
	const serialized_task = {
		id: task.id,
		invoice: task.invoice,
		company_name: task.company_name,
		customer_name: task.customer_name,
		event_display: task.event_display,
		scheduled_date: task.scheduled_date,
		completed_date: task.completed_date,
		status: task.status_display,
		additional_info: task.additional_info,
		change_info: task.change_info,
		editable: task.editable
	}
	return serialized_task
}

onMounted(async () => {
	await tableStore.fetch(sessionUrl, 0, map_function) // Pass the URL when calling the action
})

provide('tableStore', tableStore)

onBeforeUnmount(() => {
	tableStore.$reset()
})
</script>

<template>
	<div class="p-4 md:p-8 space-y-8 h-full">
		<div class="flex items-center justify-between space-y-2">
			<div>
				<h2 class="text-2xl font-bold tracking-tight">Session</h2>
			</div>
		</div>
		<DashboardCard />
		<div v-if="tableStore.is_loading" class="text-center">
			<VIcon name="fa-circle-notch" animation="spin" speed="slow" class="w-10 h-10" />
		</div>
		<div v-else>
			<DataTable :data="tableStore.tasks" :columns="columns" />
		</div>
	</div>
</template>
