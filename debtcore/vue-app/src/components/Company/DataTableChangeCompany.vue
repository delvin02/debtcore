<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { ref, reactive, inject } from 'vue'
import { cn } from '@/lib/utils'
import axios from 'axios'
import type { Task } from './data/schema'
import { useToast } from '@/components/ui/toast/use-toast'
import { useAuthStore } from '@/store/user'

const auth = useAuthStore()
interface DataTableEditModalProps {
	row: Task
}

const props = defineProps<DataTableEditModalProps>()

// Form Modal
interface ChangeCompany {
	company?: number
}

const form = reactive<ChangeCompany>({
	company: props.row.id
})

const is_loading = ref(false)
const { toast } = useToast()

async function changeCompany() {
	is_loading.value = true

	try {
		const response = await axios.post(
			`/api/user/change-company/`,
			{
				...form
			},
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
		auth.get_user()
		toast({
			title: response.data.Result,
			variant: 'success'
		})
	} catch (error) {
		let errorMessage = 'An unexpected error occurred.' // Default error message
		toast({
			title: 'Whoops, something went wrong',
			description: errorMessage || '',
			variant: 'destructive'
		})
	} finally {
		is_loading.value = false
	}
}
async function submit() {
	await changeCompany()
}
</script>

<template>
	<div>
		<div>
			<Button
				variant="outline"
				size="sm"
				class="hidden h-8 lg:flex border border-primary"
				@click="submit"
			>
				<VIcon name="fa-building" v-if="!is_loading" class="size-4" />
				<VIcon name="fa-circle-notch" v-else animation="spin" speed="slow" class="size-4" />
			</Button>
		</div>
	</div>
</template>
