<script setup lang="ts">
import type { Row } from '@tanstack/vue-table'
import { computed, onMounted } from 'vue'
import { statuses } from './data/data'
import { taskSchema } from './data/schema'
import type { Task } from './data/schema'
import DataTableEditModal from './DataTableEditModal.vue'
import DataTableChangeCompany from './DataTableChangeCompany.vue'
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

interface DataTableRowActionsProps {
	row: Row<Task>
}
const props = defineProps<DataTableRowActionsProps>()
const task = computed(() => taskSchema.parse(props.row.original))
</script>

<template>
	<div class="flex gap-1">
		<DataTableEditModal :row="task" />
		<DataTableChangeCompany :row="task" />
	</div>
</template>
