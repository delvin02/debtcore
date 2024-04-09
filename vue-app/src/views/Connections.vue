<script setup lang="ts">
import { onMounted } from 'vue'
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

declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: any;
  }
}

onMounted(() => {
  window.fbAsyncInit = function() {
    // JavaScript SDK configuration and setup
    window.FB.init({
      appId: '1145991156753069', // Your Facebook App ID
      cookie: true,
      xfbml: true,
      version: 'v19.0', // Use the latest version as per Facebook's recommendation
    });
  };

  // Load the JavaScript SDK asynchronously
  (function(d, s, id) {
    let js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
});

const launchWhatsAppSignup = () => {
  // Make sure FB is defined
  if (typeof window.FB === 'undefined') {
    alert('Facebook SDK not loaded yet.');
    return;
  }

  // Conversion tracking code
  if (typeof (window as any).fbq === 'function') {
    (window as any).fbq('trackCustom', 'WhatsAppOnboardingStart', {
      appId: '1145991156753069',
      feature: 'whatsapp_embedded_signup',
    });
  }

  // Launch Facebook login
  window.FB.login((response: any) => {
    if (response.authResponse) {
      console.log('Successfully logged in with Facebook');
			console.log(response.authResponse);
      // Here you would typically transmit some information to your backend
      // For obtaining a code, you need to use a server-side flow
    } else {
      console.log('User cancelled login or did not fully authorize.');
    }
  }, {
    config_id: '1452948938905891', // configuration ID goes here
		response_type: 'code',    // must be set to 'code' for System User access token
		override_default_response_type: true,
		extras: {
    sessionInfoVersion: 2,  //  Receive Session Logging Info
  	}
  });
};


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
									<Badge class="ml-3" variant="success">Active</Badge>
									</div>
								</CardContent>
								<Separator class="w-full"/>

								<CardContent class="py-2 pl-0">
									<div>
										<CardDescription>To connect to WhatsApp Business, click the <b>'Connect to WhatsApp'</b> button. You will be taken to the Meta Business website to allow DebtCore to connect to your Organisation.</CardDescription>
										<CardDescription>To disconnect from WhatsApp Business, click the <b>'Disconnect from WhatsApp'</b> button. This button will only be displayed when a connection has been established.</CardDescription>
										<CardDescription class="mt-4">When the connection requires authentication, click the <b>'Authenticate'</b> button. You will be taken to the QBO website to re-establish connection to your Organisation.</CardDescription>
									

										<CardDescription class="mt-8 text-blue-600 underline">Whatsapp Business's System<a href="https://metastatus.com/whatsapp-business-api">Status</a>.</CardDescription>
									</div>
								</CardContent>
							</CardHeader>

						</div>
						<Separator class="w-full"/>

						<CardFooter class="flex items-end justify-end mt-5">
							<Button variant="default" @click=launchWhatsAppSignup>Connect to WhatsApp</Button>
						</CardFooter>
					</Card>    
				</div>
	</div>
</template>
