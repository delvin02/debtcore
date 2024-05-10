<script setup lang="ts">
import type { Row } from '@tanstack/vue-table'
import { computed } from 'vue'
import { taskSchema } from './data/schema'
import type { Task } from './data/schema'
import DataTableCheckAttachment from './DataTableCheckAttachment.vue'
import DataTableEditModal from './DataTableEditModal.vue'
import DataTableBacklog from './DataTableBacklog.vue'

interface DataTableRowActionsProps {
	row: Row<Task>
}
const props = defineProps<DataTableRowActionsProps>()

const task = computed(() => taskSchema.parse(props.row.original))
</script>

<template>
	<div class="flex gap-1">
		<DataTableEditModal :row="task" v-if="task.editable"/>
		<DataTableCheckAttachment :row="task" />
		<DataTableBacklog :row="task" />
	</div>
</template>
