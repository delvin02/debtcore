<template>
    <div>
       
    </div>
</template>

<script setup>
import { ref } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'
const message = ref('Hello World')

function updateMessage() {
    message.value = 'Hello Vue 3'
}
</script>

<style scoped>
.section {
    @apply w-full  py-8 px-5 rounded mb-8;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.btn-count {
    @apply mt-4 px-3 py-1 bg-indigo-500 text-white rounded;
    cursor: pointer;
    transition: background-color 250ms;
}
</style>
