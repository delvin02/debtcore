<script setup lang="ts">
import type { Row } from '@tanstack/vue-table'
import { computed } from 'vue'
import { taskSchema } from './data/schema'
import type { Task } from './data/schema'
import DataTableEditScheduleModal from './DataTableEditScheduleModal.vue'
import DataTableSendMessageModal from './DataTableEditScheduleModal.vue'

interface DataTableRowActionsProps {
	row: Row<Task>
}
const props = defineProps<DataTableRowActionsProps>()

const task = computed(() => taskSchema.parse(props.row.original))
</script>

<template>
	<div class="flex gap-1">
		<DataTableEditScheduleModal :row="task" v-if="task.editable" />
	</div>
</template>
