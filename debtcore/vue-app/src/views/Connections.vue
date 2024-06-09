<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Whatsapp from '@/components/Connections/Whatsapp.vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useToast } from '@/components/ui/toast/use-toast'

const route = useRoute()

const loginStatus = ref<string>('Unknown')
const { toast } = useToast()

onMounted(() => {
	const error = route.query.error as string
	if (error) {
		toast({
			title: 'Authentication Failed!',
			description: error,
			variant: 'destructive'
		})
	}
})
</script>

<template>
	<div class="p-4 md:p-8 space-y-8">
		<div class="flex items-center justify-between space-y-2">
			<div>
				<h2 class="text-2xl font-bold tracking-tight">Connections</h2>
				<p class="text-muted-foreground">Here&apos;s a list of your connected apps!</p>
			</div>
		</div>
		<div>
			<Whatsapp />
		</div>
	</div>
</template>
