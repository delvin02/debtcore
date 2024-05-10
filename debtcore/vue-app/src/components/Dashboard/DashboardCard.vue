<script setup lang="ts">
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import type { Task } from '@/components/Dashboard/data/schema'
import axios from 'axios'
import { onMounted, reactive, onBeforeUnmount } from 'vue'
import { useTableStore } from '@/store/table'

interface CardData {
  scheduled_reminders: number
  active_debts: number
  active_debts_amount: string
  settled_debts_amount: string
}
const card_data = reactive<CardData>({
  scheduled_reminders: 0,
  active_debts: 0,
  active_debts_amount: "0.00",
  settled_debts_amount: "0.00"
})

const dataUrl = '/api/session/card'
const init = async () => {
  try {
    const response = await axios.get(dataUrl)
    Object.assign(card_data, response.data.Result)
  } catch(error) {
  }
}

onMounted(() => {
  init()
})
</script>


<template>
  <div class="flex sm:flex-row sm gap-4 flex-col w-full">
			<Card class="w-1/3">
				<CardHeader>
					<CardTitle>{{ card_data.scheduled_reminders }}</CardTitle>
					<CardDescription>Scheduled Reminder(s)</CardDescription>
				</CardHeader>
			</Card>
			<Card class="w-1/3">
				<CardHeader>
					<CardTitle>{{ card_data.active_debts }}</CardTitle>
					<CardDescription>Active Debt(s)</CardDescription>
				</CardHeader>
			</Card>
			<Card class="w-1/3">
				<CardHeader>
					<CardTitle>RM {{ card_data.active_debts_amount }}</CardTitle>
					<CardDescription>Active Debt Amount</CardDescription>
				</CardHeader>
			</Card>
			<Card class="w-1/3">
				<CardHeader>
					<CardTitle>RM {{ card_data.settled_debts_amount }}</CardTitle>
					<CardDescription>Settled Debt</CardDescription>
				</CardHeader> </Card
			>
		</div>
</template>