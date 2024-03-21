<script setup lang="ts">
import { computed } from 'vue'
import Sidebar from './components/Sidebar/Sidebar.vue'
import Header from './components/Header/Header.vue'
import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useRoute } from 'vue-router'

const route = useRoute()
const hideSidebar = computed(() => route.meta.hideNavigation)
</script>

<template>
    <div class="h-screen">
        <TooltipProvider :delay-duration="0" v-if="!hideSidebar">
            <ResizablePanelGroup
                id="resize-panel-group-1"
                direction="horizontal"
                class="h-full max-h-[800px] items-stretch"
            >
                <Sidebar />
                <ResizablePanel id="resize-panel-2" :min-size="30">
                    <div class="flex h-full flex-col">
                        <Header />
                        <router-view />
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </TooltipProvider>
        <router-view v-else />
    </div>
</template>

<style scoped></style>
