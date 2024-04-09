<script setup lang="ts">
import tasks from '@/components/Debt/data/tasks.json'
import DataTable from '@/components/Debt/DataTable.vue'
import { columns } from '@/components/Debt/columns'
import { inject } from 'vue'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { Task } from '@/components/Debt/data/schema'

const data: Task[] = tasks.map((task: any) => ({
	id: task.id,
	status: task.status,
	invoice: task.invoice,
	companyName: task.companyName,
	due_date: new Date(task.due_date),
	amount: task.amount
}))
</script>

<template>
	<div class="p-8 space-y-8 h-full">
		<div class="flex items-center justify-between space-y-2">
			<div>
				<h2 class="text-2xl font-bold tracking-tight">Debt Management</h2>
				<p class="text-muted-foreground">Here&apos;s a list of your existing debts!</p>
			</div>
		</div>
		<DataTable :data="data" :columns="columns" class="mb-10" />
	</div>
</template>
