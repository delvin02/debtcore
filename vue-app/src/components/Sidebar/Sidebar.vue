<script lang="ts" setup>
import { onMounted } from 'vue'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import Nav, { type LinkProp } from './Nav.vue'
import { useSideBarStore } from '@/store/index'
import { useAuthStore } from '@/store/user'

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

const store = useSideBarStore()
const user = useAuthStore()

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
		title: 'Message',
		icon: 'fa-whatsapp',
		to: '/message'
	},
	{
		title: 'Template',
		icon: 'bi-file-earmark-font',
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
		to: '/usage-report'
	}
]
</script>

<template>
	<!-- :collapsed-size="navCollapsedSize"-->
	<ResizablePanel
		id="resize-panel-1"
		:default-size="defaultLayout[0]"
		collapsible
		:min-size="10"
		:max-size="15"
		:class="
			cn(
				store.isCollapsible &&
					'position-fixed min-w-[50px] min-h-full max-w-[80px] transition-all duration-300 ease-in-out'
			)
		"
		@expand="store.onExpand()"
		@collapse="store.onCollapse()"
		default="{20}"
		:disabled="true"
	>
		<div
			:class="
				cn('flex items-center justify-center', store.isCollapsible ? 'h-[52px]' : 'px-2')
			"
		>
			<h1 class="text-2xl font-bold">test</h1>

			<!-- <AccountSwitcher :is-collapsed="isCollapsed" :accounts="accounts" /> -->
		</div>
		<Separator />
		<h1 v-if="!store.isCollapsible" class="text-left mt-2 mx-3 text-foreground font-thin">
			Dashboard
		</h1>
		<Nav :is-collapsed="store.isCollapsible" :links="links" />
		<Separator />
		<h1 v-if="!store.isCollapsible" class="text-left mt-2 mx-3 text-foreground font-thin">
			Management
		</h1>
		<Nav :is-collapsed="store.isCollapsible" :links="links1" />
		<Separator />
		<h1 v-if="!store.isCollapsible" class="text-left mt-2 mx-3 text-foreground font-thin">
			Settings
		</h1>
		<Nav :is-collapsed="store.isCollapsible" :links="connections" />
		<div v-show="user.is_admin">
			<Separator />
			<h1 v-if="!store.isCollapsible" class="text-left mt-2 mx-3 text-foreground font-thin">
				Admin
			</h1>
			<Nav :is-collapsed="store.isCollapsible" :links="links2" />
		</div>
	</ResizablePanel>
	<ResizableHandle id="resize-handle-1" with-handle />
</template>
