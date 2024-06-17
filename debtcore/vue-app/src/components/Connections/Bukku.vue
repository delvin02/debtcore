<script lang="ts" setup>
import { onMounted, onBeforeUnmount } from 'vue'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { connectionStore } from '@/store/connection'
import { useToast } from '@/components/ui/toast/use-toast'

const bukkuImage = new URL(bukku, import.meta.url).href
const connection = connectionStore('bukku')

const { toast } = useToast()

onMounted(() => {
	connection.init('/api/connections/bukku')
})

const disconnect = () => {
	connection.disconnect()
	toast({
		title: 'Bukku disconnected successfully!',
		variant: 'success'
	})
}

onBeforeUnmount(() => {
	connection.$reset()
})
</script>

<template>
	<Card class="shadow-none" v-if="!connection.is_loading">
		<div class="flex flex-col md:flex-row border-t-4 border-[#0aa89a] rounded">
			<CardHeader>
				<CardTitle class="my-auto flex items-center">
					<img :src="bukkuImage" alt="bukku logo" class="w-32" />
				</CardTitle>
			</CardHeader>
			<CardHeader class="flex-1">
				<CardContent class="py-2 pl-0">
					<div class="flex items-stretch">
						<CardTitle>Bukku</CardTitle>
						<Badge class="ml-3" variant="success" v-if="connection.is_authenticated">
							Connected</Badge
						>
						<Badge class="ml-3" variant="destructive" v-else> Not Connected</Badge>
					</div>
				</CardContent>
				<Separator class="w-full" />

				<CardContent class="py-1 pl-0">
					<div>
						<CardDescription
							>To connect to Bukku, contact to our staff to complete part of the
							onboarding process.</CardDescription
						>
						<CardDescription
							>To disconnect from Bukku, click the
							<b>'Disconnect from Bukku'</b> button. This button will only be
							displayed when a connection has been established.</CardDescription
						>

						<!-- <CardDescription class="mt-8"
							>Bukku API
							<a
								href="https://metastatus.com/whatsapp-business-api"
								class="text-blue-600 underline"
								>Status</a
							>.</CardDescription
						> -->
					</div>
				</CardContent>
			</CardHeader>
		</div>
		<div v-if="connection.is_authenticated">
			<Separator class="w-full" />

			<CardFooter class="flex items-end justify-end mt-5">
				<Button variant="destructive" @click="() => disconnect()"> Disconnect</Button>
			</CardFooter>
		</div>
	</Card>
	<Card v-else>
		<VIcon name="fa-circle-notch" animation="spin" speed="slow" class="w-fit h-fit mr-2" />
	</Card>
</template>
