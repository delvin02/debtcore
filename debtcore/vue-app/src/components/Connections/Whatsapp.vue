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

const whatsappStore = connectionStore('whatsapp')

const { toast } = useToast()

onMounted(() => {
	whatsappStore.init('/api/connections/facebook')
})

const disconnect = () => {
	whatsappStore.disconnect()
	toast({
		title: 'Whatsapp disconnected successfully!',
		variant: 'success'
	})
}

onBeforeUnmount(() => {
	whatsappStore.$reset()
})
</script>

<template>
	<Card class="shadow-none" v-if="!whatsappStore.is_loading">
		<div class="flex border-t-4 border-green-600/80 rounded">
			<CardHeader>
				<CardTitle><VIcon name="fa-whatsapp" class="size-24 fill-green-500" /></CardTitle>
			</CardHeader>
			<CardHeader class="flex-1">
				<CardContent class="py-2 pl-0">
					<div class="flex items-stretch">
						<CardTitle>WhatsApp Business</CardTitle>
						<Badge class="ml-3" variant="success" v-if="whatsappStore.is_authenticated">
							Connected</Badge
						>
						<Badge class="ml-3" variant="destructive" v-else> Not Connected</Badge>
					</div>
				</CardContent>
				<Separator class="w-full" />

				<CardContent class="py-2 pl-0">
					<div>
						<CardDescription
							>To connect to WhatsApp Business, click the
							<b>'Connect to WhatsApp'</b> button. You will be taken to the Meta
							Business website to allow DebtCore to connect to your
							Organisation.</CardDescription
						>
						<CardDescription
							>To disconnect from WhatsApp Business, click the
							<b>'Disconnect from WhatsApp'</b> button. This button will only be
							displayed when a connection has been established.</CardDescription
						>
						<CardDescription class="mt-4"
							>When the connection requires authentication, click the
							<b>'Authenticate'</b> button. You will be taken to the QBO website to
							re-establish connection to your Organisation.</CardDescription
						>

						<CardDescription class="mt-8"
							>Whatsapp Business API
							<a
								href="https://metastatus.com/whatsapp-business-api"
								class="text-blue-600 underline"
								>Status</a
							>.</CardDescription
						>
					</div>
				</CardContent>
			</CardHeader>
		</div>
		<Separator class="w-full" />

		<CardFooter class="flex items-end justify-end mt-5">
			<Button variant="default" v-if="!whatsappStore.is_authenticated">
				<a :href="whatsappStore.authenticate_url"> Connect to WhatsApp</a></Button
			>
			<Button variant="destructive" @click="() => disconnect()" v-else> Disconnect</Button>
		</CardFooter>
	</Card>
	<Card v-else>
		<VIcon name="fa-circle-notch" animation="spin" speed="slow" class="w-fit h-fit mr-2" />
	</Card>
</template>
