<script setup lang="ts">
import tasks from '@/components/Debt/data/tasks.json'
import DataTable from '@/components/Debt/DataTable.vue'
import { columns } from '@/components/Debt/columns'
</script>

<template>
    <div class="md:hidden">
        <VPImage
            alt="Tasks"
            width="1280"
            height="1214"
            class="block"
            :image="{
                dark: '/examples/tasks-dark.png',
                light: '/examples/tasks-light.png'
            }"
        />
    </div>

    <div class="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div class="flex items-center justify-between space-y-2">
            <div>
                <h2 class="text-2xl font-bold tracking-tight">Debt Management</h2>
                <p class="text-muted-foreground">Here&apos;s a list of your existing debts!</p>
            </div>
        </div>
        <DataTable :data="tasks" :columns="columns" />
    </div>
</template>
