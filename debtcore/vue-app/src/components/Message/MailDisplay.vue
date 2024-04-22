<script setup lang="ts">
import {
    Archive,
    ArchiveX,
    Clock,
    Forward,
    MoreVertical,
    Reply,
    ReplyAll,
    Trash2
} from 'lucide-vue-next'
import { computed, ref, nextTick, onMounted, onUnmounted } from 'vue'
import addDays from 'date-fns/addDays'
import addHours from 'date-fns/addHours'
import format from 'date-fns/format'
import nextSaturday from 'date-fns/nextSaturday'
import type { Mail } from './data/mails'
import { Calendar } from '@/components/ui/calendar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

interface MailDisplayProps {
    mail: Mail | undefined
}

const props = defineProps<MailDisplayProps>()

const mailFallbackName = computed(() => {
    return props.mail?.name
        .split(' ')
        .map((chunk) => chunk[0])
        .join('')
})

const today = new Date()

const wrapperRef = ref<HTMLDivElement | null>(null)
const chatHeaderRef = ref<HTMLDivElement | null>(null)
const sendMessageRef = ref<HTMLDivElement | null>(null)

const wrapperHeight = ref<string>('0px')

const fixMessageLayout = () => {
    nextTick(() => {
        const headerHeight: number = chatHeaderRef.value?.offsetHeight ?? 0
        const footerHeight: number = sendMessageRef.value?.offsetHeight ?? 0
        const window: number = wrapperRef.value?.offsetHeight ?? 0

        wrapperHeight.value = `${window - (headerHeight + footerHeight + 30)}px`
    })
}

onMounted(() => {
    fixMessageLayout()
})
</script>

<template>
    <div class="flex h-full flex-col">
        <!-- <div class="flex items-center p-2">
            <div class="flex items-center gap-2">
                <Tooltip>
                    <TooltipTrigger as-child>
                        <Button variant="ghost" size="icon" :disabled="!mail">
                            <Archive class="size-4" />
                            <span class="sr-only">Archive</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Archive</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger as-child>
                        <Button variant="ghost" size="icon" :disabled="!mail">
                            <ArchiveX class="size-4" />
                            <span class="sr-only">Move to junk</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Move to junk</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger as-child>
                        <Button variant="ghost" size="icon" :disabled="!mail">
                            <Trash2 class="size-4" />
                            <span class="sr-only">Move to trash</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Move to trash</TooltipContent>
                </Tooltip>
                <Separator orientation="vertical" class="mx-1 h-6" />
                <Tooltip>
                    <Popover>
                        <PopoverTrigger as-child>
                            <TooltipTrigger as-child>
                                <Button variant="ghost" size="icon" :disabled="!mail">
                                    <Clock class="size-4" />
                                    <span class="sr-only">Snooze</span>
                                </Button>
                            </TooltipTrigger>
                        </PopoverTrigger>
                        <PopoverContent class="flex w-[535px] p-0">
                            <div class="flex flex-col gap-2 border-r px-2 py-4">
                                <div class="px-4 text-sm font-medium">Snooze until</div>
                                <div class="grid min-w-[250px] gap-1">
                                    <Button variant="ghost" class="justify-start font-normal">
                                        Later today
                                        <span class="ml-auto text-muted-foreground">
                                            {{ format(addHours(today, 4), 'E, h:m b') }}
                                        </span>
                                    </Button>
                                    <Button variant="ghost" class="justify-start font-normal">
                                        Tomorrow
                                        <span class="ml-auto text-muted-foreground">
                                            {{ format(addDays(today, 1), 'E, h:m b') }}
                                        </span>
                                    </Button>
                                    <Button variant="ghost" class="justify-start font-normal">
                                        This weekend
                                        <span class="ml-auto text-muted-foreground">
                                            {{ format(nextSaturday(today), 'E, h:m b') }}
                                        </span>
                                    </Button>
                                    <Button variant="ghost" class="justify-start font-normal">
                                        Next week
                                        <span class="ml-auto text-muted-foreground">
                                            {{ format(addDays(today, 7), 'E, h:m b') }}
                                        </span>
                                    </Button>
                                </div>
                            </div>
                            <div class="p-2">
                                <Calendar />
                            </div>
                        </PopoverContent>
                    </Popover>
                    <TooltipContent>Snooze</TooltipContent>
                </Tooltip>
            </div>
            <div class="ml-auto flex items-center gap-2">
                <Tooltip>
                    <TooltipTrigger as-child>
                        <Button variant="ghost" size="icon" :disabled="!mail">
                            <Reply class="size-4" />
                            <span class="sr-only">Reply</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Reply</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger as-child>
                        <Button variant="ghost" size="icon" :disabled="!mail">
                            <ReplyAll class="size-4" />
                            <span class="sr-only">Reply all</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Reply all</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger as-child>
                        <Button variant="ghost" size="icon" :disabled="!mail">
                            <Forward class="size-4" />
                            <span class="sr-only">Forward</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Forward</TooltipContent>
                </Tooltip>
            </div>
            <Separator orientation="vertical" class="mx-2 h-6" />
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button variant="ghost" size="icon" :disabled="!mail">
                        <MoreVertical class="size-4" />
                        <span class="sr-only">More</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>Mark as unread</DropdownMenuItem>
                    <DropdownMenuItem>Star thread</DropdownMenuItem>
                    <DropdownMenuItem>Add label</DropdownMenuItem>
                    <DropdownMenuItem>Mute thread</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div> -->
        <div v-if="mail" class="flex flex-1 flex-col leading-[0px] items-stretch" ref="wrapperRef">
            <div class="flex items-start p-4" ref="chatHeaderRef">
                <div class="flex items-start gap-4 text-sm">
                    <Avatar>
                        <AvatarFallback>
                            {{ mailFallbackName }}
                        </AvatarFallback>
                    </Avatar>
                    <div class="grid gap-1">
                        <div class="font-semibold">
                            {{ mail.name }}
                        </div>
                        <div class="line-clamp-1 text-xs">
                            {{ mail.subject }}
                        </div>
                    </div>
                </div>
                <div v-if="mail.date" class="ml-auto text-xs text-muted-foreground">
                    {{ format(new Date(mail.date), 'PPpp') }}
                </div>
            </div>
            <Separator />
            <ScrollArea :style="{ height: wrapperHeight }">
                <div class="flex md:w-2/3 lg:w-1/3 w-full ml-auto">
                    <div class="flex flex-row-reverse">
                        <Avatar class="flex mt-auto mr-2">
                            <AvatarFallback>
                                {{ mailFallbackName }}
                            </AvatarFallback>
                        </Avatar>
                        <div
                            class="flex-1 whitespace-pre-wrap p-4 text-sm bg-secondary rounded-lg m-3 mb-0"
                        >
                            {{ mail.text }}
                        </div>
                    </div>
                </div>
                <div class="flex md:w-2/3 lg:w-1/3 w-full">
                    <div class="flex">
                        <Avatar class="flex mt-auto ml-2">
                            <AvatarFallback>
                                {{ mailFallbackName }}
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
                                {{ mailFallbackName }}
                            </AvatarFallback>
                        </Avatar>
                        <div
                            class="flex-1 whitespace-pre-wrap p-4 text-sm bg-secondary rounded-lg m-3 mb-0"
                        >
                            {{ mail.text }}
                        </div>
                    </div>
                </div>
            </ScrollArea>
            <Separator class="my-2" />
            <div class="flex-none box-border relative min-h-[160px] z-20" ref="sendMessageRef">
                <form class="p-4">
                    <div class="grid gap-4">
                        <Textarea class="p-4" :placeholder="`Reply ${mail.name}...`" />
                        <div class="flex items-center">
                            <Label
                                html-for="mute"
                                class="flex items-center gap-2 text-xs font-normal"
                            >
                                <Switch id="mute" aria-label="Mute thread" /> Mute this thread
                            </Label>
                            <Button type="button" size="sm" class="ml-auto"> Send </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div v-else class="p-8 text-center text-muted-foreground">No message selected</div>
    </div>
</template>
