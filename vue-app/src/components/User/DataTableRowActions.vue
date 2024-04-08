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

interface DataTableRowActionsProps {
	row: Row<Task>
}
const props = defineProps<DataTableRowActionsProps>()

const task = computed(() => taskSchema.parse(props.row.original))
</script>

<template>
	<div class="flex gap-1">
		<DataTableEditModal :row="task" />
		<Button class="w-fit p-2 h-fit">
			<VIcon name="fa-lock" class="h-4 w-4" />
		</Button>
		<Button class="w-fit p-2 h-fit" variant="outline">
			<VIcon name="fa-building" class="h-4 w-4" />
		</Button>
	</div>
	<!-- <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button variant="ghost" class="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
                <VIcon name="bi-three-dots" class="h-4 w-4" />
                <span class="sr-only">Open menu</span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="w-[160px]">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Change Password</DropdownMenuItem>
            <!<DropdownMenuSeparator />
            <DropdownMenuItem
                class="bg-red-600 text-white font-bold hover:bg-red-600/90 cursor-pointer"
            >
                <VIcon name="fa-trash-alt" class="w-fit h-full mr-1" />
                Delete
            </DropdownMenuItem> -->
	<!-- </DropdownMenuContent>
    </DropdownMenu> -->
</template>
