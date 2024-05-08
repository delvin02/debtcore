<script setup lang="ts">
import tasks from '@/components/Dashboard/data/tasks.json'
import DataTable from '@/components/Dashboard/DataTable.vue'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
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
		created_date: task.created_date,
		status: task.status_display,
		additional_info: task.additional_info
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
		<div class="flex sm:flex-row sm gap-4 flex-col w-full">
			<Card class="w-1/3">
				<CardHeader>
					<CardTitle>100</CardTitle>
					<CardDescription>Scheduled Task(s)</CardDescription>
				</CardHeader>
			</Card>
			<Card class="w-1/3">
				<CardHeader>
					<CardTitle>100</CardTitle>
					<CardDescription>Active Debt(s)</CardDescription>
				</CardHeader>
			</Card>
			<Card class="w-1/3">
				<CardHeader>
					<CardTitle>RM 99999</CardTitle>
					<CardDescription>Active Debt Amount</CardDescription>
				</CardHeader>
			</Card>
			<Card class="w-1/3">
				<CardHeader>
					<CardTitle>RM 100</CardTitle>
					<CardDescription>Settled Debt</CardDescription>
				</CardHeader> </Card
			>>
		</div>
		<div v-if="dashboardStore.is_loading" class="text-center">
			<VIcon name="fa-circle-notch" animation="spin" speed="slow" class="w-10 h-10" />
		</div>
		<div v-else>
			<DataTable :data="dashboardStore.tasks" :columns="columns"/>
		</div>
	</div>
</template>
