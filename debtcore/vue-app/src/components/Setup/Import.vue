<script setup lang="ts">
import { Button } from '@/components/ui/button'
import EditCompanyModal from './EditCompanyModal.vue'
import type { ExportModel } from '@/common/Export.ts'
import { ref, reactive, inject, watch, computed } from 'vue'
import axios from 'axios'
import { useToast } from '@/components/ui/toast/use-toast'

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

async function CompanyRefresh() {
	company_refresh.is_loading = true
	try {
		const response = await axios.post(`/api/refresh/company`)

		toast({
			title: response.data.message,
			variant: 'success'
		})
	} catch (error: any) {
		var message = error.response.data.message || ''
		toast({
			title: 'Whoops, something went wrong',
			description: message,
			variant: 'destructive'
		})
	} finally {
		company_refresh.is_loading = false
	}
}

async function TemplateExport() {
	template.is_loading = true
	try {
		const response = await axios.post(`/api/export/reminder-template`)

		toast({
			title: response.data.message,
			variant: 'success'
		})
	} catch (error: any) {
		var message = error.response.data.message || ''
		toast({
			title: 'Whoops, something went wrong',
			description: message,
			variant: 'destructive'
		})
	} finally {
		template.is_loading = false
	}
}

async function TemplateImport() {
	template_import.is_loading = true
	try {
		const response = await axios.post(`/api/setup/template`)

		toast({
			title: response.data.message,
			variant: 'success'
		})
	} catch (error: any) {
		var message = error.response.data.message || ''
		toast({
			title: 'Whoops, something went wrong',
			description: message,
			variant: 'destructive'
		})
	} finally {
		template_import.is_loading = false
	}
}
</script>

<template>
	<div>
		<h4 class="text-lg font-bold py-3">Company</h4>
		<table class="w-full border-t-2 border-primary bg-secondary mb-5">
			<tr>
				<td class="p-2"><EditCompanyModal /></td>
				<td class="p-2">
					<Button @click="() => CompanyRefresh()" :disabled="company_refresh.is_loading">
						<VIcon
							name="fa-circle-notch"
							animation="spin"
							class="w-4 h-4 mr-2"
							v-if="company_refresh.is_loading"
						/>
						<VIcon name="fa-sync" class="h-4 w-4 shrink-0 mr-2" />
						Business Account</Button
					>
				</td>
			</tr>
		</table>

		<h4 class="text-lg font-bold py-3">Management</h4>
		<table class="w-full border-t-2 border-primary bg-secondary gap-4 overflow-auto">
			<tr class="pb-2">
				<td class="p-2 text-sm w-1/4">Whatsapp Template</td>
				<td class="font-bold text-center">Created</td>
				<td class="px-2">
					<Button
						class="my-2"
						@click="() => TemplateExport()"
						:disabled="template.is_loading"
					>
						<VIcon
							name="fa-circle-notch"
							animation="spin"
							class="w-4 h-4 mr-2"
							v-if="template.is_loading"
						/>
						<VIcon name="fa-share-square" class="h-4 w-4 shrink-0 mr-2" />

						Export Reminder Template</Button
					>
				</td>
				<td class="px-2">
					<Button
						class="my-2"
						@click="() => TemplateImport()"
						:disabled="template_import.is_loading"
					>
						<VIcon
							name="fa-circle-notch"
							animation="spin"
							class="w-4 h-4 mr-2"
							v-if="template_import.is_loading"
						/>
						<VIcon name="fa-sync" class="h-4 w-4 shrink-0 mr-2" />
						Import</Button
					>
				</td>
			</tr>
		</table>
	</div>
</template>

<style scoped>
tr > td:last-child {
	@apply border-l-0;
}
</style>
