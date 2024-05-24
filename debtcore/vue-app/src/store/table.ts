// store/table.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useTableStore = (key: string) => {
	return defineStore(key, {
		state: () => ({
			tasks: [],
			is_loading: false,
			page_index: 0,
			page_size: 10,
			fetch_url: '',
			map_function: undefined as ((dataItem: any) => any) | undefined,
			filters: {}
		}),
		actions: {
			async fetch(
				url: string,
				pageIndex?: number,
				mapFunction?: (dataItem: any) => any,
				filters?: Record<string, any>
			) {
				this.tasks = []
				this.is_loading = true
				this.fetch_url = url
				this.map_function = mapFunction
				try {
					const response = await axios.get(url, {
						params: filters,
						withCredentials: true,
						headers: {
							'Cache-Control': 'no-cache',
							Pragma: 'no-cache',
							Expires: '0'
						}
					})
					const isMapFunctionValid = typeof mapFunction === 'function'

					this.tasks = response.data.Result.map((task: any) =>
						isMapFunctionValid ? mapFunction(task) : task
					)
					this.set_page_index(pageIndex ?? 0)
				} catch (error) {
					console.error('There was an error fetching the companies:', error)
				} finally {
					this.is_loading = false
				}
			},
			async refresh(pageIndex?: number) {
				if (this.fetch_url) {
					await this.fetch(this.fetch_url, pageIndex, this.map_function, this.filters)
				}
			},
			set_page_index(index: number) {
				this.page_index = index
			},
			set_page_size(size: number) {
				this.page_size = size
			},
			set_filter(filters: Record<string, any>) {
				this.filters = filters
			},
			$reset() {
				this.tasks = []
				this.is_loading = false
				this.page_index = 0
				this.page_size = 10
				this.fetch_url = ''
			}
		}
	})()
}
