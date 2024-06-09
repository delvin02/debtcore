<script setup lang="ts">
import tasks from '@/components/Debt/data/tasks.json'
import DataTable from '@/components/Debt/DataTable.vue'
import { columns } from '@/components/Debt/columns'
import type { Task } from '@/components/Debt/data/schema'
import { onMounted, provide, onBeforeUnmount } from 'vue'
import { useTableStore } from '@/store/table'

const tableStore = useTableStore('debt')
const debtsUrl = '/api/debt'
const map_function = (task: any): Task => {
	const serialized_task = {
		id: task.id,
		status: task.status,
		invoice: task.invoice,
		customer_name: task.customer_name,
		invoice_date: new Date(task.invoice_date),
		due_date: new Date(task.due_date),
		term: task.term,
		amount: task.amount,
		document_url: task.document_url,
		editable: task.editable
	}
	return serialized_task
}

onMounted(async () => {
	await tableStore.fetch(debtsUrl, 0, map_function) // Pass the URL when calling the action
})

provide('tableStore', tableStore)
console.log(tableStore)

onBeforeUnmount(() => {
	tableStore.$reset()
})
</script>

<template>
	<div class="p-4 md:p-8 space-y-8 h-full">
		<div class="flex items-center justify-between space-y-2">
			<div>
				<h2 class="text-2xl font-bold tracking-tight">Debt</h2>
				<p class="text-muted-foreground">Here&apos;s a list of your existing debts!</p>
			</div>
		</div>

		<div v-if="tableStore.is_loading" class="text-center">
			<VIcon name="fa-circle-notch" animation="spin" speed="slow" class="w-10 h-10" />
		</div>
		<div v-else>
			<DataTable :data="tableStore.tasks" :columns="columns" />
		</div>
	</div>
</template>
