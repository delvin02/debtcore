<script lang="ts" setup>
import { ref, inject, reactive } from 'vue'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import type { Task } from '@/components/Setup/data/schema'
import { useToast } from '@/components/ui/toast/use-toast'
import { useTableStore } from '@/store/table'

const phoneStore = inject('phoneStore', useTableStore('phone'))

interface DataTableSetDefaultPhone {
	row: Task
}

const props = defineProps<DataTableSetDefaultPhone>()

interface Phone {
	id: number
}

const form = reactive<Phone>({
	id: props.row.id
})

const is_loading = ref(false)
const { toast } = useToast()

const submit = async () => {
	is_loading.value = true
	try {
		const response = await axios.post('/api/setup/phone/setdefault', {
			...form
		})

		await phoneStore.refresh(phoneStore.page_index)
		toast({
			title: response.data.message,
			variant: 'success'
		})
	} catch (error: any) {
		var message = error.response.data.message || ''
		toast({
			title: 'Whoops, something went wrong',
			description: message,
			variant: 'destructive'
		})
	} finally {
		is_loading.value = false
	}
}
</script>

<template>
	<div>
		<Button variant="default" size="sm" class="p-2 px-3" @click="submit" :disabled="is_loading">
			<VIcon
				name="fa-circle-notch"
				v-if="is_loading"
				animation="spin"
				speed="slow"
				class="w-fit h-fit mr-2"
			/>
			Set Default
		</Button>
	</div>
</template>
