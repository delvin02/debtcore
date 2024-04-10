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
    cell: ({ row }) => h('div', { class: 'w-fit underline' }, row.getValue('name')),
    enableSorting: false,
    enableHiding: false,
    filterFn: (row, id, value) => {
      const rowValueLower = row.getValue(id)?.toString().toLowerCase() ?? '';
      const filterValueLower = value?.toString().toLowerCase();
      return rowValueLower.includes(filterValueLower);    
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Email"}),
    cell: ({ row }) => h('div', { class: 'w-20' }, row.getValue('email')),
    enableSorting: false,
    enableHiding: false,
    meta: {
      title: "Email"
    },
  },
  {
    accessorKey: "whatsapp_phone_number",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Whatsapp Phone"}),
    cell: ({ row }) => h('div', { class: 'w-fit' }, row.getValue('whatsapp_phone_number')),
    enableSorting: false,
    enableHiding: false,
    meta: {
      title: "Whatsapp Phone"
    },
  },
  {
    accessorKey: "country_name",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Country"}),
    cell: ({ row }) => h('div', { class: 'w-fit' }, row.getValue('country_name')),
    enableSorting: false,
    enableHiding: false,
    meta: {
      title: "Company Name"
    },
  },
  {
    accessorKey: 'outstanding_debts',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Outstanding Debts' }),
    cell: ({ row }) => h(Badge, { variant: 'destructive' }, row.getValue('outstanding_debts') + " MYR"),
    enableSorting: true,
    enableHiding: true,
    meta: {
      title: "Outstanding Debt"
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => h(DataTableRowActions, { row }),
  },
]