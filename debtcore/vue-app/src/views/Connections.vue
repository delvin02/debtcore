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

declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: any;
  }
}

const loginStatus = ref<string>('Unknown');


window.fbAsyncInit = function () {
    // JavaScript SDK configuration and setup
    FB.init({
      appId:    '1145991156753069', // Facebook App ID
      cookie:   true, // enable cookies
      xfbml:    true, // parse social plugins on this page
      version:  'v19.0' //Graph API version
    });
  };
  // Load the JavaScript SDK asynchronously
  (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));


  // Facebook Login with JavaScript SDK
  const launchWhatsAppSignup = () => {
    if (typeof FB === 'undefined') {
        console.error("Facebook SDK not yet loaded. Please wait.");
        return; // Exit the function if FB is not defined.
    }

    // Optional: Tracking code for conversions (if applicable)
    if (typeof fbq === 'function') {
        fbq('trackCustom', 'WhatsAppOnboardingStart', {
            appId: '1145991156753069',
            feature: 'whatsapp_embedded_signup',
        });
    }

    // Launch Facebook login
    FB.login(function (response) {
      console.log(response)
        if (response.authResponse) {
            const code = response.authResponse.code;
            console.log('Authorization Code:', code);
            // The returned code must be transmitted to your backend
        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    }, {
        config_id: '3252673285040486',
        response_type: 'code',
        override_default_response_type: true,
        redirect_uri: "https://3018-27-33-84-90.ngrok-free.app/connections",
        auth_type: 'rerequest'
    });
};

  const sessionInfoListener = (event) => {
  if (event.origin !== "https://www.facebook.com") return;
  try {
    const data = JSON.parse(event.data);
    console.log(data)
    if (data.type === 'WA_EMBEDDED_SIGNUP') {
      // if user finishes the Embedded Signup flow
      if (data.event === 'FINISH') {
        const {phone_number_id, waba_id} = data.data;
      }
      // if user cancels the Embedded Signup flow
      else {
       const{current_step} = data.data;
      }
    }
  } catch {
    // Don’t parse info that’s not a JSON
    console.log('Non JSON Response', event.data);
  }
};

window.addEventListener('message', sessionInfoListener);  

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
							<Button variant="default" @click="launchWhatsAppSignup">
                <a 
                href="https://facebook.com/dialog/oauth?client_id=1145991156753069&display=page&redirect_uri=https://3018-27-33-84-90.ngrok-free.app/connections&response_type=token&scope=whatsapp_business_messaging,whatsapp_business_management,business_management"></a>
              Connect to WhatsApp</Button>
						</CardFooter>
					</Card>    
				</div>
	</div>
</template>
