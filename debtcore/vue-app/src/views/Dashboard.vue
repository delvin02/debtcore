<script setup lang="ts">
import tasks from '@/components/Transaction/data/tasks.json'
import DataTable from '@/components/Transaction/DataTable.vue'
import DashboardCard from '@/components/Transaction/DashboardCard.vue'
import DateRangeFilter from '@/components/Transaction/DateRangeFilter.vue'
import { columns } from '@/components/Transaction/columns'
import type { Task } from '@/components/Transaction/data/schema'
import { onMounted, provide, onBeforeUnmount, ref, type Ref } from 'vue'
import { useTableStore } from '@/store/table'

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
	<div class="p-4 md:p-8 space-y-8 h-full">
		<div
			class="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between space-y-2"
		>
			<div>
				<h2 class="text-2xl font-bold tracking-tight">Dashboard</h2>
			</div>
			<DateRangeFilter />
		</div>
		<DashboardCard />
		<div v-if="transactionStore.is_loading" class="text-center">
			<VIcon name="fa-circle-notch" animation="spin" speed="slow" class="w-10 h-10" />
		</div>
		<div v-else>
			<DataTable :data="transactionStore.tasks" :columns="columns" />
		</div>
	</div>
</template>
@/components/Transaction/columns@/components/Transaction/data/schema
