<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

onMounted(() => {
	const code = route.query.code as string
	if (code) {
		process(code)
	}
})

const process = (code: string) => {
	axios
		.post('https://4e4d-211-26-122-216.ngrok-free.app/api/connections/facebook', { code })
		.then(() => {
			router.push({ name: 'connections' })
		})
		.catch((error: any) => {
			// Redirect to /connections with an error message
			const errorMessage =
				error.response && error.response.data.error
					? error.response.data.error
					: 'Unknown error occurred'
			router.push({
				path: '/connections',
				query: { error: errorMessage }
			})
		})
}
</script>

<template>
	<div class="flex justify-center items-center h-full">
		<VIcon
			name="fa-circle-notch"
			animation="spin"
			speed="slow"
			class="self-center my-auto size-12"
		/>
	</div>
</template>
