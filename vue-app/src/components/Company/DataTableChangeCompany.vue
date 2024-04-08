<script setup lang="ts">

import { Button } from '@/components/ui/button'
import { ref, reactive, inject } from 'vue'
import { cn } from '@/lib/utils'
import axios from 'axios'
import type { Task } from './data/schema'
import { useToast } from '@/components/ui/toast/use-toast'

interface DataTableEditModalProps {
	row: Task
}

const props = defineProps<DataTableEditModalProps>()

// Form Modal
interface ChangeCompany {
	id?: number
}

const form = reactive<ChangeCompany>({
	id: props.row.id,
})

const is_loading = ref(false)
const { toast } = useToast()


async function changeCompany() {
	is_loading.value = true

	const drfCsrf = JSON.parse(document.getElementById('drf_csrf')?.textContent || '{}')
	try {
		const response = await axios.post(
			`http://127.0.0.1:8000/api/user/change-company/`,
			{
				...form
			},
			{
				headers: {
					'Content-Type': 'application/json',
					[drfCsrf.csrfHeaderName]: drfCsrf.csrfToken
				}
			}
		)
		toast({
			title: response.data.Result,
			variant: 'success'
		})
	} catch (error) {
		let errorMessage = 'An unexpected error occurred.' // Default error message
		if (axios.isAxiosError(error) && error.response) {
			// Check if the error details exist and are structured as expected
			if (error.response.data.details && typeof error.response.data.details === 'object') {
				// Extract the first error message from the details object
				const errorKeys = Object.keys(error.response.data.details)
				if (errorKeys.length > 0 && error.response.data.details[errorKeys[0]].length > 0) {
					errorMessage = error.response.data.details[errorKeys[0]][0]
				}
			} else if (error.response.data.error) {
				// Fallback to a top-level 'error' field if present
				errorMessage = error.response.data.error
			}
		}
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
			class="hidden h-8 lg:flex"
			@click="submit"
		>
			<VIcon name="fa-building" v-if="!is_loading" class="size-4" />
      <VIcon
						name="fa-circle-notch"
						v-else
						animation="spin"
						speed="slow"
						class="size-4"
					/>
		</Button>
	</div>
</div>
</template>
