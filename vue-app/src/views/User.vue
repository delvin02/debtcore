<script setup lang="ts">
import tasks from '@/components/User/data/tasks.json'
import DataTable from '@/components/User/DataTable.vue'
import { columns } from '@/components/User/columns'
import type { Task } from '@/components/User/data/schema'
import axios from 'axios'

const data: Task[] = tasks.map((task: any) => ({
	id: task.id,
	name: task.name,
	surname: task.surname,
	email: task.email,
	company_name: task.company_name,
	last_login: new Date(task.last_login)
}))

async function fetchUsers() {
	try {
		const response = await axios.get('http://127.0.0.1:8000/api/get/users')
		console.log(response.data) // Assuming the server responds with JSON data
	} catch (error) {
		console.error('There was an error fetching the users:', error)
	}
}

fetchUsers()
</script>

<template>
	<div class="p-8 space-y-8 h-full">
		<div class="flex items-center justify-between space-y-2">
			<div>
				<h2 class="text-2xl font-bold tracking-tight">User Management</h2>
				<p class="text-muted-foreground">Here&apos;s a list of your existing users!</p>
			</div>
		</div>
		<DataTable :data="data" :columns="columns" />
	</div>
</template>
