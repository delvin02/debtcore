<script setup lang="ts">
import tasks from '@/components/Customer/data/tasks.json'
import DataTable from '@/components/Customer/DataTable.vue'
import { columns } from '@/components/Customer/columns'
</script>

<template>


    <div class="p-8 space-y-8">
        <div class="flex items-center justify-between space-y-2">
            <div>
                <h2 class="text-2xl font-bold tracking-tight">Customers</h2>
                <p class="text-muted-foreground">
                    Here&apos;s a list of your existing customers!
                </p>
            </div>
        </div>
        <DataTable :data="tasks" :columns="columns" />
    </div>
</template>
