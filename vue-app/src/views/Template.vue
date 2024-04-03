<script setup lang="ts">
import tasks from '@/components/Template/data/tasks.json'
import DataTable from '@/components/Template/DataTable.vue'
import { columns } from '@/components/Template/columns'
import { inject } from 'vue'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { Task } from '@/components/Template/data/schema'

const data: Task[] = tasks.map((task: any) => ({
    id: task.id,
    name: task.status,
    status: task.invoice,
    label: task.companyName,
    type: task.type,
    message_delivered: task.message_delivered,
    message_read: task.message_read,
    last_updated: new Date(task.last_updated)
}))

</script>

<template>

        <div class="p-8 space-y-8">
            <div class="flex items-center justify-between space-y-2">
                <div>
                    <h2 class="text-2xl font-bold tracking-tight">Debt Management</h2>
                    <p class="text-muted-foreground">Here&apos;s a list of your existing debts!</p>
                </div>
            </div>
            <DataTable :data="data" :columns="columns" />
        </div>
</template>
