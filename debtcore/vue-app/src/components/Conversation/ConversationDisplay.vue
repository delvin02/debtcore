<script setup lang="ts">
import { computed, ref, nextTick, onMounted, onUnmounted } from 'vue'
import format from 'date-fns/format'
import nextSaturday from 'date-fns/nextSaturday'
import type { Conversation } from './data/conversations'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

interface ConversationDisplayProps {
	conversation: Conversation | undefined
}

const props = defineProps<ConversationDisplayProps>()

const conversationFallbackName = computed(() => {
	return props.conversation?.name
		.split(' ')
		.map((chunk) => chunk[0])
		.join('')
})
</script>

<template>
	<div v-if="conversation" class="leading-[0px] overflow-y-hidden">
		<div class="flex items-start p-4">
			<div class="flex items-start gap-4 text-sm">
				<Avatar>
					<AvatarFallback>
						{{ conversationFallbackName }}
					</AvatarFallback>
				</Avatar>
				<div class="grid gap-1">
					<div class="font-semibold">
						{{ conversation.name }}
					</div>
					<div class="line-clamp-1 text-xs">
						{{ conversation.subject }}
					</div>
				</div>
			</div>
			<div v-if="conversation.date" class="ml-auto text-xs text-muted-foreground">
				{{ format(new Date(conversation.date), 'PPpp') }}
			</div>
		</div>
		<Separator />
		<ScrollArea class="flex-1">
			<div class="flex md:w-2/3 lg:w-1/3 w-full ml-auto">
				<div class="flex flex-row-reverse">
					<Avatar class="flex mt-auto mr-2">
						<AvatarFallback>
							{{ conversationFallbackName }}
						</AvatarFallback>
					</Avatar>
					<div
						class="flex-1 whitespace-pre-wrap p-4 text-sm bg-secondary rounded-lg m-3 mb-0"
					>
						{{ conversation.text }}
					</div>
				</div>
			</div>
			<div class="flex md:w-2/3 lg:w-1/3 w-full">
				<div class="flex">
					<Avatar class="flex mt-auto ml-2">
						<AvatarFallback>
							{{ conversationFallbackName }}
						</AvatarFallback>
					</Avatar>
					<div
						class="flex-1 whitespace-pre-wrap p-4 text-sm bg-secondary rounded-lg m-3 mb-0"
					>
						Thanks!
					</div>
				</div>
			</div>
			<div class="flex md:w-2/3 lg:w-1/3 w-full">
				<div class="flex">
					<Avatar class="flex mt-auto ml-2">
						<AvatarFallback>
							{{ conversationFallbackName }}
						</AvatarFallback>
					</Avatar>
					<div
						class="flex-1 whitespace-pre-wrap p-4 text-sm bg-secondary rounded-lg m-3 mb-0"
					>
						{{ conversation.text }}
					</div>
				</div>
			</div>
		</ScrollArea>
		<Separator class="my-2" />
		<div class="flex-none box-border relative z-20">
			<form class="p-4">
				<div class="flex items-center gap-4">
					<Button type="button" size="sm" variant="ghost">
						<VIcon name="fa-paperclip" class="h-full" />
					</Button>
					<Input class="p-4" :placeholder="`Reply ${conversation.name}...`" />
					<Button type="button" size="sm" class="ml-auto"> Send </Button>
				</div>
			</form>
		</div>
	</div>
	<div v-else class="p-8 text-center text-muted-foreground">No message selected</div>
</template>
