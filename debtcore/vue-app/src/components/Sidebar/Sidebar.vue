<script lang="ts" setup>
import { onMounted } from 'vue'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { TooltipProvider } from '@/components/ui/tooltip'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import Nav, { type LinkProp } from './Nav.vue'
import NavMobile from './NavMobile.vue'

import { useSideBarStore } from '@/store/sidebar'
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
		title: 'Customer',
		icon: 'fa-address-book',
		to: '/customer'
	},
	{
		title: 'Template',
		icon: 'bi-file-earmark-font',
		to: '/template'
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
		title: 'Session',
		icon: 'bi-arrow-left-right',
		to: '/session'
	}
]
</script>

<template>
	<ResizablePanel
		id="resize-panel-1"
		:default-size="defaultLayout[0]"
		collapsible
		:class="cn(
			store.isCollapsed 
			? 'md:hidden ' 
			: 'md:block md:max-w-[250px]', 
			'hidden transition-all duration-300 ease-in-out')"
		@expand="store.onExpand"
		@collapse="store.onCollapse"
		default="{20}"
		:disabled="true"
	>
		<div :class="cn('flex items-center justify-center', store.isCollapsed ? 'h-[52px]' : 'px-2')">
			<h1 class="text-2xl font-bold">DebtCore</h1>
		</div>
		<Separator />
		<h1 v-if="!store.isCollapsed" class="text-left mt-2 mx-3 text-foreground font-thin">
			Dashboard
		</h1>
		<Nav :is-collapsed="store.isCollapsed" :links="links" />
		<Separator />
		<h1 v-if="!store.isCollapsed" class="text-left mt-2 mx-3 text-foreground font-thin">
			Management
		</h1>
		<Nav :is-collapsed="store.isCollapsed" :links="links1" />
		<Separator />
		<h1 v-if="!store.isCollapsed" class="text-left mt-2 mx-3 text-foreground font-thin">
			Settings
		</h1>
		<Nav :is-collapsed="store.isCollapsed" :links="connections" />
		<div v-show="user.is_admin">
			<Separator />
			<h1 v-if="!store.isCollapsed" class="text-left mt-2 mx-3 text-foreground font-thin">
				Admin
			</h1>
			<Nav :is-collapsed="store.isCollapsed" :links="links2" />
		</div>
	</ResizablePanel>
	<Sheet class="md:hidden" :open="store.isCollapsed" @update:open="store.setCollapsible($event)">
		<SheetContent class="w-full" side="left" >
			<SheetHeader>
				<SheetTitle>Navigation</SheetTitle>
				<SheetDescription>
					<h1  class="text-left mt-2 mx-3 text-foreground font-thin">
						Dashboard
					</h1>
					<NavMobile :links="links" />
					<Separator />
					<h1  class="text-left mt-2 mx-3 text-foreground font-thin">
						Management
					</h1>
					<NavMobile :links="links1" />
					<Separator />
					<h1  class="text-left mt-2 mx-3 text-foreground font-thin">
						Settings
					</h1>
					<NavMobile :links="connections" />
					<div v-show="user.is_admin">
						<Separator />
						<h1  class="text-left mt-2 mx-3 text-foreground font-thin">
							Admin
						</h1>
						<NavMobile :links="links2" />
					</div>
				</SheetDescription>
			</SheetHeader>
		</SheetContent>
	</Sheet>
	<ResizableHandle id="resize-handle-1" />
</template>
