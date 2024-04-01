<script setup lang="ts">
import Message from '@/components/Message/Message.vue'
import { accounts, mails } from '@/components/Message/data/mails'
import { inject } from 'vue'

const scrollHeight = inject<string | null>('height')
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

        <Message :accounts="accounts" :mails="mails" :style="{ height: scrollHeight }" />
    </div>
</template>
