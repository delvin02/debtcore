<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { ref, reactive, inject } from 'vue'
import { cn } from '@/lib/utils'
import Separator from '../ui/separator/Separator.vue'
import axios from 'axios'
import { useTableStore } from '@/store/table'
import { useToast } from '@/components/ui/toast/use-toast'
import _ from 'lodash'
import type { Task } from '@/components/Transaction/data/schema'

const tableStore = inject('sessionStore', useTableStore('session'))

interface DataTableEditModalProps {
	row: Task
}

const props = defineProps<DataTableEditModalProps>()

// Form Modal
interface Debt {
	id: number
}

const form = reactive<Debt>({
	id: props.row.id
})

const is_loading = ref(false)
const { toast } = useToast()

async function submit() {
	// checking
	is_loading.value = true
	try {
		const response = await axios.patch(
			`/api/session/refresh_session`,
			{
				...form
			},
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
		)

		await tableStore.refresh(tableStore.page_index)
		toast({
			title: response.data.Result,
			variant: 'success'
		})
	} catch (error: any) {
		let errorMessage = 'An unexpected error occurred.'
		toast({
			title: 'Whoops, something went wrong',
			description: errorMessage,
			variant: 'destructive'
		})
	} finally {
		is_loading.value = false
	}
}


</script>

<template>
	<div>
		<div>
			<Button
				variant="ghost"
				size="sm"
				class="h-8 flex justify-start w-full"
				@click="submit"
			>
				<VIcon name="md-refresh" class="size-4 mr-2" />
				Refresh Schedule
			</Button>
		</div>
	</div>
</template>