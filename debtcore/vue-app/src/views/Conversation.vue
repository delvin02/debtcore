<script setup lang="ts">
import Conversation from '@/components/Conversation/Conversation.vue'
import { accounts, conversations } from '@/components/Conversation/data/conversations'
</script>

<template>
	<Conversation :accounts="accounts" :conversations="conversations" />
</template>
