<script setup lang="ts">
import { computed, onMounted, nextTick, ref, watch } from 'vue'
import Sidebar from './components/Sidebar/Sidebar.vue'
import Header from './components/Header/Header.vue'
import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useRoute } from 'vue-router'
import { ScrollArea } from '@/components/ui/scroll-area'

const route = useRoute()
const hideSidebar = computed(() => route.meta.hideNavigation)

const isFixedLayout = ref(false)

const wrapperRef = ref(null)
const mainHeaderRef = ref<HTMLElement | null>(null)
const contentWrapperRef = ref(null)
const sidebarRef = ref(null) // Ensure this is defined if you're using it

const wrapperHeight = ref('0px')

// Function to adjust layout
const fixLayout = () => {
    nextTick(() => {
        console.log('Header offsetHeight:', mainHeaderRef.value?.offsetHeight)

        // if (!wrapperRef.value || !contentWrapperRef.value) return
        // const footerHeight = mainFooterRef.value?.offsetHeight || 0
        console.log(mainHeaderRef.value?.offsetHeight)
        const headerHeight = mainHeaderRef.value?.offsetHeight || 0
        const windowHeight = window.innerHeight
        const sidebarHeight = sidebarRef.value?.offsetHeight || 0

        // let neg = headerHeight + footerHeight
        let neg = headerHeight

        if (isFixedLayout.value) {
            wrapperHeight.value = `${windowHeight - neg}px`
        } else {
            wrapperHeight.value =
                windowHeight >= sidebarHeight ? `${windowHeight - neg}px` : `${sidebarHeight}px`
        }
    })
}

onMounted(() => {
    fixLayout()
    console.log(mainHeaderRef.value?.offsetHeight)
})

window.addEventListener('resize', fixLayout)

watch(isFixedLayout, fixLayout)
</script>

<template>
    <div ref="wrapperRef" class="wrapper">
        <TooltipProvider :delay-duration="0" v-if="!hideSidebar">
            <ResizablePanelGroup
                id="resize-panel-group-1"
                direction="horizontal"
                class="h-fit items-stretch"
            >
                <Sidebar ref="sidebarRef" />
                <ResizablePanel id="resize-panel-2" :min-size="30">
                    <Header ref="mainHeaderRef" />
                    <ScrollArea :style="{ height: wrapperHeight }">
                        <router-view />
                    </ScrollArea>
                </ResizablePanel>
            </ResizablePanelGroup>
        </TooltipProvider>
        <router-view v-else />
    </div>
</template>

<style scoped></style>
