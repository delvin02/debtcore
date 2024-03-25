<script setup lang="ts">
import tasks from '@/components/Customer/data/tasks.json'
import DataTable from '@/components/Customer/DataTable.vue'
import { columns } from '@/components/Customer/columns'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

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
        <div>
            <h2 class=" font-bold tracking-tight text-primary">Customer Debt</h2>
            <h2 class="text-3xl font-bold tracking-tight mt-2">Semix Sdn Bhd</h2>

        
            <div class="flex justify-items-center place-items-center items-center">
                <VIcon name="fa-phone-alt" class="w-4 h-4"/>
                <p class="text-muted-foreground ml-2 place-self-center">
                    0478 643 029
                </p>
            </div>
            <div class="flex justify-items-center place-items-center items-center">
                <VIcon name="fa-address-book" class="w-4 h-4"/>
                <p class="text-muted-foreground ml-2 place-self-center">
                    301 Pirie Street, Adelaide SA 5000
                </p>
            </div>
        </div>
        <div>
          <div class="flex mb-10 gap-4">
            <Card >
              <CardHeader>
                <CardTitle>Debts owed to you</CardTitle>
                <CardDescription>
                  Please sort out the debts accordingly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div class="text-2xl font-bold">
                  <h1> RM 7000.00 </h1>

                </div>
              </CardContent>
            </Card>

          </div>
          
        <DataTable :data="tasks" :customerId="1" :columns="columns" />
        </div>
    </div>
</template>