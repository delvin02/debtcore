<script setup lang="ts">
import tasks from '@/components/Debt/data/tasks.json'
import DataTable from '@/components/Debt/DataTable.vue'
import { columns } from '@/components/Debt/columns'
import type { Task } from '@/components/Debt/data/schema'
import axios from 'axios'
import { onMounted, provide, onBeforeUnmount } from 'vue'
import { useTableStore } from '@/store/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
const tableStore = useTableStore('debt')

const debtsUrl = 'http://127.0.0.1:8000/api/debt'
const map_function = (task: any): Task => {
	const serialized_task = {
		id: task.id,
		status: task.status,
		invoice: task.invoice,
		customer_name: task.customer_name,
		due_date: new Date(task.due_date),
		amount: task.amount,
		document_url: task.document_url
	}
	return serialized_task
}

onMounted(async () => {
	await tableStore.fetch(debtsUrl, 0, map_function) // Pass the URL when calling the action
})

provide('tableStore', tableStore)

onBeforeUnmount(() => {
	tableStore.$reset()
})
</script>

<template>
	<div class="p-8 space-y-8 h-full">
		<div class="flex items-center justify-between space-y-2">
			<div>
				<h2 class="text-2xl font-bold tracking-tight">Settings</h2>
			</div>
		</div>

		<Tabs default-value="account" class="w-full">
			<TabsList>
				<TabsTrigger value="template"> Templates </TabsTrigger>
				<TabsTrigger value="profile"> Profile </TabsTrigger>
			</TabsList>
			<TabsContent value="profile"> Change your password here. </TabsContent>

			<TabsContent value="template" class="mt-4">
				<div v-if="tableStore.is_loading" class="text-center">
					<VIcon name="fa-circle-notch" animation="spin" speed="slow" class="w-10 h-10" />
				</div>
				<div v-else>
					<DataTable :data="tableStore.tasks" :columns="columns" />
				</div>
			</TabsContent>
		</Tabs>
	</div>
</template>
