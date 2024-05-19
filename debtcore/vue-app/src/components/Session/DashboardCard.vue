<script setup lang="ts">
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { ref, type Ref, onMounted, reactive, onBeforeUnmount } from 'vue'
import type { DateRange } from 'radix-vue'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { RangeCalendar } from '@/components/ui/range-calendar'
import type { GenericSelectListModel, SelectList } from '@/common/SelectList'
import axios from 'axios'
import { useTableStore } from '@/store/table'

interface Session {
	invoice?: number
	company?: number | null
}

const form = reactive<Session>({
	invoice: 1,
	company: null
})

const companies: GenericSelectListModel = reactive({
	is_loading: false,
	is_open: false,
	data: [{ value: '', label: '' }]
})

const searchCompanyQuery = ref('')

async function fetchCompanies(query?: string) {
	companies.is_loading = true
	try {
		const response = await axios.get(`/api/company/list?search=${query || ''}`, {
			withCredentials: true,
			headers: {
				'Cache-Control': 'no-cache',
				Pragma: 'no-cache',
				Expires: '0'
			}
		})

		companies.data = response.data.Result
	} catch (error) {
		console.error('There was an error fetching the select list:', error)
	} finally {
		companies.is_loading = false
	}
}
// const dataUrl = '/api/session/card'
// const init = async () => {
// 	try {
// 		const response = await axios.get(dataUrl)
// 		Object.assign(card_data, response.data.Result)
// 	} catch (error) {
// 		console.log(error)
// 	}
// }

onMounted(() => {
	fetchCompanies()
})

const df = new DateFormatter('en-US', {
	dateStyle: 'medium'
})

const value = ref({
	start: new CalendarDate(2022, 1, 20),
	end: new CalendarDate(2022, 1, 20).add({ days: 20 })
}) as Ref<DateRange>

function handleCompanySelect(company: any) {
	form.company = company.id
	companies.is_open = false
}
</script>

<template>
	<div class="border border-secondary rounded p-4">
		<div class="flex flex-col gap-4">
			<div class="mx-auto grid grid-cols-2 gap-x-2">
				<div class="col-span-1 text-right my-auto">
					<p>Schduled Date</p>
				</div>
				<Popover class="col-span-1">
					<PopoverTrigger as-child>
						<Button
							variant="outline"
							:class="
								cn(
									'w-[250px] justify-start text-left font-normal',
									!value && 'text-muted-foreground'
								)
							"
						>
							<CalendarIcon class="mr-2 h-4 w-4" />
							<template v-if="value.start">
								<template v-if="value.end">
									{{ df.format(value.start.toDate(getLocalTimeZone())) }} -
									{{ df.format(value.end.toDate(getLocalTimeZone())) }}
								</template>

								<template v-else>
									{{ df.format(value.start.toDate(getLocalTimeZone())) }}
								</template>
							</template>
							<template v-else> Pick a date </template>
						</Button>
					</PopoverTrigger>
					<PopoverContent class="w-auto p-0">
						<RangeCalendar
							v-model="value"
							initial-focus
							:number-of-months="2"
							@update:start-value="(startDate) => (value.start = startDate)"
						/>
					</PopoverContent>
				</Popover>
			</div>
			<div class="mx-auto grid grid-cols-2 gap-x-2">
				<div class="col-span-1 text-right my-auto">
					<p>Company</p>
				</div>
				<Popover class="col-span-1" v-model:open="companies.is_open">
					<PopoverTrigger as-child>
						<Button
							variant="outline"
							role="combobox"
							:aria-expanded="companies.is_open"
							class="w-[250px] justify-between px-3"
							:disabled="companies.is_loading"
						>
							{{
								form.company
									? companies.data.find((company) => company.id === form.company)
											?.label
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
							<CommandInput
								class="h-9"
								v-model="searchCompanyQuery"
								placeholder="Search company..."
							/>
							<CommandEmpty>No company found.</CommandEmpty>
							<CommandList>
								<CommandGroup>
									<CommandItem
										v-for="company in companies.data"
										:key="company.id"
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
		<Separator class="my-3" />
		<div class="flex flex-end gap-4">
			<Button class="ml-auto">Filter</Button>
		</div>
	</div>
</template>
