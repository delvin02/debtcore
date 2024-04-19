<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import axios from 'axios'

declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: any;
  }
}

const loginStatus = ref<string>('Unknown');

</script>

<template>


    <div class="p-8 space-y-8">
        <div class="flex items-center justify-between space-y-2">
            <div>
                <h2 class="text-2xl font-bold tracking-tight">Connections</h2>
                <p class="text-muted-foreground">
                    Here&apos;s a list of your connected apps!
                </p>
            </div>
        </div>
				<div>
					<Card class="shadow-none">
						<div class="flex">
							<CardHeader>
								<CardTitle><VIcon name="fa-whatsapp" class="size-24 fill-green-500" /></CardTitle>
							</CardHeader>
							<CardHeader class="flex-1">
								<CardContent class="py-2 pl-0">
									<div class="flex items-stretch">
									<CardTitle>WhatsApp Business</CardTitle>
									<Badge class="ml-3" variant="success">{{ loginStatus }}</Badge>
									</div>
								</CardContent>
								<Separator class="w-full"/>

								<CardContent class="py-2 pl-0">
									<div>
										<CardDescription>To connect to WhatsApp Business, click the <b>'Connect to WhatsApp'</b> button. You will be taken to the Meta Business website to allow DebtCore to connect to your Organisation.</CardDescription>
										<CardDescription>To disconnect from WhatsApp Business, click the <b>'Disconnect from WhatsApp'</b> button. This button will only be displayed when a connection has been established.</CardDescription>
										<CardDescription class="mt-4">When the connection requires authentication, click the <b>'Authenticate'</b> button. You will be taken to the QBO website to re-establish connection to your Organisation.</CardDescription>
									

										<CardDescription class="mt-8">Whatsapp Business API <a href="https://metastatus.com/whatsapp-business-api" class="text-blue-600 underline">Status</a>.</CardDescription>
									</div>
								</CardContent>
							</CardHeader>

						</div>
						<Separator class="w-full"/>

						<CardFooter class="flex items-end justify-end mt-5">
							<Button variant="default">
                <a 
                href="https://www.facebook.com/v19.0/dialog/oauth?response_type=code&display=popup&client_id=1145991156753069&redirect_uri=https%3A%2F%2Ff6bd-27-33-84-90.ngrok-free.app%2Fconnections%2Ffacebook&auth_type=rerequest&config_id=330747666323309">
              Connect to WhatsApp</a></Button>
						</CardFooter>
					</Card>    
				</div>
	</div>
</template>
