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
    accessorKey: "name",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Name"}),
    cell: ({ row }) => h('div', { class: 'w-20' }, row.getValue('name')),
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
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
    accessorKey: "email",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: column.columnDef.meta!.title}),
    cell: ({ row }) => h('div', { class: 'w-20' }, row.getValue('email')),
    enableSorting: true,
    enableHiding: true,
    meta: {
      title: "Email"
    },
  },
  {
    accessorKey: "company_name",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: column.columnDef.meta!.title}),
    cell: ({ row }) => h('div', { class: 'w-fit' }, row.getValue('company_name')),
    enableSorting: true,
    enableHiding: true,
    meta: {
      title: "Company Name"
    },
  },
  {
    accessorKey: "last_login",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: column.columnDef.meta!.title}),
    cell: ({ row }) => {
      const date = row.getValue('last_login') as string;
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
    enableSorting: true,
    enableHiding: true,
    meta: {
      title: "Last Login"
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => h(DataTableRowActions, { row }),
  },
]