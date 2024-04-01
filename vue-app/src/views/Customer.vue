<script setup lang="ts">
import tasks from '@/components/Customer/data/tasks.json'
import DataTable from '@/components/Customer/DataTable.vue'
import { columns } from '@/components/Customer/columns'
import { inject } from 'vue'
import { ScrollArea } from '@/components/ui/scroll-area'

const scrollHeight = inject('height')
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

    <ScrollArea :style="{ height: scrollHeight }">
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
    </ScrollArea>
</template>
