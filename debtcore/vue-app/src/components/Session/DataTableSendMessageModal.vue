<script setup lang="ts">
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from '@/components/ui/alert-dialog'

import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ref, reactive, inject, watch, computed } from 'vue'
import { cn } from '@/lib/utils'
import axios from 'axios'
import { format, parseISO, addDays } from 'date-fns'
import { useTableStore } from '@/store/table'
import { useToast } from '@/components/ui/toast/use-toast'
import type { GenericSelectListModel, SelectList } from '@/common/SelectList'
import _ from 'lodash'
import type { Task } from '@/components/Transaction/data/schema'
import { CalendarDate, type DateValue, getLocalTimeZone } from '@internationalized/date'

const tableStore = inject('sessionStore', useTableStore('session'))

interface DataTableEditModalProps {
	row: Task
}

const props = defineProps<DataTableEditModalProps>()

// Form Modal
interface Debt {
	id: number
	customer_name: string
}

const form = reactive<Debt>({
	id: props.row.id,
	customer_name: props.row.customer_name
})

const is_loading = ref(false)
const is_dialog_open = ref(false)
const error_message = ref<String | null>(null)
const { toast } = useToast()

async function submit() {
	// checking
	is_loading.value = true
	try {
		const response = await axios.post(`/api/session/${props.row.id}/send_whatsapp`)
		toggleDialog()

		await tableStore.refresh(tableStore.page_index)
		toast({
			title: 'Operation in queue',
			description: response.data.Result,
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
function toggleDialog() {
	is_dialog_open.value = !is_dialog_open.value
}
</script>

<template>
	<div>
		<div>
			<Button size="sm" class="hidden w-full h-8 lg:flex bg-green-500" @click="toggleDialog">
				<VIcon name="bi-whatsapp" class="size-4 mr-2" />
				Send Whatsapp Message
			</Button>
		</div>
		<AlertDialog :open="is_dialog_open" @update:open="is_dialog_open = $event">
			<AlertDialogContent :isSideBar="false" class="sm:max-w-[700px]">
				<AlertDialogHeader>
					<AlertDialogTitle>Are you sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action will send a payment reminder to {{ props.row.customer_name }}
					</AlertDialogDescription>
				</AlertDialogHeader>

				<div class="grid grid-cols-4 items-center gap-4" v-if="error_message">
					<Label for="name" class="text-red-600 col-span-3 col-start-2">
						<VIcon name="fa-exclamation-triangle" class="size-4 fill-red-600" />
						{{ error_message }}
					</Label>
				</div>
				<AlertDialogFooter class="flex justify-end">
					<AlertDialogCancel>Cancel</AlertDialogCancel>

					<AlertDialogAction @click="submit" :disabled="is_loading">
						<VIcon
							name="fa-circle-notch"
							v-if="is_loading"
							animation="spin"
							speed="slow"
							class="w-fit h-fit mr-2"
						/>
						Send</AlertDialogAction
					>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	</div>
</template>
