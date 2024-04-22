import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'

import { languages, statuses, types } from './data/data'
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
    accessorKey: 'language',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Language"}),
    cell: ({ row }) => {

      const languageValue: string = row.getValue('language');

      const language = languages.find( 
        x => x.value === languageValue.toLowerCase(),
      )

      if (!language)
        return null

        return h('div', { class: "flex items-center"}, [
          h('span', {}, language.label),
        ])
    },
  },
  {
    accessorKey: 'category',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Category"}),
    cell: ({ row }) => {

      const typeValue: string = row.getValue('category');

      const type = types.find( 
        type => type.value === typeValue.toLowerCase(),
      )

      if (!type)
        return null

        return h('div', { class: "flex items-center"}, [
          h('span', {}, type.label),
        ])
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Status' }),

    cell: ({ row }) => {
      const statusValue: string = row.getValue('status') as string;

      const status = statuses.find(
        status => status.value === statusValue?.toLowerCase()
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
      const rowValue = row.getValue(id);
      if (typeof rowValue === 'string') {
        return value.includes(rowValue.toLowerCase());
      } else {
        return value.includes(String(rowValue).toLowerCase());
      }
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
    accessorKey: 'last_updated_date',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Last Updated"}),
    cell: ({ row }) => {
      const date = row.getValue('last_updated_date');
      if (!date || typeof date !== 'string' && typeof date !== 'number') {
        return h('div', { class: 'w-fit' }, '');
      }      
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric', month: 'long', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
      };
      const formattedDate = new Intl.DateTimeFormat('en-US', options).format(new Date(date)); 
      return h('div', { class: 'w-fit' }, formattedDate); 
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