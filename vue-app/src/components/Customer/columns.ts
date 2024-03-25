import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'

import { labels, statuses } from './data/data'
import type { Task } from './data/schema'
import DataTableColumnHeader from './DataTableColumnHeader.vue'
import DataTableRowActions from './DataTableRowActions.vue'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'

export const columns: ColumnDef<Task>[] = [
  {
    id: 'select',
    header: ({ table }) => h(Checkbox, {
      'checked': table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
      'onUpdate:checked': value => table.toggleAllPageRowsSelected(!!value),
      'ariaLabel': 'Select all',
      'class': 'translate-y-0.5',
    }),
    cell: ({ row }) => h(Checkbox, { 'checked': row.getIsSelected(), 'onUpdate:checked': value => row.toggleSelected(!!value), 'ariaLabel': 'Select row', 'class': 'translate-y-0.5' }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Name"}),
    cell: ({ row }) => h('div', { class: 'w-20 underline' }, row.getValue('name')),
    enableSorting: false,
    enableHiding: false,
    filterFn: (row, id, value) => {
      const rowValueLower = row.getValue(id)?.toString().toLowerCase();
      const filterValueLower = value?.toString().toLowerCase();
      return rowValueLower.includes(filterValueLower);    
    },
  },
  {
    accessorKey: "companyName",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Company"}),
    cell: ({ row }) => h('div', { class: 'w-20' }, row.getValue('companyName')),
    enableSorting: false,
    enableHiding: false,
    filterFn: (row, id, value) => {
      const rowValueLower = row.getValue(id)?.toString().toLowerCase();
      const filterValueLower = value?.toString().toLowerCase();
      return rowValueLower.includes(filterValueLower);    
    },
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Phone"}),
    cell: ({ row }) => h('div', { class: 'w-20' }, row.getValue('phoneNumber')),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'outstanding',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Outstanding Debts' }),
    cell: ({ row }) => h(Badge, { variant: 'destructive' }, row.getValue('outstanding') + " MYR"),
    enableSorting: true,
    enableHiding: true,

  },
  {
    id: 'actions',
    cell: ({ row }) => h(DataTableRowActions, { row }),
  },
]