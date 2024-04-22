<script setup lang="ts">
import { defineModel, ref, computed, watch } from 'vue'
import { cn } from '@/lib/utils'

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@/components/ui/sheet'

import { Input } from '@/components/ui/input'

import { Label } from '@/components/ui/label'

import { Separator } from '@/components/ui/separator'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { CardContent } from '@/components/ui/card'
import DialogFooter from '../ui/dialog/DialogFooter.vue'

import type { AcceptableValue } from 'node_modules/radix-vue/dist/Combobox/ComboboxRoot'
import type { SelectEvent } from 'node_modules/radix-vue/dist/Combobox/ComboboxItem'
import { headers } from './data/data'
import DOMPurify from 'dompurify'
import type { Variable } from './data/types'

interface Language {
	label: string
	value: string
}

const defaultMessage = 'Regards,\nSemix SDN BHD'
const defaultFooter = 'Powered by DebtCore'

const header = ref<string>('')
const message = ref<string>('')

const previewMessage = computed(() => {
	const trimmedInput = message.value?.trim() || ''
	const trimmedHeader = header.value?.trim() || ''
	return trimmedHeader
		? `<b>${trimmedHeader}</b>\n\n${trimmedInput}\n\n${defaultMessage}`
		: trimmedInput
			? `${trimmedInput}\n\n${defaultMessage}`
			: defaultMessage
})

// const footer = ref('')
// const previewFooter = computed(() => {
//     return footer.value
// })
const languages: Language[] = [
	{ label: 'English', value: 'en' },
	{ label: 'Malay', value: 'my' }
]

const openLanguage = ref(false)
const openLanguageValue = ref('')

// Correctly initialize selectedLanguages as an array of Language objects
const selectedLanguages = ref<Language[]>([])

const handleSelectLanguage = (ev: SelectEvent<AcceptableValue>) => {
	const lang = languages.find((x) => x.value === ev.detail.value)
	if (
		lang &&
		!selectedLanguages.value.some((selectedValue) => selectedValue.value === lang.value)
	) {
		selectedLanguages.value.push(lang)
		console.log('Selected Languages:', selectedLanguages.value)
	}
}

// header

const selectedHeader = ref<string>('none')

const variables = ref<Variable[]>([])

const addVariable = () => {
	const newId = variables.value.length + 1
	variables.value.push({ id: newId, value: '' })
	message.value += ` {{ ${newId} }}`
}

const computedMessage = computed(() => {
	let result = previewMessage.value
	variables.value.forEach((variable) => {
		const placeholder = `{{ ${variable.id} }}`
		const isBlank =
			variable.value === null || variable.value === undefined || variable.value.trim() === ''
		result = result.replace(
			new RegExp(placeholder, 'g'),
			isBlank ? placeholder : variable.value
		)
	})
	return DOMPurify.sanitize(result)
})

const updateVariablesFromMessage = () => {
	const variableRegex = /\{\{\s*(\d+)\s*\}\}/g
	let match
	const currentVariables = new Map()
	let highestId = 0

	// Extract all variables and count occurrences, note the highest ID found
	while ((match = variableRegex.exec(message.value)) !== null) {
		const id = parseInt(match[1], 10)
		highestId = Math.max(highestId, id)
		if (!currentVariables.has(id)) {
			currentVariables.set(id, { originalId: id, id: 0, count: 1 }) // Temporarily set id to 0
		} else {
			currentVariables.get(id).count += 1
		}
	}

	// Sort and reassign IDs to ensure they start from 1 and are sequential
	let newId = 1
	const sortedVariables = Array.from(currentVariables.values()).sort(
		(a, b) => a.originalId - b.originalId
	)
	sortedVariables.forEach((varInfo) => {
		varInfo.id = newId++
	})

	// Reflect the new ID assignments in the message
	let updatedMessage = message.value
	sortedVariables.forEach((varInfo) => {
		const oldPlaceholder = new RegExp(`\\{\\{\\s*${varInfo.originalId}\\s*\\}\\}`, 'g')
		updatedMessage = updatedMessage.replace(oldPlaceholder, `{{ ${varInfo.id} }}`)
	})

	// Update message and variables array
	message.value = updatedMessage
	variables.value = sortedVariables.map((varInfo) => ({
		id: varInfo.id,
		value: '', // Assuming you reset or handle value separately
		count: varInfo.count
	}))
}

// Watch for changes in the message and update variables accordingly
watch(message, updateVariablesFromMessage, { immediate: true })

// Example usage
updateVariablesFromMessage()
console.log(variables.value) // You will see each variable with its count of occurrences
</script>

<template>
	<Sheet>
		<SheetTrigger>
			<Button variant="secondary" size="sm" class="hidden h-8 ml-2 lg:flex">
				<!-- <MixerHorizontalIcon class="mr-2 h-4 w-4" /> -->
				View
			</Button>
		</SheetTrigger>
		<SheetContent side="right" :class="cn('flex flex-col sm:max-w-full')">
			<SheetTitle>Edit Template</SheetTitle>
			<Separator class="my-3" />
			<div class="flex items-stretch h-full">
				<div class="w-[300px] border-r-2 mr-2">
					<SheetHeader>
						<SheetTitle>Language</SheetTitle>
						<SheetDescription> Pick a language to edit </SheetDescription>
					</SheetHeader>
					<div class="h-full mt-2 w-[200px]">
						<div
							class="mb-2"
							v-for="language in selectedLanguages"
							:key="language.value"
						>
							<Button variant="ghost" class="w-full justify-start">{{
								language.label
							}}</Button>
						</div>
						<Popover v-model:open="openLanguage" class="mt-2 w-full">
							<PopoverTrigger as-child>
								<Button
									variant="outline"
									role="combobox"
									:aria-expanded="openLanguage"
									class="w-full justify-between"
								>
									{{ 'Select language' }}
									<VIcon
										name="fa-angle-down"
										class="ml-2 h-4 w-4 shrink-0 opacity-50"
									/>
								</Button>
							</PopoverTrigger>
							<PopoverContent class="w-[200px] justify-between p-0 mr-2">
								<Command>
									<CommandInput class="h-9" placeholder="Search framework..." />
									<CommandEmpty>No framework found.</CommandEmpty>
									<CommandList>
										<CommandGroup>
											<CommandItem
												v-for="language in languages"
												:key="language.value"
												:value="language.value"
												@select="
													(ev) => {
														handleSelectLanguage(ev)

														if (typeof ev.detail.value === 'string') {
															openLanguageValue = ev.detail.value
														}
														openLanguage = false
													}
												"
											>
												{{ language.label }}
												<Check
													:class="
														cn(
															'ml-auto h-4 w-4',
															openLanguageValue === language.value
																? 'opacity-100'
																: 'opacity-0'
														)
													"
												/>
											</CommandItem>
										</CommandGroup>
									</CommandList>
								</Command>
							</PopoverContent>
						</Popover>
					</div>
				</div>
				<--<div class="border-r-2 w-[800px] h-[750px] overflow-auto ml-2">
					<SheetHeader>
						<SheetTitle>Template Design (English)</SheetTitle>
						<SheetDescription>
							Add a title or choose which type of media you'll use for this header.
						</SheetDescription>
					</SheetHeader>
					<!-- :validation-schema="vendorSchema" -->
					<div class="grid gap-2 py-2 mt-4">
						<div class="flex justify-between items-center">
							<SheetTitle>Header <Badge class="ml-1">Optional</Badge></SheetTitle>
						</div>
						<div class="grid grid-cols-4 items-center gap-4 ml-2">
							<div class="col-span-1">
								<Select :defaultValue="selectedHeader" v-model="selectedHeader">
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectItem
												v-for="header in headers"
												:key="header.value"
												:value="header.value"
											>
												{{ header.label }}
											</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>
						</div>
						<div
							v-if="selectedHeader === 'media'"
							class="grid grid-cols-4 items-center gap-4 ml-2"
						>
							<RadioGroup class="flex" default-value="comfortable">
								<CardContent class="border p-4 cursor-pointer">
									<div class="grid items-center w-full gap-4">
										<div class="flex flex-col space-y-1.5">
											<div class="flex justify-start items-center space-x-2">
												<RadioGroupItem id="r1" value="default" />
											</div>
											<VIcon name="fa-book" scale="5" />
											<Label for="name" class="text-center">Document</Label>
										</div>
									</div>
								</CardContent>
								<CardContent class="border p-4 cursor-pointer">
									<div class="grid items-center w-full gap-4">
										<div class="flex flex-col space-y-1.5">
											<div class="flex justify-start items-center space-x-2">
												<RadioGroupItem id="r2" value="default" />
											</div>
											<VIcon name="fa-file-image" scale="5" />
											<Label for="name" class="text-center">Image</Label>
										</div>
									</div>
								</CardContent>
							</RadioGroup>
						</div>
						<div
							v-else-if="selectedHeader === 'text'"
							class="grid grid-cols-4 items-center gap-4 ml-2 mr-4"
						>
							<Input
								placeholder="Type your header here."
								v-model="header"
								class="p-2 col-span-4"
							/>
						</div>
					</div>
					<div class="grid gap-2 py-2 mt-2">
						<SheetTitle class="mt-5">Body</SheetTitle>
						<div class="grid grid-cols-4 gap-4">
							<div class="col-span-4 mr-4 pl-1">
								<Textarea
									placeholder="Type your message here."
									class="p-2"
									v-model="message"
								/>
								<div class="flex mt-2">
									<Button variant="outline" class="font-bold">
										<VIcon name="bi-emoji-smile-fill"
									/></Button>
									<Button variant="secondary" class="font-bold ml-2">B</Button>
									<Button variant="secondary" class="font-bold ml-2"
										><i>I</i></Button
									>
									<Button variant="secondary" class="ml-2" @click="addVariable"
										>+ Add Variable</Button
									>
								</div>
								<!-- <p class="text-muted-foreground">Enter the text for your message in the language you've selected.</p> -->
							</div>
						</div>
						<div
							class="border border-primary/40 mr-2 rounded ml-1"
							v-if="variables.length > 0"
						>
							<SheetTitle class="mt-3 ml-5">Variables in Body</SheetTitle>

							<div
								class="grid grid-cols-4 items-center gap-4 my-2"
								v-for="variable in variables"
								:key="variable.id"
							>
								<Label for="name" class="text-center">
									&#123;&#123; {{ variable.id }} &#125;&#125;
								</Label>
								<div class="col-span-3 mr-2">
									<Input v-model="variable.value" placeholder="Enter value" />
								</div>
							</div>
						</div>
					</div>

					<div class="grid gap-2 py-2 mt-2">
                        <SheetTitle class="mt-5">Footer</SheetTitle>
                        <div class="grid grid-cols-4 gap-4">
                            <div class="col-span-4 mr-4 pl-1">
                                <Input placeholder="Type your footer here." class="p-2" />
                            </div>
                        </div>
                    </div> 
				</div>-->
				<div class="p-3 w-[400px]">
					<SheetHeader>
						<SheetTitle>Preview Message</SheetTitle>
						<SheetDescription> How it will look on whatsapp. </SheetDescription>
					</SheetHeader>
					<div class="h-fit">
						<div
							class="box-border relative w-full h-[380px] bg-[#e5ddd5] before:z-0 before:content-[''] before:h-full before:w-full before:opacity-[0.06] before:absolute before:size before:bg-cover before:left-0 before:bg-whatsapp-bg my-auto"
						>
							<div class="block mx-4 my-3">
								<div
									class="box-border inline-block w-[300px] relative rounded after:h-[31px] after:-left-3 after:absolute after:top-3 after:bg-whatsapp-chat-edge after:bg-no-repeat after:w-3 after:bg-contain after:content-['']"
								>
									<div
										class="bg-[#fff] min-h-5 relative break-words my-3 p-1 rounded"
									>
										<p
											class="text-left text-black px-1 whitespace-pre-wrap"
											v-html="computedMessage"
										></p>
										<div class="flex justify-between items-end">
											<p class="text-left ml-1 text-gray-400 text-sm pb-1">
												{{ defaultFooter }}
											</p>
											<p class="text-right mr-1 text-gray-400 text-[10px]">
												12:52 AM
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</SheetContent>
	</Sheet>
</template>

<style scoped>
.custom-sidebar-dialog {
	position: fixed; /* Fixed position to stay in place */
	top: 0; /* Align to the top */
	right: 0; /* Align to the right */
	height: 100vh; /* Full viewport height */
	width: 700px; /* Or any width you prefer */
	background-color: white; /* Background color */
	box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5); /* Optional: shadow for depth */
	z-index: 1000; /* Ensure it's above other content */
	/* Add more styling as needed */
}
</style>
