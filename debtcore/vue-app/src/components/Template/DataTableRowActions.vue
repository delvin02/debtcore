<script setup lang="ts">
import type { Row } from '@tanstack/vue-table'
import { computed } from 'vue'
import { labels } from './data/data'
import { taskSchema } from './data/schema'
import type { Task } from './data/schema'
import DataTableViewTemplate from './DataTableViewTemplate.vue'

interface DataTableRowActionsProps {
	row: Row<Task>
}
const props = defineProps<DataTableRowActionsProps>()

const task = computed(() => taskSchema.parse(props.row.original))
</script>

<template>
	<div>
		<DataTableViewTemplate :row="task"/>
	</div>
</template>
