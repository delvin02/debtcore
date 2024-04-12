import { defineStore } from 'pinia'
import axios from "axios"

export const useSideBarStore = defineStore('sidebar', {
    state: () => ({ collapsible: false }),
    getters: {
        isCollapsible: (state) => state.collapsible,
    },
    actions: {
        onCollapse(): void {
            this.collapsible = true
        },
        onExpand(): void {
            this.collapsible = false
        },
        toggleCollapsible(): boolean {
            return this.collapsible = !this.collapsible;
        }
    }
})
