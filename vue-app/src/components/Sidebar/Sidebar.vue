<script lang="ts" setup>
import { defineProps, withDefaults, ref } from 'vue'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Separator } from '@/components/ui//separator'
import { cn } from '@/lib/utils'
import Nav, { type LinkProp } from './Nav.vue'

interface MailProps {
    accounts: {
        label: string
        email: string
        icon: string
    }[]
    defaultLayout?: number[]
    defaultCollapsed?: boolean
    navCollapsedSize: number
}

const props = withDefaults(defineProps<MailProps>(), {
    defaultCollapsed: false,
    defaultLayout: () => [265, 440, 655]
})

const isCollapsed = ref(props.defaultCollapsed)

const links: LinkProp[] = [
    {
        title: 'Inbox',
        label: '128',
        icon: 'fa-flag',
        variant: 'default'
    },
    {
        title: 'Drafts',
        label: '9',
        icon: 'lucide:file',
        variant: 'ghost'
    },
    {
        title: 'Sent',
        label: '',
        icon: 'lucide:send',
        variant: 'ghost'
    },
    {
        title: 'Junk',
        label: '23',
        icon: 'lucide:archive',
        variant: 'ghost'
    },
    {
        title: 'Trash',
        label: '',
        icon: 'lucide:trash',
        variant: 'ghost'
    },
    {
        title: 'Archive',
        label: '',
        icon: 'lucide:archive',
        variant: 'ghost'
    }
]

const links2: LinkProp[] = [
    {
        title: 'Social',
        label: '972',
        icon: 'lucide:user-2',
        variant: 'ghost'
    },
    {
        title: 'Updates',
        label: '342',
        icon: 'lucide:alert-circle',
        variant: 'ghost'
    },
    {
        title: 'Forums',
        label: '128',
        icon: 'lucide:message-square',
        variant: 'ghost'
    },
    {
        title: 'Shopping',
        label: '8',
        icon: 'lucide:shopping-cart',
        variant: 'ghost'
    },
    {
        title: 'Promotions',
        label: '21',
        icon: 'lucide:archive',
        variant: 'ghost'
    }
]

function onCollapse() {
    isCollapsed.value = true
}

function onExpand() {
    isCollapsed.value = false
}
</script>

<template>
    <TooltipProvider :delay-duration="0">
        <ResizablePanelGroup
            id="resize-panel-group-1"
            direction="horizontal"
            class="h-full max-h-[800px] items-stretch"
        >
            <ResizablePanel
                id="resize-panel-1"
                :default-size="defaultLayout[0]"
                :collapsed-size="navCollapsedSize"
                collapsible
                :min-size="15"
                :max-size="20"
                :class="cn(isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out')"
                @expand="onExpand"
                @collapse="onCollapse"
            >
                <div
                    :class="
                        cn(
                            'flex h-[52px] items-center justify-center',
                            isCollapsed ? 'h-[52px]' : 'px-2'
                        )
                    "
                >
                    <AccountSwitcher :is-collapsed="isCollapsed" :accounts="accounts" />
                </div>
                <Separator />
                <Nav :is-collapsed="isCollapsed" :links="links" />
                <Separator />
                <Nav :is-collapsed="isCollapsed" :links="links2" />
            </ResizablePanel>
            <ResizableHandle id="resize-handle-1" with-handle />
            <ResizablePanel id="resize-panel-2" :default-size="defaultLayout[1]" :min-size="30">
                <VIcon icon="FaUserCircle" />
            </ResizablePanel>
            <ResizableHandle id="resiz-handle-2" with-handle />
            <ResizablePanel id="resize-panel-3" :default-size="defaultLayout[2]">
                <h1>test</h1>
            </ResizablePanel>
        </ResizablePanelGroup>
    </TooltipProvider>
</template>
