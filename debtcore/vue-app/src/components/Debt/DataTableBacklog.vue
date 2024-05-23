<script setup lang="ts">
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	SheetFooter,
	SheetClose
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { ref, inject, reactive, onMounted, nextTick, type Ref } from 'vue'
import axios from 'axios'
import { format, parseISO } from 'date-fns'
import { useAuthStore } from '@/store/user'
import type { Task } from '@/components/Debt/data/schema'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/toast/use-toast'

const auth = useAuthStore()

interface DataTableEditModalProps {
	row: Task
}

const props = defineProps<DataTableEditModalProps>()

interface Form {
	debt: number
	message: string
}

const form = reactive<Form>({
	debt: props.row.id,
	message: ''
})

interface Backlog {
	name: string
	created_date: Date | string
	message: string
	created_by_name: string
	is_system_generated: boolean
}

const messages = reactive<Backlog[]>([])

const is_loading = ref(false)
const is_dialog_open = ref(false)
const error_message = ref<String | null>(null)
const { toast } = useToast()

var headerElement = ref<HTMLDivElement | null>(null)
var footerElement = ref<HTMLDivElement | null>(null)
var bodyElement = ref<number>(0)

var wrapperHeight = inject<Ref<number>>('height')

async function init() {
	try {
		const response = await axios.get(`/api/debt/${props.row.id}/backlog/`)

		messages.splice(0, messages.length, ...response.data.Result)

		is_loading.value = false
	} catch (error) {
		is_loading.value = false
	}
}

function validateForm() {
	const validations = [
		{ condition: form.message == '', message: 'Message cannot be blank' },
		{ condition: form.message.length < 5, message: 'Maybe a little more context?' }
	]

	for (let validation of validations) {
		if (validation.condition) {
			error_message.value = validation.message
			return false
		}
	}
	return true
}

async function submit() {
	// checking
	const isValid = validateForm()
	if (!isValid) {
		return
	}
	is_loading.value = true
	try {
		const response = await axios.post(
			`/api/debt/${props.row.id}/backlog/`,
			{
				...form
			},
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
		await init()
		toast({
			title: response.data.Result,
			variant: 'success'
		})
		form.message = ''
		error_message.value = ''
	} catch (error) {
		let errorMessage = 'An unexpected error occurred.'
		toast({
			title: 'Whoops, something went wrong',
			description: errorMessage || '',
			variant: 'destructive'
		})
	} finally {
		is_loading.value = false
	}
}

const updateHeight = () => {
	nextTick().then(() => {
		if (wrapperHeight) {
			bodyElement.value =
				wrapperHeight.value -
				((headerElement.value?.clientHeight || 0) +
					(footerElement.value?.clientHeight || 0)) -
				25
		}
	})
}

function toggleSheet() {
	is_dialog_open.value = !is_dialog_open.value
	if (is_dialog_open.value) {
		init()
		updateHeight()
	}
}
</script>

<template>
	<div>
		<div>
			<Button
				variant="secondary"
				size="sm"
				class="h-8 flex border border-primary"
				@click="toggleSheet"
			>
				<VIcon name="bi-bookmark-plus-fill" class="size-4" />
			</Button>
		</div>
		<Sheet :open="is_dialog_open" @update:open="is_dialog_open = $event">
			<SheetContent class="h-screen" side="right">
				<div ref="headerElement">
					<SheetHeader>
						<SheetTitle>Backlog - {{ props.row.invoice }}</SheetTitle>
					</SheetHeader>
				</div>
				<Separator class="mt-2 mb-4 border-primary border" />

				<ScrollArea class="flex flex-col" :style="{ height: bodyElement + 'px' }">
					<div class="pr-4">
						<div v-for="(msg, index) in messages" :key="index" class="pr-4 my-2">
							<div class="flex justify-between">
								<div
									class="text-primary font-bold flex place-items-center self-center"
									v-if="msg.is_system_generated"
								>
									<VIcon
										name="bi-circle-fill"
										class="size-3 my-auto fill-green-600 mr-2"
										animation="pulse"
									/>
									System Generated
								</div>
								<div class="text-primary font-bold" v-else>
									{{ msg.created_by_name }}
								</div>
							</div>

							<div>
								<div class="text-primary">
									{{ msg.created_date }}
								</div>
								<Separator variant="default" />

								<div>{{ msg.message }}</div>
							</div>
						</div>
					</div>
				</ScrollArea>

				<div class="flex flex-col" ref="footerElement">
					<Label for="error" class="text-red-600 flex" v-if="error_message">
						<VIcon name="fa-exclamation-triangle" class="size-4 fill-red-600" />
						<p class="text-sm">{{ error_message }}</p>
					</Label>
					<div class="flex mt-2 gap-2">
						<Input
							id="message"
							v-model="form.message"
							placeholder="Enter your message here"
							class="w-full flex-1"
						/>

						<Button type="submit" @click="submit"> Save </Button>
					</div>
					<p class="text-xs mt-2">{{ auth.getUsername }}</p>
				</div>
			</SheetContent>
		</Sheet>
	</div>
</template>
