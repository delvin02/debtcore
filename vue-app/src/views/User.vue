<script setup lang="ts">
import DataTable from '@/components/User/DataTable.vue'
import { columns } from '@/components/User/columns'
import type { Task } from '@/components/User/data/schema'
import axios from 'axios'
import {onMounted, ref} from 'vue'

const tasksData = ref([]); // Initialize tasksData as an empty array
const is_loading = ref(false);

async function fetchUsers() {
	is_loading.value = true
	try {
		const response = await axios.get('http://127.0.0.1:8000/api/get/users', {
			withCredentials: true
		});
		is_loading.value = false
		return response.data
	} catch (error) {
		console.error('There was an error fetching the users:', error)
		is_loading.value = false
		return []
	}
}

onMounted(async () => {
  tasksData.value = await processTasks();
});

async function processTasks() {
  const tasks = await fetchUsers();
  return tasks.data.map((task:any) => ({
    id: task.id,
    name: task.name,
    email: task.email,
    company_name: task.company_name,
    last_login: new Date(task.last_login),
  }));
}
</script>

<template>
	<div class="p-8 space-y-8 h-full">
		<div class="flex items-center justify-between space-y-2">
			<div>
				<h2 class="text-2xl font-bold tracking-tight">User Management</h2>
				<p class="text-muted-foreground">Here&apos;s a list of your existing users!</p>
			</div>
		</div>

		<div v-if="is_loading" class="text-center">
			<VIcon name="fa-circle-notch" animation="spin" speed="slow" class="w-10 h-10"/>
    </div>
    <div v-else>
      <DataTable :data="tasksData" :columns="columns" />
    </div>	</div>
</template>
