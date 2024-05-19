<script setup lang="ts">
import type {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	PaginationState
} from '@tanstack/vue-table'
import {
	FlexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useVueTable
} from '@tanstack/vue-table'

import { onMounted, ref, watchEffect, inject } from 'vue'
import type { Task } from './data/schema'
import DataTablePagination from './DataTablePagination.vue'
import DataTableToolbar from './DataTableToolbar.vue'
import { valueUpdater } from '@/lib/utils'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { useTableStore } from '@/store/table'

const tableStore = inject('tableStore', useTableStore('transaction'))

interface DataTableProps {
	columns: ColumnDef<Task, any>[]
	data: Task[]
}
const props = defineProps<DataTableProps>()

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const pagination = ref<PaginationState>({
	pageIndex: tableStore.page_index,
	pageSize: tableStore.page_size
})
const rowSelection = ref()

function paginationUpdater(
	updaterOrValue: PaginationState | ((old: PaginationState) => PaginationState),
	targetRef: any
) {
	let newValue: PaginationState

	if (typeof updaterOrValue === 'function') {
		// Call the function with the current ref value if updaterOrValue is a function
		newValue = updaterOrValue(targetRef.value)
	} else {
		// Directly use updaterOrValue if it's not a function
		newValue = updaterOrValue
	}
	// Update the ref with the new value
	targetRef.value = newValue

	tableStore.set_page_index(newValue.pageIndex)
	tableStore.set_page_size(newValue.pageSize)
}

const table = useVueTable({
	get data() {
		return props.data
	},
	get columns() {
		return props.columns
	},
	state: {
		get sorting() {
			return sorting.value
		},
		get columnFilters() {
			return columnFilters.value
		},
		get columnVisibility() {
			return columnVisibility.value
		},
		get rowSelection() {
			return rowSelection.value
		},
		get pagination() {
			return pagination.value
		}
	},
	enableRowSelection: true,
	onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
	onPaginationChange: (updaterOrValue) => paginationUpdater(updaterOrValue, pagination),
	onColumnFiltersChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnFilters),
	onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibility),
	onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelection),
	getCoreRowModel: getCoreRowModel(),
	getFilteredRowModel: getFilteredRowModel(),
	getPaginationRowModel: getPaginationRowModel(),
	getSortedRowModel: getSortedRowModel(),
	getFacetedRowModel: getFacetedRowModel(),
	getFacetedUniqueValues: getFacetedUniqueValues()
})

watchEffect(() => {
	table.setPageIndex(tableStore.page_index)
	table.setPageSize(tableStore.page_size)
})
</script>

<template>
	<div class="space-y-4 text-muted-foreground">
		<DataTableToolbar :table="table" />
		<div class="rounded-md border">
			<Table class="text-xs">
				<TableHeader>
					<TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
						<TableHead v-for="header in headerGroup.headers" :key="header.id">
							<FlexRender
								v-if="!header.isPlaceholder"
								:render="header.column.columnDef.header"
								:props="header.getContext()"
							/>
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody id="dbTableBody">
					<template v-if="table.getRowModel().rows?.length">
						<TableRow
							v-for="row in table.getRowModel().rows"
							:key="row.id"
							:data-state="row.getIsSelected() && 'selected'"
						>
							<TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
								<FlexRender
									:render="cell.column.columnDef.cell"
									:props="cell.getContext()"
								/>
							</TableCell>
						</TableRow>
					</template>

					<TableRow v-else>
						<TableCell :colspan="columns.length" class="h-24 text-center">
							No results.
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>

		<DataTablePagination :table="table" />
	</div>
</template>
