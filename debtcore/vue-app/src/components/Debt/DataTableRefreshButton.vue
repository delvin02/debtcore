<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'
import { Button } from '@/components/ui/button'
import { ref, reactive, inject, watch, computed } from 'vue'
import axios from 'axios'
import type { Task } from './data/schema'
import { useTableStore } from '@/store/table'

const tableStore = inject('tableStore', useTableStore('debt'))


const refresh = () => {
  tableStore.refresh(tableStore.page_index)
}

</script>

<template>
	<div>
		<Button variant="outline" size="default" class="flex h-8 ml-2" @click="refresh">
			<VIcon name="md-refresh" class="size-4" />
		</Button>
	</div>
</template>
