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
		accessorKey: 'invoice',
		header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Invoice' }),
		cell: ({ row }) =>
		{
			const status = statuses.find(
				(status) => status.value === row.original.status.toString()
			)

			if (!status) return null

			return h(
				'div',
				{
					class: `w-20 font-bold ${status.label == "Canceled" ? 'line-through decoration-red-600' : ''}`
				},
				row.getValue('invoice')
			)
		},
		enableSorting: true,
		enableHiding: true,
		filterFn: (row, id, value) => {
			const rowValueLower = row.getValue(id)?.toString().toLowerCase() ?? ''
			const filterValueLower = value?.toString().toLowerCase()
			return rowValueLower.includes(filterValueLower)
		},
		meta: {
			title: 'Invoice'
		}
	},
	{
		accessorKey: 'invoice_date',
		header: ({ column }) =>
			h(DataTableColumnHeader, { column, title: column.columnDef.meta!.title }),
		cell: ({ row }) => {
			const date = row.getValue('invoice_date') as string
			let formattedDate = ''

			if (date) {
				const parsedDate = new Date(Date.parse(date))
				if (!isNaN(parsedDate.getTime())) {
					formattedDate = parsedDate.toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'short',
						day: 'numeric'
					})
				} else {
					formattedDate = 'Not Provided'
				}
			} else {
				formattedDate = 'Not provided' // Handle empty or null dueDate values
			}

			return h(
				'div',
				{
					class: `w-fit ${formattedDate != 'Not Provided' ? '' : 'text-red-600 font-bold'}`
				},
				formattedDate
			)
		},
		enableSorting: true,
		enableHiding: true,
		meta: {
			title: 'Invoice Date'
		}
	},
	{
		accessorKey: 'due_date',
		header: ({ column }) =>
			h(DataTableColumnHeader, { column, title: column.columnDef.meta!.title }),
		cell: ({ row }) => {
			const dateString = row.getValue('due_date') as string
			let formattedDate = ''
			if (dateString) {
				const parsedDate = new Date(dateString)
				if (!isNaN(parsedDate.getTime())) {
					formattedDate = parsedDate.toLocaleString('en-US', {
						year: 'numeric',
						month: 'short',
						day: 'numeric'
					})
				} else {
					formattedDate = 'Not Provided'
				}
			} else {
				formattedDate = 'Not provided'
			}
			return h(
				'div',
				{
					class: `w-fit ${formattedDate !== 'Not Provided' ? '' : 'text-red-600 font-bold'}`
				},
				formattedDate
			)
		},
		enableSorting: true,
		enableHiding: true,
		meta: {
			title: 'Due Date'
		}
	},
	{
		accessorKey: 'overdue',
		header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Overdue' }),
		cell: ({ row }: { row: any }) => {
			const overdue: number = row.getValue('overdue')
			let displayText: string

			if (overdue == 1) {
				displayText = '1 day'
			} else if (overdue > 0) {
				displayText = `${overdue} day(s)`
			} else if (overdue === 0) {
				displayText = '0 day'
			} else {
				displayText = 'No overdue'
			}

			return h('div', { class: 'w-fit text-red-600 font-bold' }, displayText)
		},
		enableHiding: true,
		meta: {
			title: 'Overdue'
		}
	},
	{
		accessorKey: 'amount',
		header: ({ column }) =>
			h(DataTableColumnHeader, { column, title: column.columnDef.meta!.title }),
		cell: ({ row }) => h(Badge, { variant: 'destructive' }, 'RM ' + row.getValue('amount')),
		enableSorting: true,
		enableHiding: true,
		meta: {
			title: 'Amount'
		}
	},
	{
		accessorKey: 'document_url',
		header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Attachment' }),
		cell: ({ row }) => {
			const status =
				row.getValue('document_url') != null
					? {
							icon: 'bi-check',
							iconClass: 'bg-green-600'
						}
					: {
							icon: 'bi-x',
							iconClass: 'bg-red-600'
						}

			return h(VIcon, {
				name: status.icon,
				class: `${status.iconClass} mr-1 h-8 w-8 rounded-full fill-white` // Use the dynamic class for icon color
			})
		},
		enableSorting: true,
		enableHiding: true,
		meta: {
			title: 'Attachment'
		}
	},
	{
		accessorKey: 'status',
		header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Status' }),
		cell: ({ row }) => {
			const status = statuses.find(
				(status) => status.value === row.original.status.toString()
			)

			if (!status) return null

			return h(
				Badge,
				{ variant: 'secondary', class: 'inline items-center whitespace-nowrap' },
				[
					status.icon &&
						h(VIcon, {
							name: status.icon,
							class: 'mr-1 h-4 w-4 text-muted-foreground'
						}),
					h('span', {}, status.label)
				]
			)
		},
		enableSorting: true,
		enableHiding: true,
		filterFn: (row, id, values) => {
			const rowValue = row.getValue(id)
			if (!rowValue) return false

			const rowValueLower = rowValue.toString().toLowerCase()
			const filterValues = values as string[]

			return filterValues.some((value) => rowValueLower.includes(value.toLowerCase()))
		},
		meta: {
			title: 'Status'
		}
	},
	{
		id: 'actions',
		cell: ({ row }) => h(DataTableRowActions, { row })
	}
]
