<script setup lang="ts">
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogFooter
} from '@/components/ui/dialog'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { watch, ref, reactive } from 'vue'
import { cn } from '@/lib/utils'
import type { SelectList, GenericSelectListModel } from '@/common/SelectList'
import axios from 'axios'
import { useToast } from '@/components/ui/toast/use-toast'
import { useAuthStore } from '@/store/user'

const auth = useAuthStore()

interface CompanySwitcherForm {
	company: number | string
}
const form = reactive<CompanySwitcherForm>({
	company: parseInt(auth.user?.company_id ?? '0')
})

watch(
	() => auth.user?.company_id,
	(newVal) => {
		form.company = parseInt(newVal ?? '0')
	},
	{ immediate: true }
)

const companies: GenericSelectListModel = reactive({
	is_loading: true,
	is_open: false,
	data: [{ value: '', label: '' }]
})

async function fetchCompanies() {
	console.log('fetching company: ' + auth.user?.company_id)
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

function toggleDialog() {
	if (!is_dialog_open.value) {
		init_form()
	}
	is_dialog_open.value = !is_dialog_open.value
}

async function handleCompanySelect(company: any) {
	is_loading.value = true
	form.company = company.id
	companies.is_open = false
	try {
		const response = await axios.post(
			'http://127.0.0.1:8000/api/user/change-company/',
			{
				...form
			},
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
		is_dialog_open.value = false
		auth.get_user()
		toast({
			title: response.data.Result,
			variant: 'success'
		})
	} catch (error) {
		let errorMessage = 'An unexpected error occurred.'
		toast({
			title: 'Whoops, something went wrong',
			description: errorMessage,
			variant: 'destructive'
		})
	} finally {
		is_loading.value = false
	}
}

// const selectedEmail = ref<string>(props.accounts[0].email)
</script>

<template>
	<div>
		<div>
			<Button variant="ghost" size="sm" class="underline" @click="toggleDialog">
				{{ auth.user?.company_name }}
			</Button>
		</div>
		<Dialog :open="is_dialog_open" @update:open="is_dialog_open = $event">
			<DialogContent :isSideBar="false" class="sm:max-w-[600px]">
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
								<PopoverContent class="w-[400px] p-1">
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
													<VIcon
														name="fa-check"
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
