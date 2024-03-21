<template>
    <div>
        <h1>test</h1>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const message = ref('Hello World')

function updateMessage() {
    message.value = 'Hello Vue 3'
}
</script>

<style scoped></style>
