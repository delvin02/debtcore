<script lang="ts" setup>
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { RouterLink } from 'vue-router'
import { useSideBarStore } from '@/store/sidebar'
import { onMounted } from 'vue'

export interface LinkProp {
	title: string
	label?: string
	icon: string
	to: string
}

interface NavProps {
	links: LinkProp[]
}

defineProps<NavProps>()

const sideBar = useSideBarStore()
</script>

<template>
	<div class="group flex flex-col gap-4 py-2">
		<nav class="grid gap-1 px-2">
			<template v-for="(link, index) of links" :key="index">
				<router-link :to="link.to" v-slot="{ isActive }">
					<a
						:class="
							cn(
								buttonVariants({
									variant: isActive ? 'default' : 'ghost',
									size: 'sm'
								}),
								'justify-start flex items-center',
								isActive
									? 'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white'
									: ''
							)
						"
						@click="sideBar.toggleCollapsible"
					>
						<VIcon :name="link.icon" class="mr-2" />
						{{ link.title }}
						<span
							v-if="link.label"
							:class="
								cn('ml-auto', isActive ? 'text-background dark:text-white' : '')
							"
						>
							{{ link.label }}
						</span>
					</a>
				</router-link>
			</template>
		</nav>
	</div>
</template>
