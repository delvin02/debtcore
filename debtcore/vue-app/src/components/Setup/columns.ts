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
    accessorKey: 'verified_name',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Name"}),
    cell: ({ row }) => h('div', { class: 'w-20 underline' }, row.getValue('verified_name')),
    enableSorting: true,
    enableHiding: true,
    filterFn: (row, id, value) => {
      const rowValueLower = row.getValue(id)?.toString().toLowerCase() ?? '';
      const filterValueLower = value?.toString().toLowerCase();
      return rowValueLower.includes(filterValueLower);    
    },
    meta: {
      title: "Name"
    },
  },
  {
    accessorKey: "quality_rating",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Quality Rating"}),
    cell: ({ row }) => h('div', { class: 'w-fit' }, row.getValue('quality_rating')),
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
    filterFn: (row, id, value) => {
      const rowValueLower = row.getValue(id)?.toString().toLowerCase() ?? '';
      const filterValueLower = value?.toString().toLowerCase();
      return rowValueLower.includes(filterValueLower);    
    },
    meta: {
      title: "Quality Rating"
    },
  },
  {
    accessorKey: "last_onboarded_time",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: column.columnDef.meta!.title}),
    cell: ({ row }) => {
      const date = row.getValue('last_onboarded_time');
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
    enableSorting: true,
    enableHiding: true,
    meta: {
      title: "Last Onboarded Time"
    },
  },
  {
    accessorKey: "display_phone_number",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: column.columnDef.meta!.title}),
    cell: ({ row }) => h('div', { class: 'w-fit' }, row.getValue('display_phone_number')),
    enableSorting: true,
    enableHiding: true,
    meta: {
      title: "Display Phone Number"
    },
  },
  {
    accessorKey: "is_default_phone",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: column.columnDef.meta!.title}),
    cell: ({ row }) => {
      const isDefaultPhone = row.getValue('is_default_phone');
      return h(Badge, { variant: isDefaultPhone ? "success" : "outline" }, isDefaultPhone ? "YES" : "NO");
    },
    enableSorting: true,
    enableHiding: true,
    meta: {
      title: "Default Phone"
    },
  },
  // {
  //   accessorKey: "status",
  //   header: ({ column }) => h(DataTableColumnHeader, { column, title: "Status"}),
  //   cell: ({ row }) => {
  //     const status = statuses.find(status => status.value === row.original.status.toString())
      
  //     if (!status)
  //       return null

  //       return h(Badge, { variant:"secondary", class: 'flex w-fit items-center' }, [
  //         status.icon && h(VIcon, {  
  //           name: status.icon, 
  //           class: 'mr-1 h-4 w-4 text-muted-foreground',
  //         }),
  //         h('span', {}, status.label),
  //       ])
      
  //   },
  //   enableSorting: true,
  //   enableHiding: true,
  //   filterFn: (row, id, value) => {
  //     const rowValueLower = row.getValue(id)?.toString().toLowerCase() || '';
  //     const filterValueLower = value?.toString().toLowerCase();
  //     return rowValueLower.includes(filterValueLower);    
  //   },
  //   meta: {
  //     title: "Status"
  //   },
  // },
  {
    id: 'actions',
    cell: ({ row }) => h(DataTableRowActions, { row }),
  },
]