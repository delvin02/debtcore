<script lang="ts" setup>
import { defineProps, withDefaults, ref } from 'vue'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Separator } from '@/components/ui//separator'
import { cn } from '@/lib/utils'
import Nav, { type LinkProp } from './Nav.vue'
import MainDisplay from './MainDisplay.vue'
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
    defaultLayout: () => [15, 85]
})

const isCollapsed = ref(props.defaultCollapsed)

const links: LinkProp[] = [
    {
        title: 'Dashboard',
        label: '128',
        icon: 'fa-home',
        variant: 'default'
    },
    
]

const links1: LinkProp[] = [
    {
        title: 'Template',
        icon: 'fa-whatsapp',
        variant: 'ghost'
    },
    {
        title: 'Vendor',
        icon: 'fa-address-book',
        variant: 'ghost'
    }
]
const connections: LinkProp[] = [
    {
        title: 'Connections',
        icon: 'fa-plug',
        variant: 'ghost'
    },
]
const links2: LinkProp[] = [
    {
        title: 'User',
        icon: 'fa-user-alt',
        variant: 'ghost'
    },
    {
        title: 'Company',
        icon: 'fa-building',
        variant: 'ghost'
    },
    {
        title: 'Usage Report',
        icon: 'bi-graph-up-arrow',
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
                :min-size="10"
                :class="cn(isCollapsed && 'min-w-[50px] max-w-[80px] transition-all duration-300 ease-in-out')"
                @expand="onExpand"
                @collapse="onCollapse"
                default="{20}"
                :disabled="true"
            >
                <div
                    :class="
                        cn(
                            'flex h-[52px] items-center justify-center',
                            isCollapsed ? 'h-[52px]' : 'px-2'
                        )
                    "
                >
                <h1 class="text-2xl font-bold">DebtCore</h1>

                    <AccountSwitcher :is-collapsed="isCollapsed" :accounts="accounts" />
                </div>
                <Separator />
                <h1 v-if="!isCollapsed" class="text-left mt-2 mx-3 text-foreground font-thin">Dashboard</h1>
                <Nav :is-collapsed="isCollapsed" :links="links" />
                <Separator />
                <h1 v-if="!isCollapsed" class="text-left mt-2 mx-3 text-foreground font-thin">Management</h1>
                <Nav :is-collapsed="isCollapsed" :links="links1" />
                <Separator />
                <h1 v-if="!isCollapsed" class="text-left mt-2 mx-3 text-foreground font-thin">Settings</h1>
                <Nav :is-collapsed="isCollapsed" :links="connections" />
                <Separator />
                <h1 v-if="!isCollapsed" class="text-left mt-2 mx-3 text-foreground font-thin">Admin</h1>
                <Nav :is-collapsed="isCollapsed" :links="links2" />
            </ResizablePanel>
            <ResizableHandle id="resize-handle-1" with-handle />
            <ResizablePanel id="resize-panel-2" :default-size="defaultLayout[1]" :min-size="30">
                <MainDisplay/>

            </ResizablePanel>
        </ResizablePanelGroup>
    </TooltipProvider>
</template>
