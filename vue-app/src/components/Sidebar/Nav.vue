<script lang="ts" setup>
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { RouterLink } from 'vue-router'
import { useSideBarStore } from '@/store/index'

export interface LinkProp {
    title: string
    label?: string
    icon: string
    to: string
}

interface NavProps {
    isCollapsed: boolean
    links: LinkProp[]
}

defineProps<NavProps>()

const store = useSideBarStore()
</script>

<template>
    <div
        :data-collapsed="store.isCollapsible"
        class="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
        <nav
            class="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2"
        >
            <template v-for="(link, index) of links" :key="index">
                <Tooltip v-if="store.isCollapsible" :key="`1-${index}`" :delay-duration="0">
                    <TooltipTrigger as-child>
                        <router-link :to="link.to" v-slot="{ isActive }">
                            <a
                                :class="
                                    cn(
                                        buttonVariants({
                                            variant: isActive ? 'default' : 'ghost',
                                            size: 'icon'
                                        }),
                                        'h-9 w-9 flex items-center justify-center',
                                        true
                                            ? 'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white'
                                            : ''
                                    )
                                "
                            >
                                <VIcon :name="link.icon" />
                                <span class="sr-only">{{ link.title }}</span>
                            </a>
                        </router-link>
                    </TooltipTrigger>
                    <TooltipContent side="right" class="flex items-center gap-4">
                        {{ link.title }}
                        <span v-if="link.label" class="ml-auto text-muted-foreground">
                            {{ link.label }}
                        </span>
                    </TooltipContent>
                </Tooltip>

                <router-link v-else :to="link.to" v-slot="{ isActive }">
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
