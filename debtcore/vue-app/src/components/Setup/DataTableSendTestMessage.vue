<script lang="ts" setup>
import { ref, inject, reactive } from 'vue'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import type { Task } from '@/components/Setup/data/schema'
import { useToast } from '@/components/ui/toast/use-toast'
import { useTableStore } from '@/store/table'
import {
	Dialog,
	DialogScrollContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogFooter
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
const phoneStore = inject('phoneStore', useTableStore('phone'))

interface DataTableSetDefaultPhone {
	row: Task
}

const props = defineProps<DataTableSetDefaultPhone>()

interface Phone {
	id: number
	phone: string
}

const form = reactive<Phone>({
	id: props.row.id,
	phone: ''
})

const is_loading = ref(false)
const is_dialog_open = ref(false)
const error_message = ref<String | null>(null)
const { toast } = useToast()

const submit = async () => {
	is_loading.value = true
	try {
		const response = await axios.post('/api/setup/phone/send-test-message', {
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

function toggle() {
	is_dialog_open.value = !is_dialog_open.value
}
</script>

<template>
	<div>
		<div>
			<Button variant="default" size="sm" class="p-2 px-3" @click="toggle">
				<VIcon
					name="fa-circle-notch"
					v-if="is_loading"
					animation="spin"
					speed="slow"
					class="w-fit h-fit mr-2"
				/>
				Send Message
			</Button>
		</div>
		<Dialog :open="is_dialog_open" @update:open="is_dialog_open = $event">
			<DialogScrollContent :isSideBar="false" class="sm:max-w-[700px]">
				<DialogHeader>
					<DialogTitle>Send Test Message</DialogTitle>
					<DialogDescription> Insert the phone number, click send. </DialogDescription>
				</DialogHeader>
				<div class="grid gap-4 py-4">
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="phone" class="text-right"> Phone Number </Label>
						<Input
							id="about"
							v-model="form.phone"
							placeholder="60129884721"
							class="col-span-3"
						/>
					</div>
				</div>
				<Separator />
				<div class="grid grid-cols-4 items-center gap-4" v-if="error_message">
					<Label for="name" class="text-red-600 col-span-3 col-start-2">
						<VIcon name="fa-exclamation-triangle" class="size-4 fill-red-600" />
						{{ error_message }}
					</Label>
				</div>
				<DialogFooter class="flex justify-end">
					<Button type="submit" @click="submit" :disabled="is_loading">
						<VIcon
							name="fa-circle-notch"
							v-if="is_loading"
							animation="spin"
							speed="slow"
							class="w-fit h-fit mr-2"
						/>
						Send</Button
					>
				</DialogFooter>
			</DialogScrollContent>
		</Dialog>
	</div>
</template>
