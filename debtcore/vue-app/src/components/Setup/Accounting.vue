<script setup lang="ts">
import { Button } from '@/components/ui/button'
import EditCompanyBukkuModal from './EditCompanyBukkuModal.vue'
import type { ExportModel } from '@/common/Export.ts'
import { ref, reactive, inject, watch, computed } from 'vue'
import axios from 'axios'
import { useToast } from '@/components/ui/toast/use-toast'
import { useTableStore } from '@/store/table'

const phoneStore = inject('phoneStore', useTableStore('phone'))

const template: ExportModel = reactive({
	is_loading: false
})

const template_import: ExportModel = reactive({
	is_loading: false
})

const company_refresh: ExportModel = reactive({
	is_loading: false
})

const { toast } = useToast()
</script>

<template>
	<div>
		<h4 class="text-lg font-bold py-3">Accounting API Configuration</h4>
		<table class="flex border-t-2 border-primary bg-secondary gap-4 overflow-auto">
			<tr class="flex justify-between w-full items-center">
				<td class="p-2 text-sm w-1/4">Bukku</td>
				<td class="p-2"><EditCompanyBukkuModal /></td>
			</tr>
		</table>
	</div>
</template>

<style scoped>
tr > td:last-child {
	@apply border-l-0;
}
</style>
