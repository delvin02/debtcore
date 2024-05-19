<script setup lang="ts">
import DataTable from '@/components/User/DataTable.vue'
import { columns } from '@/components/User/columns'
import type { Task } from '@/components/User/data/schema'
import axios from 'axios'
import { onMounted, provide, onBeforeUnmount } from 'vue'
import { useTableStore } from '@/store/table'

const tableStore = useTableStore('user')
const data_url = '/api/user'

const map_function = (task: any): Task => {
	const serialized_task = {
		id: task.id,
		name: task.name,
		email: task.email,
		company_name: task.company_name,
		last_login: new Date(task.last_login)
	}
	return serialized_task
}
onMounted(async () => {
	await tableStore.fetch(data_url, 0, map_function)
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
				<h2 class="text-2xl font-bold tracking-tight">User Management</h2>
				<p class="text-muted-foreground">Here&apos;s a list of your existing users!</p>
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
