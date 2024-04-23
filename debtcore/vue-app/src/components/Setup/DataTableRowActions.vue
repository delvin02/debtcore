<script setup lang="ts">
import type { Row } from '@tanstack/vue-table'
import { computed } from 'vue'
import { taskSchema } from './data/schema'
import type { Task } from './data/schema'
import DataTableSetDefaultPhone from './DataTableSetDefaultPhone.vue'
import DataTableUpdateWhatsappProfile from './DataTableUpdateWhatsappProfile.vue'

interface DataTableRowActionsProps {
	row: Row<Task>
}
const props = defineProps<DataTableRowActionsProps>()

const task = computed(() => taskSchema.parse(props.row.original))
</script>

<template>
	<div class="flex gap-1">
		<DataTableSetDefaultPhone :row="task" />
		<DataTableUpdateWhatsappProfile :row="task" />
	</div>
</template>
