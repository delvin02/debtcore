import { defineStore } from 'pinia'
import axios from "axios"

export const useSideBarStore = defineStore('sidebar', {
    state: () => (
        { 
            collapse: false
        }
    ),
    getters: {
        isCollapsed: (state) => state.collapse
    },
    actions: {
        onCollapse(): void {
            this.collapse = true
        },
        onExpand(): void {
            this.collapse = false
        },
        toggleCollapsible(): void {
            this.collapse = !this.collapse;
        },
        setCollapsible(payload: boolean) {
            this.collapse = payload
        }
    }
})
