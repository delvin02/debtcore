<script setup lang="ts">
import type { Column } from '@tanstack/vue-table'
import type { Task } from './data/schema'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { columns } from './columns'

interface DataTableColumnHeaderProps {
    column: Column<Task, any>
    title: string
}

defineProps<DataTableColumnHeaderProps>()
</script>

<template>
    <div v-if="column.getCanSort()" :class="cn('flex items-center space-x-2', $attrs.class ?? '')">
        <DropdownMenu>
            <DropdownMenuTrigger as-child>
                <Button variant="ghost" size="sm" class="-ml-3 h-8 data-[state=open]:bg-accent">
                    <span>{{ title }}</span>
                    <VIcon
                        name="fa-arrow-down"
                        v-if="column.getIsSorted() === 'desc'"
                        class="ml-2 h-4 w-4"
                    />
                    <VIcon
                        name="fa-arrow-up"
                        v-else-if="column.getIsSorted() === 'asc'"
                        class="ml-2 h-4 w-4"
                    />
                    <VIcon name="fa-sort" v-else class="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuItem @click="column.toggleSorting(false)">
                    <VIcon name="fa-arrow-up" class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                    Asc
                </DropdownMenuItem>
                <DropdownMenuItem @click="column.toggleSorting(true)">
                    <VIcon name="fa-arrow-down" class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                    Desc
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem @click="column.toggleVisibility(false)">
                    <VIcon
                        name="fa-regular-eye-slash"
                        class="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
                    />
                    Hide
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>

    <div v-else :class="$attrs.class">
        {{ title }}
    </div>
</template>
