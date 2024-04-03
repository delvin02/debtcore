<script setup lang="ts">
import Message from '@/components/Message/Message.vue'
import { accounts, mails } from '@/components/Message/data/mails'
</script>

<template>
    <div class="flex-1">
        <Message :accounts="accounts" :mails="mails" />
    </div>
</template>
