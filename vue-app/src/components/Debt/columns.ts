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
    header: ({ table }) => h(Checkbox, {
      'checked': table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
      'onUpdate:checked': value => table.toggleAllPageRowsSelected(!!value),
      'ariaLabel': 'Select all',
      'class': 'translate-y-0.5',
    }),
    cell: ({ row }) => h(Checkbox, { 'checked': row.getIsSelected(), 'onUpdate:checked': value => row.toggleSelected(!!value), 'ariaLabel': 'Select row', 'class': 'translate-y-0.5' }),
    enableSorting: false,
    enableHiding: false,
    meta: {
      title: "Select"
    },
  },
  {
    accessorKey: 'invoice',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Invoice"}),
    cell: ({ row }) => h('div', { class: 'w-20 underline' }, row.getValue('invoice')),
    enableSorting: true,
    enableHiding: true,
    filterFn: (row, id, value) => {
      const rowValueLower = row.getValue(id)?.toString().toLowerCase() ?? '';
      const filterValueLower = value?.toString().toLowerCase();
      return rowValueLower.includes(filterValueLower);    
    },
    meta: {
      title: "Invoice"
    },
  },
  {
    accessorKey: "companyName",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Company"}),
    cell: ({ row }) => h('div', { class: 'w-20' }, row.getValue('companyName')),
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
    filterFn: (row, id, value) => {
      const rowValueLower = row.getValue(id)?.toString().toLowerCase() ?? '';
      const filterValueLower = value?.toString().toLowerCase();
      return rowValueLower.includes(filterValueLower);    
    },
    meta: {
      title: "Company"
    },
  },
  {
    accessorKey: "due_date",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: column.columnDef.meta!.title}),
    cell: ({ row }) => h('div', { class: 'w-20' }, row.getValue('due_date')),
    enableSorting: true,
    enableHiding: true,
    meta: {
      title: "Due Date"
    },
  },
    {
    accessorKey: "amount",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: column.columnDef.meta!.title}),
    cell: ({ row }) => h(Badge, {variant:"destructive"}, "RM " + row.getValue('amount')),
    enableSorting: true,
    enableHiding: true,
    meta: {
      title: "Amount"
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Status"}),
    cell: ({ row }) => {
      const status = statuses.find(status => status.value === row.original.status)
      
      if (!status)
        return null

        return h(Badge, { variant:"secondary", class: 'flex w-fit items-center' }, [
          status.icon && h(VIcon, {  
            name: status.icon, 
            class: 'mr-1 h-4 w-4 text-muted-foreground',
          }),
          h('span', {}, status.label),
        ])
      
    },
    enableSorting: true,
    enableHiding: true,
    filterFn: (row, id, value) => {
      const rowValueLower = row.getValue(id)?.toString().toLowerCase() || '';
      const filterValueLower = value?.toString().toLowerCase();
      return rowValueLower.includes(filterValueLower);    
    },
    meta: {
      title: "Status"
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => h(DataTableRowActions, { row }),
  },
]