<script lang="ts" setup>
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogFooter
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { computed, ref, reactive } from 'vue'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import type { SelectList, GenericSelectListModel } from '@/common/SelectList'
import axios from 'axios'
import { useToast } from '@/components/ui/toast/use-toast'
import { useAuthStore } from '@/store/user'

const auth = useAuthStore()

interface AccountSwitcherProps {

}
const props = defineProps<AccountSwitcherProps>()

interface CompanySwitcherForm {
  company: number | null
}
const form = reactive<CompanySwitcherForm>({
  company: parseInt(auth.user?.company_id) ?? null
})

const companies: GenericSelectListModel = reactive({
	is_loading: true,
	is_open: false,
	data: [{ value: '', label: '' }]
})

async function fetchCompanies() {
	companies.is_loading = true
	try {
		const companyResponse = await axios.get('http://127.0.0.1:8000/api/company/list', {
			withCredentials: true,
			headers: {
				'Cache-Control': 'no-cache',
				Pragma: 'no-cache',
				Expires: '0'
			}
		})

		companies.data = companyResponse.data.Result.map((company: SelectList) => ({
			id: company.id,
			value: company.value,
			label: company.label
		}))
	} catch (error) {
		console.error('There was an error fetching the select list:', error)
	} finally {
		companies.is_loading = false
	}
}

const init_form = async () => {
	await fetchCompanies()

}

const is_loading = ref(false)
const is_dialog_open = ref(false)
const { toast } = useToast()

async function submit() {
	is_loading.value = true
	const drfCsrf = JSON.parse(document.getElementById('drf_csrf')?.textContent || '{}')
	try {
		const response = await axios.patch(
			'http://127.0.0.1:8000/api/user',
			{
				...form
			},
			{
				headers: {
					'Content-Type': 'application/json',
					[drfCsrf.csrfHeaderName]: drfCsrf.csrfToken
				}
			}
		)
		// toggleDialog()
		toast({
			title: response.data.Result,
			variant: 'success'
		})
	} catch (error) {
		let errorMessage = 'An unexpected error occurred.' // Default error message
		if (axios.isAxiosError(error) && error.response) {
			// Check if the error details exist and are structured as expected
			if (error.response.data.details && typeof error.response.data.details === 'object') {
				// Extract the first error message from the details object
				const errorKeys = Object.keys(error.response.data.details)
				if (errorKeys.length > 0 && error.response.data.details[errorKeys[0]].length > 0) {
					errorMessage = error.response.data.details[errorKeys[0]][0]
				}
			} else if (error.response.data.error) {
				// Fallback to a top-level 'error' field if present
				errorMessage = error.response.data.error
			}
		}
		toast({
			title: 'Whoops, something went wrong',
			description: errorMessage || '',
			variant: 'destructive'
		})
	} finally {
		is_loading.value = false
	}
}

function toggleDialog() {
	if (!is_dialog_open.value) {
		init_form()
	}
	is_dialog_open.value = !is_dialog_open.value
}


function handleCompanySelect(company: any) {
	form.company = company.id

	companies.is_open = false
}



// const selectedEmail = ref<string>(props.accounts[0].email)
</script>

<template>
  <div>
		<div>
			<Button
				variant="ghost"
				size="sm"
				class="underline"
				@click="toggleDialog"
			>
      {{ auth.user?.company_name }}
      
			</Button>
		</div>
		<Dialog :open="is_dialog_open" @update:open="is_dialog_open = $event">
			<DialogContent :isSideBar="false" class="sm:max-w-[700px] z-40">
				<DialogHeader>
					<DialogTitle>Change Company</DialogTitle>
					<DialogDescription>
						Insert the details of the user here. Click edit when you're done.
					</DialogDescription>
				</DialogHeader>
				<div class="grid gap-4 py-4">
					<div class="grid grid-cols-4 items-center gap-4">
						<Label for="companyname" class="text-right"> Company </Label>
						<div class="col-span-3">
							<Popover v-model:open="companies.is_open">
								<PopoverTrigger as-child>
									<Button
										variant="outline"
										role="combobox"
										:aria-expanded="companies.is_open"
										class="w-full justify-between px-3"
										:disabled="companies.is_loading"
									>
										{{
											form.company
												? companies.data.find(
														(company) => company.id === form.company
													)?.label
												: 'Select company'
										}}
										<VIcon
											name="fa-circle-notch"
											v-if="companies.is_loading"
											animation="spin"
											class="w-4 h-4 mr-2"
										/>
										<VIcon
											v-else
											name="fa-angle-down"
											class="h-4 w-4 shrink-0 opacity-50"
										/>
									</Button>
								</PopoverTrigger>
								<PopoverContent class="w-[500px] p-1">
									<Command>
										<CommandInput class="h-9" placeholder="Search company..." />
										<CommandEmpty>No company found.</CommandEmpty>
										<CommandList>
											<CommandGroup>
												<CommandItem
													v-for="company in companies.data"
													:key="company.value"
													:value="company.value ?? ''"
													@select="() => handleCompanySelect(company)"
												>
													{{ company.label }}
													<VIcon name="fa-check"
														:class="[
															'ml-auto h-4 w-4',
															form.company === company.id
																? 'opacity-100'
																: 'opacity-0'
														]"
													/>
												</CommandItem>
											</CommandGroup>
										</CommandList>
									</Command>
								</PopoverContent>
							</Popover>
						</div>
					</div>
				</div>
				<DialogFooter class="flex justify-end">
					<Button type="submit" @click="submit" :disabled="is_loading">
						<VIcon
							name="fa-circle-notch"
							v-if="is_loading"
							animation="spin"
							speed="slow"
							class="w-fit h-fit mr-2"
						/>
						Edit</Button
					>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	</div>
</template>

<!-- <Popover v-model:open="companies.is_open">
  <PopoverTrigger as-child>
    <Button
      variant="outline"
      role="combobox"
      :aria-expanded="companies.is_open"
      class="w-full justify-between px-3"
      :disabled="companies.is_loading"
    >
      {{
        form.company
          ? companies.data.find(
              (company) => company.id === form.company
            )?.label
          : 'Select company'
      }}
      <VIcon
        name="fa-circle-notch"
        v-if="companies.is_loading"
        animation="spin"
        class="w-4 h-4 mr-2"
      />
      <VIcon
        v-else
        name="fa-angle-down"
        class="h-4 w-4 shrink-0 opacity-50"
      />
    </Button>
  </PopoverTrigger>
  <PopoverContent class="w-[500px] p-1">
    <Command>
      <CommandInput class="h-9" placeholder="Search company..." />
      <CommandEmpty>No company found.</CommandEmpty>
      <CommandList>
        <CommandGroup>
          <CommandItem
            v-for="company in companies.data"
            :key="company.value"
            :value="company.value ?? ''"
            @select="() => handleCompanySelect(company)"
          >
            {{ company.label }}
            <VIcon name="fa-check"
              :class="[
                'ml-auto h-4 w-4',
                form.company === company.id
                  ? 'opacity-100'
                  : 'opacity-0'
              ]"
            />
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  </PopoverContent>
</Popover> -->