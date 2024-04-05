<script setup lang="ts">
import tasks from '@/components/Company/data/tasks.json'
import DataTable from '@/components/Company/DataTable.vue'
import { columns } from '@/components/Company/columns'
import type { Task } from '@/components/Company/data/schema'
import axios from 'axios'
import { onMounted, ref, provide } from 'vue'
import { useTableStore } from '@/store/table'

const tableStore = useTableStore();

const companiesUrl = 'http://127.0.0.1:8000/api/get/companies';

onMounted(async () => {
  await tableStore.fetch(companiesUrl); // Pass the URL when calling the action
});
</script>

<template>
	<div class="p-8 space-y-8 h-full">
		<div class="flex items-center justify-between space-y-2">
			<div>
				<h2 class="text-2xl font-bold tracking-tight">Company</h2>
				<p class="text-muted-foreground">Here&apos;s a list of your existing companies!</p>
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
