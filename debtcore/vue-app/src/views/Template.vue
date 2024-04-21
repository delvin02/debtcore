<script setup lang="ts">
import tasks from '@/components/Template/data/tasks.json'
import DataTable from '@/components/Template/DataTable.vue'
import { columns } from '@/components/Template/columns'
import type { Task } from '@/components/Template/data/schema'
import { onMounted, provide, onBeforeUnmount } from 'vue'
import { useTableStore } from '@/store/table'

const tableStore = useTableStore('template')

const templateUrl = 'http://127.0.0.1:8000/api/template'
const map_function = (task: any): Task => {
	const serialized_task = {
		id: task.id,
		name: task.name,
		category: task.category,
		status: task.status,
		message_delivered: task.message_delivered,
		message_read: task.message_read,
		last_updated_date: task.last_updated_date
	}
	return serialized_task
}

onMounted(async () => {
	await tableStore.fetch(templateUrl, 0, map_function) // Pass the URL when calling the action
})

provide('tableStore', tableStore)

onBeforeUnmount(() => {
	tableStore.$reset()
})
</script>

<template>
	<div class="p-8 space-y-8">
		<div class="flex items-center justify-between space-y-2">
			<div>
				<h2 class="text-2xl font-bold tracking-tight">Template</h2>
				<p class="text-muted-foreground">Here&apos;s a list of your existing templates!</p>
			</div>
		</div>
		<DataTable :data="tableStore.tasks" :columns="columns" />
	</div>
</template>
