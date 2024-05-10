<script setup lang="ts">
import tasks from '@/components/Dashboard/data/tasks.json'
import DataTable from '@/components/Dashboard/DataTable.vue'
import DashboardCard from '@/components/Dashboard/DashboardCard.vue'
import { columns } from '@/components/Dashboard/columns'
import type { Task } from '@/components/Dashboard/data/schema'
import axios from 'axios'
import { onMounted, provide, onBeforeUnmount } from 'vue'
import { useTableStore } from '@/store/table'

const dashboardStore = useTableStore('dashboard')

const sessionUrl = '/api/session'
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
	await dashboardStore.fetch(sessionUrl, 0, map_function) // Pass the URL when calling the action
})

provide('dashboardStore', dashboardStore)

onBeforeUnmount(() => {
	dashboardStore.$reset()
})
</script>

<template>
	<div class="p-8 space-y-8 h-full">
		<div class="flex items-center justify-between space-y-2">
			<div>
				<h2 class="text-2xl font-bold tracking-tight">Dashboard</h2>
			</div>
		</div>
		<DashboardCard/>
		<div v-if="dashboardStore.is_loading" class="text-center">
			<VIcon name="fa-circle-notch" animation="spin" speed="slow" class="w-10 h-10" />
		</div>
		<div v-else>
			<DataTable :data="dashboardStore.tasks" :columns="columns"/>
		</div>
	</div>
</template>
