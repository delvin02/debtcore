<script setup lang="ts">
import Message from '@/components/Message/Message.vue'
import { accounts, mails } from '@/components/Message/data/mails'
</script>

<template>
    <div class="flex-1">
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

        <div class="hidden md:flex">
            <Message :accounts="accounts" :mails="mails" />
        </div>
    </div>
</template>
