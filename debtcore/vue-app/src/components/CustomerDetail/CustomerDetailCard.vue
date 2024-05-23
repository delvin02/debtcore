<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { onMounted, reactive } from 'vue'
import axios from 'axios'

interface CustomerDetailCardProps {
	customer_id: string
}

const props = defineProps<CustomerDetailCardProps>()

interface CardData {
	all_time_revenue: number
	outstanding_debt_amount: number
	overdue_amount: string
	total_invoices: string
}
const card_data = reactive<CardData>({
	all_time_revenue: 0,
	outstanding_debt_amount: 0,
	overdue_amount: '0.00',
	total_invoices: '0.00'
})

const dataUrl = `/api/customer/${props.customer_id}/debt/card`
const init = async () => {
	try {
		const response = await axios.get(dataUrl)
		Object.assign(card_data, response.data.Result)
	} catch (error) {
		console.log(error)
	}
}

onMounted(() => {
	init()
})
</script>

<template>
	<div>
		<div class="grid grid-cols-2 md:grid-cols-4 mb-2 gap-4">
			<div>
				<Card>
					<CardHeader>
						<CardDescription>All Time Revenue</CardDescription>
					</CardHeader>
					<CardContent>
						<div class="text-2xl font-bold">
							<h1>RM {{ card_data.all_time_revenue }}</h1>
						</div>
					</CardContent>
				</Card>
			</div>
			<div>
				<Card>
					<CardHeader>
						<CardDescription>Outstanding Debt Amount</CardDescription>
					</CardHeader>
					<CardContent>
						<div class="text-2xl font-bold">
							<h1>RM {{ card_data.outstanding_debt_amount }}</h1>
						</div>
					</CardContent>
				</Card>
			</div>
			<div>
				<Card>
					<CardHeader>
						<CardDescription>Overdue Amount</CardDescription>
					</CardHeader>
					<CardContent>
						<div class="text-2xl font-bold">
							<h1>RM {{ card_data.overdue_amount }}</h1>
						</div>
					</CardContent>
				</Card>
			</div>
			<div>
				<Card>
					<CardHeader>
						<CardDescription>Total Invoices</CardDescription>
					</CardHeader>
					<CardContent>
						<div class="text-2xl font-bold">
							<h1>{{ card_data.total_invoices }}</h1>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	</div>
</template>
