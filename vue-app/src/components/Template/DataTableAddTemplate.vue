<script setup lang="ts">
import { defineModel, ref, computed, watch } from 'vue'
import { cn } from '@/lib/utils'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'

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

import type { Language } from './data/schema'

const defaultMessage = 'Regards,\nSemix SDN BHD'

const message = defineModel<string>('')
const previewMessage = computed(() => {
    const trimmedInput = message.value?.trim()
    return trimmedInput ? `${trimmedInput}\n ${defaultMessage}` : defaultMessage
})

const footer = ref('')
const previewFooter = computed(() => {
    return footer.value
})
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
</script>

<template>
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="secondary" size="sm" class="hidden h-8 ml-2 lg:flex">
                <!-- <MixerHorizontalIcon class="mr-2 h-4 w-4" /> -->
                <VIcon name="fa-plus" class="size-4" />
            </Button>
        </DialogTrigger>
        <DialogContent :isSideBar="true" class="flex flex-col">
            <DialogTitle>Add Template</DialogTitle>
            <Separator class="my-3" />
            <div class="flex items-stretch h-full">
                <div class="w-[300px] border-r-2 mr-2">
                    <DialogHeader>
                        <DialogTitle>Language</DialogTitle>
                        <DialogDescription> Pick a language to edit </DialogDescription>
                    </DialogHeader>
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
                <div class="border-r-2 w-[800px] h-[750px] overflow-auto ml-2">
                    <DialogHeader>
                        <DialogTitle>Template Design (English)</DialogTitle>
                        <DialogDescription>
                            Add a title or choose which type of media you'll use for this header.
                        </DialogDescription>
                    </DialogHeader>
                    <!-- :validation-schema="vendorSchema" -->
                    <div class="grid gap-2 py-2 mt-4">
                        <div class="flex justify-between items-center">
                            <DialogTitle>Header <Badge class="ml-1">Optional</Badge></DialogTitle>
                            <Button type="submit" variant="default" class="mr-2">Submit</Button>
                        </div>
                        <div class="grid grid-cols-4 items-center gap-4">
                            <div class="col-span-1">
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Media" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>None</SelectLabel>
                                            <SelectItem value="text"> Text </SelectItem>
                                            <SelectItem value="none"> None </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div class="grid grid-cols-4 items-center gap-4">
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
                    </div>
                    <div class="grid gap-2 py-2 mt-2">
                        <DialogTitle class="mt-5">Body</DialogTitle>
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
                                    <Button variant="secondary" class="ml-2">+ Add Variable</Button>
                                </div>
                                <!-- <p class="text-muted-foreground">Enter the text for your message in the language you've selected.</p> -->
                            </div>
                        </div>
                        <div class="grid grid-cols-4 items-center gap-4">
                            <div class="col-span-4 mr-2">
                                <Input id="name" placeholder="Name" />
                            </div>
                        </div>
                        <div class="grid grid-cols-4 items-center gap-4 mt-4">
                            <Label for="name" class="text-center"> Name </Label>
                            <div class="col-span-3 mr-2">
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Media" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>None</SelectLabel>
                                            <SelectItem value="text"> Text </SelectItem>
                                            <SelectItem value="none"> None </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <div class="grid gap-2 py-2 mt-2">
                        <DialogTitle class="mt-5">Footer</DialogTitle>
                        <div class="grid grid-cols-4 gap-4">
                            <div class="col-span-4 mr-4 pl-1">
                                <Input placeholder="Type your footer here." class="p-2" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="p-3 w-[400px]">
                    <DialogHeader>
                        <DialogTitle>Preview Message</DialogTitle>
                        <DialogDescription> How it will look on whatsapp. </DialogDescription>
                    </DialogHeader>
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
                                        <p class="text-left text-black px-1 whitespace-pre-wrap">
                                            {{ previewMessage }}
                                        </p>
                                        <div class="flex justify-between items-end">
                                            <p class="text-left ml-1 text-gray-400 text-sm pb-1">
                                                Powered by DebtCore
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
        </DialogContent>
    </Dialog>
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
