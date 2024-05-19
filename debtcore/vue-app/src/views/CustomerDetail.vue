<script setup lang="ts">
import DataTable from '@/components/CustomerDetail/DataTable.vue'
import CustomerDetailCard from '@/components/CustomerDetail/CustomerDetailCard.vue'
import CustomerDetailInfo from '@/components/CustomerDetail/CustomerDetailInfo.vue'
import { columns } from '@/components/CustomerDetail/columns'
import type { Task } from '@/components/CustomerDetail/data/schema'
import { onMounted, provide, onBeforeUnmount, ref, type Ref } from 'vue'
import { useTableStore } from '@/store/table'
import { useRoute } from 'vue-router'

const route = useRoute()
const customer_id = route.params.customer_id as string

const tableStore = useTableStore('debt')
const debtsUrl = `/api/customer/${customer_id}/debt`
const map_function = (task: any): Task => {
	const serialized_task = {
		id: task.id,
		status: task.status,
		invoice: task.invoice,
		invoice_date: new Date(task.invoice_date),
		due_date: new Date(task.due_date),
		overdue: task.overdue,
		amount: task.amount,
		term: task.term,
		document_url: task.document_url,
		editable: task.editable
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
	<div class="md:hidden">
		<VPImage
			alt="Tasks"
			width="1280"
			height="1214"
			class="block"
			:image="{
				dark: '/examples/tasks-dark.png',
				light: '/examples/tasks-light.png'
			}"
		/>
	</div>

	<div class="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
		<CustomerDetailInfo :customer_id="customer_id" />
		<!-- <Popover>
			<PopoverTrigger as-child>
				<Button
					variant="outline"
					:class="
						cn(
							'w-[280px] justify-start text-left font-normal',
							!value && 'text-muted-foreground'
						)
					"
				>
					<VIcon name="fa-regular-calendar-alt" class="mr-3 w-4 h-4" />
					<template v-if="value.start">
						<template v-if="value.end">
							{{ df.format(value.start.toDate(getLocalTimeZone())) }} -
							{{ df.format(value.end.toDate(getLocalTimeZone())) }}
						</template>

						<template v-else>
							{{ df.format(value.start.toDate(getLocalTimeZone())) }}
						</template>
					</template>
					<template v-else> Pick a date </template>
				</Button>
			</PopoverTrigger>
			<PopoverContent class="w-auto p-0 mr-5">
				<RangeCalendar
					v-model="value"
					initial-focus
					:number-of-months="2"
					@update:start-value="(startDate) => (value.start = startDate)"
				/>
			</PopoverContent>
		</Popover> -->
		<CustomerDetailCard :customer_id="customer_id" />
		<div>
			<div class="mb-4">
				<h2 class="text-2xl font-bold tracking-tight">Statement</h2>
			</div>
			<DataTable :data="tableStore.tasks" :columns="columns" />
		</div>
	</div>
</template>
