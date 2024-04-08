<script setup lang="ts">
import type { Row } from '@tanstack/vue-table'
import { computed } from 'vue'
import { statuses } from './data/data'
import { taskSchema } from './data/schema'
import type { Task } from './data/schema'
// import DotsHorizontalIcon from '~icons/radix-icons/dots-horizontal'

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
import DataTableEditModal from './DataTableEditModal.vue'
import DataTableEditPasswordModal from './DataTableEditPasswordModal.vue'

interface DataTableRowActionsProps {
	row: Row<Task>
}
const props = defineProps<DataTableRowActionsProps>()

const task = computed(() => taskSchema.parse(props.row.original))
</script>

<template>
	<div class="flex gap-1">
		<DataTableEditModal :row="task" />
		<DataTableEditPasswordModal :row="task" />
		<Button class="w-fit p-2 h-fit" variant="outline">
			<VIcon name="fa-building" class="h-4 w-4" />
		</Button>
	</div>
</template>
