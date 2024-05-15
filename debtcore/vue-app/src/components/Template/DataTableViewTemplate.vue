<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { cn } from '@/lib/utils'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@/components/ui/sheet'
import { languages } from './data/data'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Task } from '@/components/Template/data/schema'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import DOMPurify from 'dompurify'
import type { Variable } from './data/types'
import axios from 'axios'
import { useToast } from '@/components/ui/toast/use-toast'

interface DataTableEditModalProps {
	row: Task
}

const props = defineProps<DataTableEditModalProps>()

interface Component {
	type: 'HEADER' | 'BODY' | 'FOOTER'
	format?: string
	text: string
	example?: {
		header_handle?: string[]
		body_text?: string[][]
	}
}

interface PreviewMessage {
	head?: Component
	body?: Component
	footer?: Component
}

interface Template {
	id: number
	template_id?: string
	category: string
	language: string
	components?: Array<Component>
}

const form = reactive<Template>({
	id: props.row.id,
	template_id: props.row.template_id,
	category: '',
	language: '',
	components: undefined
})

const previewMessage: PreviewMessage = reactive({
	head: undefined,
	body: undefined,
	footer: undefined
})

function assignComponents(head: Component, body: Component, footer: Component) {
	previewMessage.head = head
	previewMessage.body = body
	previewMessage.footer = footer
}

const is_dialog_open = ref(false)
const { toast } = useToast()

async function init() {
	try {
		const response = await axios.get(`/api/template/${props.row.id}`, {
			withCredentials: true,
			headers: {
				'Cache-Control': 'no-cache',
				Pragma: 'no-cache',
				Expires: '0'
			}
		})

		Object.assign(form, response.data.Result)
		var head = form.components?.find((comp) => comp.type === 'HEADER') as Component
		var body = form.components?.find((comp) => comp.type === 'BODY') as Component
		var footer = form.components?.find((comp) => comp.type === 'FOOTER') as Component
		assignComponents(head, body, footer)
	} catch (error: any) {
		var message = error.response.data.message || ''
		toast({
			title: 'Whoops, something went wrong',
			description: message,
			variant: 'destructive'
		})
	}
}

var message = computed(() => {
	if (
		!previewMessage.body ||
		!previewMessage.body.text ||
		!previewMessage.body.example ||
		!previewMessage.body.example.body_text ||
		!previewMessage.body.example.body_text[0]
	) {
		return ''
	}

	var msg = previewMessage.body.text
	var data = previewMessage.body.example.body_text[0]

	data.forEach((replacement, index) => {
		msg = msg.replace(new RegExp('\\{\\{' + (index + 1) + '\\}\\}', 'g'), replacement)
	})

	msg = msg.replace(/\*(.*?)\*/g, '<b>$1</b>')
	return msg
})

function toggleSheet() {
	is_dialog_open.value = !is_dialog_open.value
	if (is_dialog_open.value) {
		init()
	}
}
</script>

<template>
	<div>
		<div>
			<Button
				variant="default"
				size="sm"
				class="hidden h-8 ml-2 lg:flex"
				@click="toggleSheet"
			>
				View
			</Button>
		</div>
		<Sheet :open="is_dialog_open" @update:open="is_dialog_open = $event">
			<SheetContent side="right" :class="cn('flex flex-col sm:max-w-fit')">
				<SheetTitle>View Template</SheetTitle>
				<Separator />
				<div class="flex items-stretch gap-4 h-full">
					<div class="w-[300px] border-r-2 pr-4">
						<SheetHeader>
							<SheetTitle>Language</SheetTitle>
						</SheetHeader>
						<Separator class="my-3" />

						<div class="h-full mt-2 w-[200px]">
							<Label variant="ghost" class="w-full justify-start"> English </Label>
						</div>
					</div>
					<div class="w-[400px]">
						<SheetHeader>
							<SheetTitle>Preview Message</SheetTitle>
						</SheetHeader>
						<Separator class="my-3" />

						<div class="h-full">
							<div
								class="box-border relative w-full overflow-y-auto bg-[#e5ddd5] before:z-0 before:content-[''] before:h-full before:w-full before:mb-2 before:opacity-[0.06] before:absolute before:size before:bg-cover before:left-0 before:bg-whatsapp-bg my-auto"
							>
								<div class="block mx-4 my-3">
									<div
										class="box-border inline-block w-[300px] my-2 p-1 bg-[#fff] relative rounded after:h-[31px] after:-left-3 after:absolute after:top-3 after:bg-whatsapp-chat-edge after:bg-no-repeat after:w-3 after:bg-contain after:content-['']"
									>
										<div v-if="previewMessage.head">
											<iframe
												v-if="previewMessage.head.example?.header_handle"
												:src="previewMessage.head.example?.header_handle[0]"
												class="w-full h-64 rounded px-2"
												type="application/pdf"
											></iframe>
										</div>

										<div class="min-h-5 relative break-words p-1 rounded">
											<p
												class="text-left text-black px-1 text-sm whitespace-pre-wrap"
												v-if="previewMessage.body"
												v-html="message"
											></p>
											<div
												class="flex justify-between items-end"
												v-if="previewMessage.footer"
											>
												<p
													class="text-left ml-1 text-gray-400 text-sm pb-1"
												>
													{{ previewMessage.footer.text }}
												</p>
												<p
													class="text-right mr-1 text-gray-400 text-[10px]"
												>
													12:52 AM
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	</div>
</template>

<style scoped>
.custom-sidebar-dialog {
	position: fixed; /* Fixed position to stay in place */
	top: 0; /* Align to the top */
	right: 0; /* Align to the right */
	height: 100vh; /* Full viewport height */
	width: 700px; /* Or any width you prefer */
	background-color: white; /* Background color */
	box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5); /* Optional: shadow for depth */
	z-index: 1000; /* Ensure it's above other content */
	/* Add more styling as needed */
}
</style>
