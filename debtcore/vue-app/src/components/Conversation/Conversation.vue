<script lang="ts" setup>
import { computed, ref, onMounted, onUnmounted, inject, nextTick } from 'vue'

import type { Ref } from 'vue'
import { refDebounced } from '@vueuse/core'
import type { Conversation } from './data/conversations'
import ConversationList from './ConversationList.vue'
import ConversationDisplay from './ConversationDisplay.vue'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

interface ConversationProps {
	accounts: {
		label: string
		email: string
		icon: string
	}[]
	conversations: Conversation[]
	defaultLayout?: number[]
	defaultCollapsed?: boolean
}
const props = withDefaults(defineProps<ConversationProps>(), {
	defaultCollapsed: false,
	defaultLayout: () => [265, 440, 655]
})

const selectedConversation = ref<string | undefined>(props.conversations[0].id)
const searchValue = ref('')
const debouncedSearch = refDebounced(searchValue, 250)

var messageHeaderElement = ref<HTMLDivElement | null>(null)
var searchHeaderElement = ref<HTMLDivElement | null>(null)
var conversationList = ref<number>(0)

var conversationWrapperHeight = inject<Ref<number>>('height')

const filteredConversationList = computed(() => {
	let output: Conversation[] = []
	const searchValue = debouncedSearch.value?.trim()
	if (!searchValue) {
		output = props.conversations
	} else {
		output = props.conversations.filter((item) => {
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

const unreadConversationList = computed(() =>
	filteredConversationList.value.filter((item) => !item.read)
)

const selectedConversationData = computed(() =>
	props.conversations.find((item) => item.id === selectedConversation.value)
)

const updateHeight = () => {
	nextTick().then(() => {
		if (conversationWrapperHeight) {
			conversationList.value =
				conversationWrapperHeight.value -
				((messageHeaderElement.value?.clientHeight || 0) +
					(searchHeaderElement.value?.clientHeight || 0))
		}
	})
}

onMounted(() => {
	updateHeight()
	window.addEventListener('resize', updateHeight)
})

onUnmounted(() => {
	window.removeEventListener('resize', updateHeight)
})
</script>

<template>
	<div class="flex">
		<div class="basis-2/5 overflow-hidden h-full">
			<Tabs default-value="all" class="border-r flex flex-col">
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
					ref="searchHeaderElement"
				>
					<form>
						<div class="relative">
							<Search class="absolute left-2 top-2.5 size-4 text-muted-foreground" />
							<Input v-model="searchValue" placeholder="Search" class="pl-8" />
						</div>
					</form>
				</div>
				<TabsContent value="all" class="m-0">
					<ConversationList
						v-model:selected-conversation="selectedConversation"
						:items="filteredConversationList"
						:style="{ height: conversationList + 'px' }"
					/>
				</TabsContent>
				<TabsContent value="unread" class="m-0">
					<ConversationList
						v-model:selected-conversation="selectedConversation"
						:items="unreadConversationList"
						class="flex-grow"
					/>
				</TabsContent>
			</Tabs>
		</div>
		<div class="w-full basis-4/5">
			<ConversationDisplay
				:conversation="selectedConversationData"
				:style="{ height: conversationWrapperHeight + 'px' }"
				class="flex flex-col overflow-y-hidden"
			/>
		</div>
	</div>
</template>
