<script setup lang="ts">
import { computed, onMounted, nextTick, ref, provide, onUnmounted, onBeforeMount } from 'vue'
import Sidebar from './components/Sidebar/Sidebar.vue'
import Header from './components/Header/Header.vue'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useRouter, useRoute } from 'vue-router'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { ComponentMethods } from '@/components/Header/Header.vue'
import { useAuthStore } from '@/store/user'
import Toaster from '@/components/ui/toast/Toaster.vue'
import axios from 'axios'
const route = useRoute()

const auth = useAuthStore()
const hideSidebar = computed(() => route.meta.hideNavigation)

const mainHeaderRef = ref<ComponentMethods | null>(null)
const wrapperHeight = ref<number>(0)
const wrapperWidth = ref<number>(0)

// Function to adjust layout
const fixLayout = () => {
	nextTick(() => {
		const headerHeight: number = mainHeaderRef.value?.getHeaderHeight() ?? 0
		const windowHeight = window.innerHeight
		const windowWidth = window.innerWidth

		wrapperHeight.value = windowHeight - headerHeight
		wrapperWidth.value = windowWidth
	})
}

onMounted(() => {
	fixLayout()
	window.addEventListener('resize', fixLayout)
})

onUnmounted(() => {
	window.removeEventListener('resize', fixLayout)
})

provide('height', wrapperHeight)

onBeforeMount(async () => {
	await auth.init()

	const token = auth.access_token
	if (token) {
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
	} else {
		axios.defaults.headers.common['Authorization'] = ''
	}
})
</script>

<template>
	<div class="max-w-full">
		<div v-if="auth.is_loading" class="h-screen flex justify-center items-center">
			<VIcon
				name="fa-circle-notch"
				animation="spin"
				speed="slow"
				class="mr-2 size-14 md:size-40"
			/>
		</div>
		<div v-else class="wrapper">
			<TooltipProvider v-if="!hideSidebar">
				<div class="flex h-fit w-full items-stretch">
					<Sidebar ref="sidebarRef" />

					<div class="flex-1 max-w-full">
						<Header ref="mainHeaderRef" />
						<ScrollArea
							v-if="route.name !== 'conversation'"
							:style="{ height: wrapperHeight + 'px' }"
							class="justify-center my-auto"
						>
							<router-view />
						</ScrollArea>
						<router-view v-else :style="{ height: wrapperHeight + 'px' }" />
					</div>
				</div>
			</TooltipProvider>
			<router-view v-else />
			<Toaster />
		</div>
	</div>
</template>

<style scoped></style>
