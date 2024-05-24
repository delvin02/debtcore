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

const defaultLayout = [15, 85]

const store = useSideBarStore()
const user = useAuthStore()

console.log(store.screenMdOrLarger)
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
const adminLink: LinkProp[] = [
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
		:class="
			cn(
				store.isCollapsed &&
					'md:flex justify-items-center justify-center items-center md:position-fixed md:min-w-[50px] md:min-h-full md:max-w-[80px] flex',
				'hidden md:block transition-all duration-300 ease-in-out'
			)
		"
		@expand="store.onExpand"
		@collapse="store.onCollapse"
		default="{20}"
		:disabled="true"
	>
		<div
			:class="cn('flex items-center justify-center', store.isCollapsed ? 'h-[52px]' : 'px-2')"
		>
			<h1 class="text-2xl font-bold">DebtCore</h1>
		</div>
		<Separator />
		<h1 v-if="!store.isCollapsed" class="text-left mt-2 mx-3 text-foreground font-thin">
			Dashboard
		</h1>
		<Nav
			:is-collapsed="store.isCollapsed"
			:links="links"
			:class="cn(store.isCollapsed && 'items-center')"
		/>
		<Separator />
		<h1 v-if="!store.isCollapsed" class="text-left mt-2 mx-3 text-foreground font-thin">
			Management
		</h1>
		<Nav
			:is-collapsed="store.isCollapsed"
			:links="links1"
			:class="cn(store.isCollapsed && 'items-center')"
		/>
		<Separator />
		<h1 v-if="!store.isCollapsed" class="text-left mt-2 mx-3 text-foreground font-thin">
			Settings
		</h1>
		<Nav
			:is-collapsed="store.isCollapsed"
			:links="connections"
			:class="cn(store.isCollapsed && 'items-center')"
		/>
		<div v-show="user.is_admin">
			<Separator />
			<h1 v-if="!store.isCollapsed" class="text-left mt-2 mx-3 text-foreground font-thin">
				Admin
			</h1>
			<Nav
				:is-collapsed="store.isCollapsed"
				:links="adminLink"
				:class="cn(store.isCollapsed && 'items-center')"
			/>
		</div>
	</ResizablePanel>
	<Sheet
		v-if="!store.screenMdOrLarger"
		:open="store.isCollapsed"
		@update:open="store.setCollapsible($event)"
	>
		<SheetContent class="w-full" side="left">
			<SheetHeader>
				<SheetTitle>Navigation</SheetTitle>
				<SheetDescription>
					<h1 class="text-left mt-2 mx-3 text-foreground font-thin">Dashboard</h1>
					<NavMobile :links="links" />
					<Separator />
					<h1 class="text-left mt-2 mx-3 text-foreground font-thin">Management</h1>
					<NavMobile :links="links1" />
					<Separator />
					<h1 class="text-left mt-2 mx-3 text-foreground font-thin">Settings</h1>
					<NavMobile :links="connections" />
					<div v-show="user.is_admin">
						<Separator />
						<h1 class="text-left mt-2 mx-3 text-foreground font-thin">Admin</h1>
						<NavMobile :links="adminLink" />
					</div>
				</SheetDescription>
			</SheetHeader>
		</SheetContent>
	</Sheet>
	<ResizableHandle id="resize-handle-1" />
</template>
