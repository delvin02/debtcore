<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns'
import type { Conversation } from './data/conversations'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { inject, ref, nextTick, onMounted } from 'vue'
import Separator from '../ui/separator/Separator.vue'

interface ConversationListProps {
	items: Conversation[]
}

defineProps<ConversationListProps>()
const selectedConversation = defineModel<string>('selectedConversation', { required: false })

function getBadgeVariantFromLabel(label: string) {
	if (['debt'].includes(label.toLowerCase())) return 'default'

	if (['important'].includes(label.toLowerCase())) return 'destructive'

	return 'secondary'
}
</script>

<template>
	<ScrollArea class="flex-1">
		<div class="flex-1 flex flex-col gap-2 p-4 pt-0">
			<TransitionGroup name="list" appear>
				<button
					v-for="item of items"
					:key="item.id"
					:class="
						cn(
							'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
							selectedConversation === item.id && 'bg-muted'
						)
					"
					@click="selectedConversation = item.id"
				>
					<div class="flex w-full flex-col gap-1">
						<div class="flex items-center">
							<div class="flex items-center gap-2">
								<div class="font-semibold">
									{{ item.name }}
								</div>
								<span
									v-if="!item.read"
									class="flex h-2 w-2 rounded-full bg-blue-600"
								/>
							</div>
							<div
								:class="
									cn(
										'ml-auto text-xs',
										selectedConversation === item.id
											? 'text-foreground'
											: 'text-muted-foreground'
									)
								"
							>
								{{
									formatDistanceToNow(new Date(item.date), {
										addSuffix: true
									})
								}}
							</div>
						</div>
						<Separator />
					</div>
					<div class="line-clamp-2 text-xs text-muted-foreground">
						{{ item.text.substring(0, 300) }}
					</div>
					<div class="flex items-center gap-2">
						<Badge
							v-for="label of item.labels"
							:key="label"
							:variant="getBadgeVariantFromLabel(label)"
						>
							{{ label }}
						</Badge>
					</div>
				</button>
			</TransitionGroup>
		</div>
	</ScrollArea>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
	transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: translateY(15px);
}

.list-leave-active {
	position: absolute;
}

.scroll-area {
	height: calc(88vh - 50px);
	overflow-y: auto;
}
</style>
./data/conversations
