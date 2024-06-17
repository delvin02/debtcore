<script setup lang="ts">
import type { Row } from '@tanstack/vue-table'
import { computed, onMounted } from 'vue'
import { statuses } from './data/data'
import { taskSchema } from './data/schema'
import type { Task } from './data/schema'
import DataTableEditModal from './DataTableEditModal.vue'
import { ref } from 'vue'

interface DataTableRowActionsProps {
	row: Row<Task>
}
const props = defineProps<DataTableRowActionsProps>()
console.log(props.row)
const task = computed(() => taskSchema.parse(props.row.original))
</script>

<template>
	<div class="flex gap-1">
		<DataTableEditModal :row="task" />
	</div>
</template>
