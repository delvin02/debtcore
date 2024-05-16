<script setup lang="ts">
import { baseURL } from '@/main'
import type { Table } from '@tanstack/vue-table'
import { Button } from '@/components/ui/button'
import { ref, reactive, inject, watch, computed } from 'vue'
import axios from 'axios'
import { format, parseISO } from 'date-fns'
import { useTableStore } from '@/store/table'
import type { Task } from '@/components/CustomerDetail/data/schema'
import { useToast } from '@/components/ui/toast/use-toast'
import { mkConfig, generateCsv, download } from 'export-to-csv'
import { statuses } from './data/data'


interface DataTableExportOptionProps {
	table: Table<Task>
}

const props = defineProps<DataTableExportOptionProps>()

const is_loading = ref(false)

const csvConfig = mkConfig({
  fieldSeparator: ',',
  filename: 'report',
  decimalSeparator: '.',
  useKeysAsHeaders: true,
})

const formatDate = (date: Date): string => {
  return date.toLocaleString('en-US', {
    year: 'numeric', 
    month: 'short', 
    day: 'numeric'
  });
}
const exportExcel = () => {
	is_loading.value = true
	const rows = props.table.getFilteredRowModel().rows;

  const rowData = rows.map(row => {
    const invoice = row.getValue('invoice') as string;
    const invoice_date = formatDate(row.getValue('invoice_date') as Date);
    const due_date = formatDate(row.getValue('due_date') as Date);
    const overdue = row.getValue('overdue') as number + ' day(s)';
    const amount = 'RM ' + row.getValue('amount') as string;
    const attachment = `=HYPERLINK("${baseURL}${row.getValue('document_url') as string}", "Click Link Here")`; 
    const status = statuses.find(status => status.value === row.original.status.toString())?.label

    return {
      invoice,
      invoice_date,
      due_date,
      overdue,
      amount,
			attachment,
      status,
    };
  });


  const csv = generateCsv(csvConfig)(rowData);
  download(csvConfig)(csv);
	is_loading.value = false;
}
</script>

<template>
	<div>
		<Button
			variant="secondary"
			size="sm"
			class="hidden h-8 ml-2 lg:flex"
			@click="exportExcel"
		>
			<VIcon
				name="fa-circle-notch"
				v-if="is_loading"
				animation="spin"
				speed="slow"
				class="size-4"
			/>
			<VIcon v-else name="fa-download" class="size-4" />
		</Button>
	</div>
</template>
