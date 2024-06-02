<script setup lang="ts">
import DataTable from '@/components/Customer/DataTable.vue'
import { columns } from '@/components/Customer/columns'
import type { Task } from '@/components/Customer/data/schema'
import { onMounted, provide, onBeforeUnmount } from 'vue'
import { useTableStore } from '@/store/table'

const tableStore = useTableStore('customer')

const customersUrl = '/api/customer'
const map_function = (task: any): Task => {
	const serialized_task = {
		id: task.id,
		name: task.name,
		company_name: task.company_name,
		whatsapp_phone_number: task.whatsapp_phone_number,
		email: task.email,
		country_name: task.country_name,
		outstanding_debts: task.outstanding_debts
	}
	return serialized_task
}

onMounted(async () => {
	await tableStore.fetch(customersUrl, 0, map_function) // Pass the URL when calling the action
})

provide('tableStore', tableStore)
console.log(tableStore)

onBeforeUnmount(() => {
	tableStore.$reset()
})
</script>

<template>
	<div class="p-8 space-y-8 h-full">
		<div class="flex items-center justify-between space-y-2">
			<div>
				<h2 class="text-2xl font-bold tracking-tight">Customer</h2>
				<p class="text-muted-foreground">Here&apos;s a list of your existing customers!</p>
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
