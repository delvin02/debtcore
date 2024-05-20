import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import type { Task } from './data/schema'
import DataTableColumnHeader from './DataTableColumnHeader.vue'
import DataTableRowActions from './DataTableRowActions.vue'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { OhVueIcon as VIcon } from 'oh-vue-icons'
import { parseISO } from 'date-fns';
import { parseDate } from '@internationalized/date'

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
    accessorKey: 'id',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Id"}),
    cell: ({ row }) => h('div', { class: 'w-20' }, row.getValue('id')),
    enableSorting: true,
    enableHiding: true,
    filterFn: (row, id, value) => {
      const rowValueLower = row.getValue(id)?.toString().toLowerCase() ?? '';
      const filterValueLower = value?.toString().toLowerCase();
      return rowValueLower.includes(filterValueLower);    
    },
    meta: {
      title: "Id"
    },
  },
  {
    accessorKey: 'invoice',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Invoice"}),
    cell: ({ row }) => h('div', { class: 'w-20' }, row.getValue('invoice')),
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
    accessorKey: "company_name",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Company"}),
    cell: ({ row }) => h('div', { class: 'w-fit' }, row.getValue('company_name')),
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
    accessorKey: "customer_name",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Customer"}),
    cell: ({ row }) => h('div', { class: 'w-fit' }, row.getValue('customer_name')),
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
    filterFn: (row, id, value) => {
      const rowValueLower = row.getValue(id)?.toString().toLowerCase() ?? '';
      const filterValueLower = value?.toString().toLowerCase();
      return rowValueLower.includes(filterValueLower);    
    },
    meta: {
      title: "Customer"
    },
  },
  {
    accessorKey: "event_display",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Event Type"}),
    cell: ({ row }) => h('div', { class: 'w-fit' }, row.getValue('event_display')),
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
    filterFn: (row, id, value) => {
      const rowValueLower = row.getValue(id)?.toString().toLowerCase() ?? '';
      const filterValueLower = value?.toString().toLowerCase();
      return rowValueLower.includes(filterValueLower);    
    },
    meta: {
      title: "Event Type"
    },
  },
  {
    accessorKey: "scheduled_date",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: column.columnDef.meta!.title}),
    cell: ({ row }) => {
      const date = row.getValue('scheduled_date') as string;
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
      title: "Scheduled Date"
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Status"}),
    cell: ({ row }) => h('div', { class: 'w-fit' }, row.getValue('status')),
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
    accessorKey: "additional_info",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Additional Info"}),
    cell: ({ row }) => h('div', { class: 'w-fit' }, row.getValue('additional_info')),
    enableSorting: true,
    enableHiding: true,
    filterFn: (row, id, value) => {
      const rowValueLower = row.getValue(id)?.toString().toLowerCase() || '';
      const filterValueLower = value?.toString().toLowerCase();
      return rowValueLower.includes(filterValueLower);    
    },
    meta: {
      title: "Additional Info"
    },
  },
  {
    accessorKey: "change_info",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Change Info"}),
    cell: ({ row }) => h('div', { class: 'w-44' }, row.getValue('change_info')),
    enableSorting: true,
    enableHiding: true,
    filterFn: (row, id, value) => {
      const rowValueLower = row.getValue(id)?.toString().toLowerCase() || '';
      const filterValueLower = value?.toString().toLowerCase();
      return rowValueLower.includes(filterValueLower);    
    },
    meta: {
      title: "Change Info"
    },
  },
  {
    accessorKey: "completed_date",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: column.columnDef.meta!.title}),
    cell: ({ row }) => h('div', { class: 'w-fit' }, row.getValue('completed_date')),

    enableSorting: true,
    enableHiding: true,
    meta: {
      title: "Completed Date"
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => h(DataTableRowActions, { row }),
  },
]