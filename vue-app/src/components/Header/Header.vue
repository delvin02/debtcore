<script lang="ts" setup>
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
import { ref, defineExpose, inject, onMounted } from 'vue'
// import addDays from 'date-fns/addDays'
// import addHours from 'date-fns/addHours'
// import format from 'date-fns/format'
// import nextSaturday from 'date-fns/nextSaturday'
// import type { Mail } from '../data/mails'
import { Calendar } from '@/components/ui/calendar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useSideBarStore } from '@/store/index'
import { useAuthStore } from '@/store/index'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/index'
import { user } from '@/main'

// logout
const router = useRouter()

const logout = async () => {
    const success = await user.logout()
    if (success) {
        router.push('/login')
    }
}

// interface MailDisplayProps {
//   mail: Mail | undefined
// }

//const props = defineProps<MailDisplayProps>()

// const mailFallbackName = computed(() => {
//   return props.mail?.name
//     .split(' ')
//     .map(chunk => chunk[0])
//     .join('')
// })

export interface ComponentMethods {
    getHeaderHeight: () => number
}

const headerElementRef = ref<HTMLDivElement | null>(null)

defineExpose({
    getHeaderHeight() {
        return headerElementRef.value?.offsetHeight ?? 0
    }
})

const store = useSideBarStore()

const today = new Date()
</script>

<template>
    <div ref="headerElementRef">
        <div class="flex items-center h-[52px]">
            <div class="flex items-center justify-center gap-2">
                <Tooltip>
                    <TooltipTrigger as-child>
                        <Button
                            :variant="store.isCollapsible ? 'default' : 'ghost'"
                            class="ml-2"
                            size="icon"
                            @click="store.toggleCollapsible()"
                        >
                            <VIcon class="size-4" name="fa-bars" />
                            <span class="sr-only">Archive</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Archive</TooltipContent>
                </Tooltip>
                <div>
                    <h1 class="font-bold">SEMIX SDN BHD</h1>
                </div>
            </div>
            <div class="ml-auto flex items-center gap-2"></div>
            <Separator orientation="vertical" class="mx-2 h-6" />
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button variant="ghost" size="icon" class="mr-2">
                        <VIcon class="size-4" name="fa-user-alt" />
                        <span class="sr-only">More</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                        <VIcon class="size-4 mr-1" name="fa-lock" />
                        Change Password</DropdownMenuItem
                    >
                    <Separator orientation="horizontal" class="my-2" />
                    <DropdownMenuItem @click="logout()">
                        <VIcon class="size-4 mr-1" name="fa-sign-out-alt" />
                        LogOut</DropdownMenuItem
                    >
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <Separator />
        <!-- <div v-if="mail" class="flex flex-1 flex-col">
            <div class="flex items-start p-4">
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
                        <div class="line-clamp-1 text-xs">
                            <span class="font-medium">Reply-To:</span> {{ mail.email }}
                        </div>
                    </div>
                </div>
                <div v-if="mail.date" class="ml-auto text-xs text-muted-foreground">
                    {{ format(new Date(mail.date), 'PPpp') }}
                </div>
            </div>
            <Separator />
            <div class="flex-1 whitespace-pre-wrap p-4 text-sm">
                {{ mail.text }}
            </div>
            <Separator class="mt-auto" />
            <div class="p-4">
                <form>
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
        <div v-else class="p-8 text-center text-muted-foreground">No message selected</div> -->
    </div>
</template>
