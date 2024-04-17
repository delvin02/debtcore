import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'

import { statuses, types } from './data/data'
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
      const rowValue = row.getValue(id)?.toString().toLowerCase() || ''
      const filter = value?.toString().toLowerCase();
      return rowValue.includes(filter)
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
      console.log(row.getValue('status'))

      const status = statuses.find(
        status => status.value === row.getValue('status')
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
    cell: ({ row }) => {
      const date = row.getValue('last_updated') as string;
      let formattedDate = '';

      if (date) {
          const parsedDate = new Date(Date.parse(date));
          if (!isNaN(parsedDate.getTime())) {
              formattedDate = parsedDate.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short', 
                  day: 'numeric' 
              });
          } else {
              formattedDate = 'Not Provided'; 
          }
      } else {
          formattedDate = 'Not provided'; // Handle empty or null dueDate values
      }

      return h('div', { class: `w-fit ${formattedDate != 'Not Provided' ? '' : 'text-red-600 font-bold'}` }, formattedDate);
    },
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