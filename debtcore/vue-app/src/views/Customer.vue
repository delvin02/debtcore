<script setup lang="ts">
import DataTable from '@/components/Customer/DataTable.vue'
import { columns } from '@/components/Customer/columns'
import type { Task } from '@/components/Customer/data/schema'
import { onMounted, provide, onBeforeUnmount } from 'vue'
import { useTableStore } from '@/store/table'
import { connectionStore } from '@/store/connection'
import GeneralSettingCard from '@/components/Customer/GeneralSettingCard.vue'

const tableStore = useTableStore('customer')
const connection = connectionStore('bukku')

const customersUrl = '/api/customer'
const map_function = (task: any): Task => {
	const serialized_task = {
		id: task.id,
		name: task.name,
		whatsapp_phone_number: task.whatsapp_phone_number || '',
		email: task.email || '',
		country_name: task.country_name,
		outstanding_debts: task.outstanding_debts
	}
	return serialized_task
}

onMounted(async () => {
	await tableStore.fetch(customersUrl, 0, map_function) // Pass the URL when calling the action
	connection.init('/api/connections/bukku')
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
				<h2 class="text-2xl font-bold tracking-tight">Customer</h2>
				<p class="text-muted-foreground">Here&apos;s a list of your existing customers!</p>
			</div>
		</div>
		<GeneralSettingCard v-if="connection.is_authenticated" />

		<DataTable :data="tableStore.tasks" :columns="columns" />
	</div>
</template>
