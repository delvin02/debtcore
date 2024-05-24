import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'

import { labels, statuses } from './data/data'
import type { Task } from './data/schema'
import DataTableColumnHeader from './DataTableColumnHeader.vue'
import DataTableRowActions from './DataTableRowActions.vue'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { OhVueIcon as VIcon } from 'oh-vue-icons'

export const columns: ColumnDef<Task>[] = [
	{
		id: 'select',
		header: ({ table }) =>
			h(Checkbox, {
				checked:
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate'),
				'onUpdate:checked': (value) => table.toggleAllPageRowsSelected(!!value),
				ariaLabel: 'Select all',
				class: 'translate-y-0.5'
			}),
		cell: ({ row }) =>
			h(Checkbox, {
				checked: row.getIsSelected(),
				'onUpdate:checked': (value) => row.toggleSelected(!!value),
				ariaLabel: 'Select row',
				class: 'translate-y-0.5'
			}),
		enableSorting: false,
		enableHiding: false,
		meta: {
			title: 'Select'
		}
	},

	{
		accessorKey: 'name',
		header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Name' }),
		cell: ({ row }) => h('div', { class: 'w-fit font-bold' }, row.getValue('name')),
		enableSorting: true,
		enableHiding: true,
		enableColumnFilter: true,
		filterFn: (row, id, value) => {
			const rowValueLower = row.getValue(id)?.toString().toLowerCase() ?? ''
			const filterValueLower = value?.toString().toLowerCase()
			return rowValueLower.includes(filterValueLower)
		},
		meta: {
			title: 'Name'
		}
	},
	{
		id: 'actions',
		cell: ({ row }) => h(DataTableRowActions, { row })
	}
]
