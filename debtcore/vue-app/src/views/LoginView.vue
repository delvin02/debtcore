<script setup lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useAuthStore } from '@/store/user'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')

const router = useRouter()
const user = useAuthStore()

const errorMessage = ref('')
const isLoading = ref(false)

interface UserAuthenticator {
	access: string
	refresh: string
}

interface User {
	id: string
	name: string
	email: string
}

const login = async () => {
	isLoading.value = true

	if (email.value.trim() === '') {
		errorMessage.value = 'Invalid email'
		isLoading.value = false
		return
	}

	if (password.value === '') {
		errorMessage.value = 'Password cannot be blank'
		isLoading.value = false
		return
	}

	const error = await user.login(email.value, password.value)
	if (!error) {
		router.push('/')
	} else {
		errorMessage.value = error // Display the error message from the login attempt
	}
	isLoading.value = false
}
</script>

<template>
	<div class="h-screen w-full flex flex-col">
		<div
			class="relative flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-3 lg:px-0 overflow-hidden h-full bg-background shadow-md md:shadow-xl"
		>
			<div
				class="relative h-full col-span-2 flex-col bg-muted p-10 text-white lg:flex dark:border-r"
			>
				<div class="absolute inset-0 bg-zinc-900"></div>
				<div class="relative z-20 flex items-center text-lg font-medium">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="mr-2 h-6 w-6"
					>
						<path
							d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"
						></path></svg
					>DebtCore
				</div>
				<div class="relative z-20 mt-auto">
					<blockquote class="space-y-2">
						<p class="text-lg">
							“This library has saved me countless hours of work and helped me deliver
							stunning designs to my clients faster than ever before.”
						</p>
						<footer class="text-sm">Sofia Davis</footer>
					</blockquote>
				</div>
			</div>
			<div class="lg:p-8">
				<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					<div class="flex flex-col space-y-2">
						<h1 class="text-2xl font-semibold tracking-tight">Login</h1>
						<p class="text-sm text-muted-foreground">
							Enter your credentials below to sign in.
						</p>
					</div>
					<div class="grid gap-6">
						<form v-on:submit.prevent="login">
							<div class="grid gap-2">
								<div class="grid gap-1">
									<Label
										class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only"
										for="email"
										>Email</Label
									><Input
										class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
										id="email"
										placeholder="name@example.com"
										autocapitalize="none"
										autocomplete="email"
										autocorrect="off"
										v-model="email"
									/>

									<Label
										class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only"
										for="password"
										>Password</Label
									><Input
										class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
										id="password"
										placeholder="*******"
										autocorrect="off"
										type="password"
										v-model="password"
									/>
								</div>
								<Button
									:disabled="isLoading"
									class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
								>
									<VIcon
										name="fa-circle-notch"
										v-if="isLoading"
										animation="spin"
										class="w-4 h-4 mr-2"
									/>
									Sign In
								</Button>
							</div>
						</form>
						<Alert variant="destructive" class="p-2 text-center" v-if="errorMessage">
							<AlertCircle class="w-2 h-2" />
							<AlertDescription>
								<VIcon name="fa-exclamation-triangle" class="w-4 h-4" />
								{{ errorMessage }}
							</AlertDescription>
						</Alert>
					</div>
					<p class="px-8 text-center text-sm text-muted-foreground">
						© 2022 - 2024 DebtCore | All rights reserved
					</p>
					<!-- <p class="px-8 text-center text-sm text-muted-foreground">
                        By clicking continue, you agree to our
                        <a class="underline underline-offset-4 hover:text-primary" href="/terms"
                            >Terms of Service</a
                        >
                        and
                        <a class="underline underline-offset-4 hover:text-primary" href="/privacy"
                            >Privacy Policy</a
                        >.
                    </p> -->
				</div>
			</div>
		</div>
	</div>
</template>
