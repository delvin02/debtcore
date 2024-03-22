import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'

import { labels, priorities, statuses, types } from './data/data'
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
  },
  {
    accessorKey: 'name',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Name"}),
    cell: ({ row }) => h('div', { class: 'w-fit' }, row.getValue('name')),
    enableSorting: false,
    enableHiding: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Type"}),
    cell: ({ row }) => {
      const type = types.find( 
        type => type.value === row.getValue('type'),
      )

      if (!type)
        return null

        return h('div', { class: "flex items-center"}, [
          h('span', {}, type.label),
        ])
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Status' }),

    cell: ({ row }) => {
      const status = statuses.find(
        status => status.value === row.getValue('status'),
      )

      if (!status)
        return null

        return h(Badge, { variant:"outline", class: 'flex w-fit items-center' }, [
          status.icon && h(VIcon, {  
            name: status.icon, 
            class: 'mr-1 h-4 w-4 text-muted-foreground',
            ...(status.animation ? { animation: status.animation, speed: 'slow' } : {}) 
          }),
          h('span', {}, status.label),
        ])
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'message_delivered',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Message Delivered"}),
    cell: ({ row }) => h('div', row.getValue('message_delivered')),
    enableSorting: false,
    enableHiding: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'message_read',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Message Read"}),
    cell: ({ row }) => h('div', row.getValue('message_read')),
    enableSorting: false,
    enableHiding: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'last_updated',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Last Updated"}),
    cell: ({ row }) => h('div', { class: 'w-20' }, row.getValue('last_updated')),
    enableSorting: false,
    enableHiding: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => h(DataTableRowActions, { row }),
  },
]