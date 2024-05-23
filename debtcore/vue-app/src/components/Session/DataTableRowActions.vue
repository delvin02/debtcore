<script setup lang="ts">
import type { Row } from '@tanstack/vue-table'
import { computed } from 'vue'
import { taskSchema } from './data/schema'
import type { Task } from './data/schema'

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
import { Button } from '@/components/ui/button'

import DataTableEditScheduleModal from './DataTableEditScheduleModal.vue'
import DataTableSendMessageModal from './DataTableSendMessageModal.vue'

interface DataTableRowActionsProps {
	row: Row<Task>
}
const props = defineProps<DataTableRowActionsProps>()

const task = computed(() => taskSchema.parse(props.row.original))
</script>

<template>
	<div class="w-fit mx-auto">
		<DropdownMenu>
			<DropdownMenuTrigger as-child>
				<Button variant="default" class="flex h-8 w-8 p-0">
					<VIcon name="bi-three-dots" class="size-4" />
					<span class="sr-only">Open menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" class="w-min-fit">
				<DataTableEditScheduleModal :row="task" />
				<DropdownMenuSeparator />
				<DataTableSendMessageModal :row="task" />
			</DropdownMenuContent>
		</DropdownMenu>
	</div>
</template>
