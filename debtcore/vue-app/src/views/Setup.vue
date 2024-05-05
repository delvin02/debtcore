<script setup lang="ts">
import tasks from '@/components/Setup/data/tasks.json'
import DataTable from '@/components/Setup/DataTable.vue'
import { columns } from '@/components/Setup/columns'
import type { Task } from '@/components/Setup/data/schema'
import axios from 'axios'
import { onMounted, provide, onBeforeUnmount } from 'vue'
import Import from '@/components/Setup/Import.vue'
import { useTableStore } from '@/store/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const phoneStore = useTableStore('phone')

const setupPhoneUrl = '/api/setup/phone'
const map_function = (task: any): Task => {
	const serialized_task = {
		id: task.id,
		phone_number_id: task.whatsapp_id,
		display_phone_number: task.phone_number,
		verified_name: task.name,
		quality_rating: task.company_profile_details.quality_rating,
		platform_type: task.company_profile_details.platform_type,
		last_onboarded_time: task.company_profile_details.last_onboarded_time,
		is_default_phone: task.company_profile_details.is_default_phone
	}
	return serialized_task
}

onMounted(() => {
	phoneStore.fetch(setupPhoneUrl, 0, map_function) // Pass the URL when calling the action
})

provide('phoneStore', phoneStore)

onBeforeUnmount(() => {
	phoneStore.$reset()
})
</script>

<template>
	<div class="p-8 space-y-4 h-full">
		<div class="flex items-center justify-between space-y-2">
			<div>
				<h2 class="text-2xl font-bold tracking-tight">Setup</h2>
			</div>
		</div>
		<hr />

		<Import />
		<div>
			<div class="flex items-center justify-between space-y-2 my-2">
				<div>
					<h3 class="text-lg font-bold tracking-tight">Phone Number</h3>
				</div>
			</div>
			<div class="border-t-primary border-t-4 rounded">
				<DataTable :data="phoneStore.tasks" :columns="columns" class="p-3" />
			</div>
		</div>

		<!-- <Tabs default-value="account" class="w-full">
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
		</Tabs> -->
	</div>
</template>
