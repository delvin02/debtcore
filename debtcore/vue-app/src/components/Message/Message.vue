<script lang="ts" setup>
import { Search } from 'lucide-vue-next'

import { computed, ref, onMounted, provide } from 'vue'
import { refDebounced } from '@vueuse/core'
import type { Mail } from './data/mails'
import MailList from './MailList.vue'
import MailDisplay from './MailDisplay.vue'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

interface MailProps {
	accounts: {
		label: string
		email: string
		icon: string
	}[]
	mails: Mail[]
	defaultLayout?: number[]
	defaultCollapsed?: boolean
}
const props = withDefaults(defineProps<MailProps>(), {
	defaultCollapsed: false,
	defaultLayout: () => [265, 440, 655]
})

const selectedMail = ref<string | undefined>(props.mails[0].id)
const searchValue = ref('')
const debouncedSearch = refDebounced(searchValue, 250)
const messageHeaderElement = ref<HTMLDivElement | null>(null)

const filteredMailList = computed(() => {
	let output: Mail[] = []
	const searchValue = debouncedSearch.value?.trim()
	if (!searchValue) {
		output = props.mails
	} else {
		output = props.mails.filter((item) => {
			return (
				item.name.includes(debouncedSearch.value) ||
				item.email.includes(debouncedSearch.value) ||
				item.name.includes(debouncedSearch.value) ||
				item.subject.includes(debouncedSearch.value) ||
				item.text.includes(debouncedSearch.value)
			)
		})
	}

	return output
})

const unreadMailList = computed(() => filteredMailList.value.filter((item) => !item.read))

const selectedMailData = computed(() => props.mails.find((item) => item.id === selectedMail.value))
</script>

<template>
	<div class="flex">
		<div class="basis-2/5 overflow-hidden">
			<Tabs default-value="all" class="border-r">
				<div class="flex items-center px-4 py-2" ref="messageHeaderElement">
					<h1
						class="text-xl font-bold text-green-600 flex items-center place-items-center"
					>
						<VIcon
							name="fa-whatsapp"
							class="size-6 mr-2 fill-green-600 my-auto"
						/>Whatsapp Message
					</h1>
					<TabsList class="ml-auto">
						<TabsTrigger value="all" class="text-zinc-600 dark:text-zinc-200">
							Read
						</TabsTrigger>
						<TabsTrigger value="unread" class="text-zinc-600 dark:text-zinc-200">
							Unread
						</TabsTrigger>
					</TabsList>
				</div>
				<Separator />
				<div
					class="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60"
				>
					<form>
						<div class="relative">
							<Search class="absolute left-2 top-2.5 size-4 text-muted-foreground" />
							<Input v-model="searchValue" placeholder="Search" class="pl-8" />
						</div>
					</form>
				</div>
				<TabsContent value="all" class="m-0">
					<MailList v-model:selected-mail="selectedMail" :items="filteredMailList" />
				</TabsContent>
				<TabsContent value="unread" class="m-0">
					<MailList v-model:selected-mail="selectedMail" :items="unreadMailList" />
				</TabsContent>
			</Tabs>
		</div>
		<div class="w-full basis-4/5 flex-grow">
			<MailDisplay :mail="selectedMailData" />
		</div>
	</div>
</template>
