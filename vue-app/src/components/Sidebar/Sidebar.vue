<script lang="ts" setup>
import { defineProps, withDefaults, ref } from 'vue'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import Nav, { type LinkProp } from './Nav.vue'

interface MailProps {
    accounts: {
        label: string
        email: string
        icon: string
    }
    defaultCollapsed?: boolean
    navCollapsedSize: number
}

const defaultLayout = [15, 85]

const isCollapsed = ref(false)

const links: LinkProp[] = [
    {
        title: 'Dashboard',
        label: '128',
        icon: 'fa-home',
        to: '/dashboard'
    }
]

const links1: LinkProp[] = [
    {
        title: 'Debt',
        icon: 'bi-cash-coin',
        to: '/debt'
    },
    {
        title: 'Template',
        icon: 'fa-whatsapp',
        to: '/template'
    },
    {
        title: 'Customer',
        icon: 'fa-address-book',
        to: '/customer'
    }
]
const connections: LinkProp[] = [
    {
        title: 'Connections',
        icon: 'fa-plug',
        to: '/connections'
    }
]
const links2: LinkProp[] = [
    {
        title: 'User',
        icon: 'fa-user-alt',
        to: '/user'
    },
    {
        title: 'Company',
        icon: 'fa-building',
        to: '/company'
    },
    {
        title: 'Usage Report',
        icon: 'bi-graph-up-arrow',
        to: '/usage'
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
    <!-- :collapsed-size="navCollapsedSize"-->
    <ResizablePanel
        id="resize-panel-1"
        :default-size="defaultLayout[0]"
        collapsible
        :min-size="10"
        :class="
            cn(
                isCollapsed &&
                    'position-fixed min-w-[50px] max-w-[80px] transition-all duration-300 ease-in-out'
            )
        "
        @expand="onExpand"
        @collapse="onCollapse"
        default="{20}"
        :disabled="true"
    >
        <div
            :class="
                cn('flex h-[52px] items-center justify-center', isCollapsed ? 'h-[52px]' : 'px-2')
            "
        >
            <h1 class="text-2xl font-bold">DebtCore</h1>

            <!-- <AccountSwitcher :is-collapsed="isCollapsed" :accounts="accounts" /> -->
        </div>
        <Separator />
        <h1 v-if="!isCollapsed" class="text-left mt-2 mx-3 text-foreground font-thin">Dashboard</h1>
        <Nav :is-collapsed="isCollapsed" :links="links" />
        <Separator />
        <h1 v-if="!isCollapsed" class="text-left mt-2 mx-3 text-foreground font-thin">
            Management
        </h1>
        <Nav :is-collapsed="isCollapsed" :links="links1" />
        <Separator />
        <h1 v-if="!isCollapsed" class="text-left mt-2 mx-3 text-foreground font-thin">Settings</h1>
        <Nav :is-collapsed="isCollapsed" :links="connections" />
        <Separator />
        <h1 v-if="!isCollapsed" class="text-left mt-2 mx-3 text-foreground font-thin">Admin</h1>
        <Nav :is-collapsed="isCollapsed" :links="links2" />
    </ResizablePanel>
    <ResizableHandle id="resize-handle-1" with-handle />
</template>
