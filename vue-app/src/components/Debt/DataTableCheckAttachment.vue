<script setup lang="ts">
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogFooter
} from '@/components/ui/dialog'

import { Input } from '@/components/ui/input'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ref, reactive, inject, watch, computed, onMounted } from 'vue'
import { cn } from '@/lib/utils'
import axios from 'axios'
import { format, parseISO } from 'date-fns'
import { useTableStore } from '@/store/table'
import type { Task } from '@/components/Debt/data/schema'
import { useToast } from '@/components/ui/toast/use-toast'
import type { GenericSelectListModel, SelectList } from '@/common/SelectList'
import _ from 'lodash'
import { ScrollArea } from '@/components/ui/scroll-area'
import { VuePDF, usePDF } from '@tato30/vue-pdf'

const tableStore = inject('tableStore', useTableStore('debt'))

interface DataTableEditModalProps {
	row: Task
}

const props = defineProps<DataTableEditModalProps>()

// Form Modal
interface Debt {
	document: string | File | null
	document_url: string | null
}

const form = reactive<Debt>({
	document: null,
	document_url: props.row.document_url
})




function onError(reason: any) {
  toast({
    title: `PDF loading error: ${reason}`,
    variant: 'destructive'
  })
}
// default page
const page = ref(1)
const is_loading = ref(false)
const is_dialog_open = ref(false)
const dialogContentHeight = ref<number>(window.innerHeight - 250)
const error_message = ref<String | null>(null)
const { toast } = useToast()
const { pdf, pages, info } = usePDF(props.row.document_url, {
  onError
})


async function init() {
	try {
		const response = await axios.get(`http://127.0.0.1:8000/api/debt/${props.row.id}/document/`)

		form.document_url = response.data.Result.document_url

		is_loading.value = false
	} catch (error) {
		is_loading.value = false
	}
}

const onPdfLoaded = () => {
	const canvas = document.querySelector<HTMLCanvasElement>('#vp > div > div > div > canvas')
	if (canvas) {
		const canvasHeight = canvas.offsetHeight
		const maxHeight = window.innerHeight - 250
		const minHeight = 680

		if (maxHeight > canvasHeight && canvasHeight < minHeight) {
			dialogContentHeight.value = canvasHeight
		} else if (maxHeight > canvasHeight){
      dialogContentHeight.value = maxHeight
    }else {
			dialogContentHeight.value = Math.min(Math.max(canvasHeight, minHeight), maxHeight)
		}
	}
}


async function submit() {

	is_loading.value = true
	try {
		const response = await axios.patch(
			`http://127.0.0.1:8000/api/debt/${props.row.id}/document/`,
			{
				...form
			},
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
		)
		toggleDialog()
		await tableStore.refresh(tableStore.page_index)
		toast({
			title: response.data.Result,
			variant: 'success'
		})
	} catch (error) {
		let errorMessage = 'An unexpected error occurred.'
		if (axios.isAxiosError(error) && error.response) {
			if (error.response.data.details && typeof error.response.data.details === 'object') {
				const errorKeys = Object.keys(error.response.data.details)
				if (errorKeys.length > 0 && error.response.data.details[errorKeys[0]].length > 0) {
					errorMessage = error.response.data.details[errorKeys[0]][0]
				}
			} else if (error.response.data.error) {
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

function replace() {
	form.document_url = null
}
function toggleDialog() {
	is_dialog_open.value = !is_dialog_open.value
	if (is_dialog_open.value) {
		init()
	}
}

function handleFileChange(event: Event) {
	const input = event.target as HTMLInputElement
	if (input.files?.length) {
		const file = input.files[0] 

		// only PDF
		if (file.type !== "application/pdf") {

			toast({
				title: "Please select a PDF file",
				variant: 'destructive'
			})
			input.value = '';
      return; 
    }

    // Check if the file size is under 5MB
    if (file.size > 5 * 1024 * 1024) {

			toast({
				title: "The file size must be under 5MB",
				variant: 'destructive'
			})
			input.value = '';
      return; 
    }
		form.document= file

	}
}
</script>

<template>
	<div>
		<div>
			<Button variant="default" size="sm" class="hidden h-8 lg:flex" @click="toggleDialog">
				<!-- <MixerHorizontalIcon class="mr-2 h-4 w-4" /> -->
				<VIcon name="fa-regular-file-image" class="size-4" />
			</Button>
		</div>
		<Dialog class="my-2" :open="is_dialog_open" @update:open="is_dialog_open = $event">
			<DialogContent :isSideBar="false" class="sm:max-w-fit">
				<DialogHeader>
					<DialogTitle>Attachment Overview</DialogTitle>
				</DialogHeader>
				<div>
					<div
						v-if="!form.document_url"
						class="grid grid-cols-4 items-center gap-x-4 text-primary"
					>
						<Label for="mobile" class="text-right"> Attachment </Label>
						<div class="col-span-3">
							<Input
								id="name"
								type="file"
								@change="handleFileChange"
								class="col-span-3"
							/>
						</div>
						<p
							class="col-start-2 col-span-3 mt-1 text-sm text-gray-500 dark:text-gray-300"
						>
							PNG, JPG or JPEG, PDF
						</p>
					</div>
					<div v-else-if="form.document_url.endsWith('.pdf')">
            <div class="flex justify-center my-auto items-center place-items-center mb-2">
              <Button variant="secondary" @click="page = page > 1 ? page - 1 : page">
                <VIcon name="fa-chevron-left" class="size-fit" />
              </Button>
              <span class="mx-2">{{ page }} / {{ pages }}</span>
              <Button variant="secondary" @click="page = page < pages ? page + 1 : page">
                <VIcon name="fa-chevron-right" class="size-fit" />
              </Button>
            </div>
						<ScrollArea
							class="border border-primary"
							style="width: 720px; overflow-y: auto; overflow-x: hidden"
							:style="{ height: dialogContentHeight + 'px' }"
						>
							<VuePDF :pdf="pdf" :page="page" fit-parent @loaded="onPdfLoaded" annonation-layer>
                <div class="flex justify-center my-auto items-center place-items-center">
                  <VIcon
                    name="fa-circle-notch"
                    animation="spin"
                    speed="slow"
                    class="size-8 mr-2 my-auto"
                  />
                </div>
              </VuePDF>
						
            </ScrollArea>
					</div>
					<img
						v-else
						:src="form.document_url"
						alt="Document preview"
						class="object-contain"
					/>
				</div>
				<DialogFooter class="flex justify-end">
					<Button
						class="bg-red-600 text-white"
						@click="replace"
						v-if="form.document_url"
						:disabled="is_loading"
					>
						Replace</Button
					>
					<Button @click="submit" v-else :disabled="is_loading">
						<VIcon
							name="fa-circle-notch"
							v-if="is_loading"
							animation="spin"
							speed="slow"
							class="w-fit h-fit mr-2"
						/>
						Update
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	</div>
</template>

