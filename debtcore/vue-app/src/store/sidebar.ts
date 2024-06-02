import { defineStore } from 'pinia'

export const useSideBarStore = defineStore('sidebar', {
	state: () => ({
		collapse: false,
		screenMdOrLarger: window.matchMedia('(min-width: 768px)').matches
	}),
	getters: {
		isCollapsed: (state) => state.collapse,
		isScreenMdOrLarger: (state) => state.screenMdOrLarger
	},
	actions: {
		onCollapse(): void {
			this.collapse = true
		},
		onExpand(): void {
			this.collapse = false
		},
		toggleCollapsible(): void {
			this.collapse = !this.collapse
		},
		setCollapsible(payload: boolean) {
			this.collapse = payload
		}
	}
})
