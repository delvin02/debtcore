<script setup lang="ts">
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

import { Button } from '@/components/ui/button'

import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { statuses } from './data/data'

import { ref } from 'vue'
import { cn } from '@/lib/utils'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from '@/components/ui/command'

import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

const companies = [{ value: 'semix sdn bhd', label: 'Semix Sdn Bhd' }]
const open = ref(false)
const value = ref('')

const date = ref<Date>()
</script>

<template>
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="default" size="sm" class="hidden h-8 ml-2 lg:flex">
                <!-- <MixerHorizontalIcon class="mr-2 h-4 w-4" /> -->
                <VIcon name="fa-plus" class="size-4" />
            </Button>
        </DialogTrigger>
        <DialogContent :isSideBar="false" class="sm:max-w-[700px]">
            <DialogHeader>
                <DialogTitle>Add Debt Record</DialogTitle>
                <DialogDescription>
                    Insert the details of the debt here. Click add when you're done.
                </DialogDescription>
            </DialogHeader>
            <!-- :validation-schema="vendorSchema" -->
            <div class="grid gap-4 py-4">
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="name" class="text-right"> Invoice </Label>
                    <Input id="name" placeholder="INV-007" class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="companyname" class="text-right"> Company </Label>
                    <div class="col-span-3">
                        <Popover v-model:open="open">
                            <PopoverTrigger as-child>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    :aria-expanded="open"
                                    class="w-full justify-between px-3"
                                >
                                    {{
                                        value
                                            ? companies.find((company) => company.value === value)
                                                  ?.label
                                            : 'Select company'
                                    }}
                                    <VIcon name="fa-angle-down" class=" h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent class="w-[500px] p-1">
                                <Command>
                                    <CommandInput class="h-9" placeholder="Search framework..." />
                                    <CommandEmpty>No framework found.</CommandEmpty>
                                    <CommandList>
                                        <CommandGroup>
                                            <CommandItem
                                                v-for="company in companies"
                                                :key="company.value"
                                                :value="company.value"
                                                @select="
                                                    (ev) => {
                                                        if (typeof ev.detail.value === 'string') {
                                                            value = ev.detail.value
                                                        }
                                                        open = false
                                                    }
                                                "
                                            >
                                                {{ company.label }}
                                                <Check
                                                    :class="
                                                        cn(
                                                            'ml-auto h-4 w-4',
                                                            value === company.value
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
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="email" class="text-right"> Due Date </Label>
                    <div class="col-span-3">
                        <Popover>
                            <PopoverTrigger as-child>
                                <Button
                                    :variant="'outline'"
                                    :class="
                                        cn(
                                            'w-full justify-start text-left font-normal',
                                            !date && 'text-muted-foreground'
                                        )
                                    "
                                >
                                    <CalendarIcon class="mr-2 h-4 w-4" />
                                    <span>{{ date ? format(date, 'PPP') : 'Pick a date' }}</span>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent class="w-auto p-0">
                                <Calendar v-model="date" />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="mobile" class="text-right"> Status </Label>
                    <div class="col-span-3">
                        <Select>
                            <SelectTrigger class="w-full">
                                <SelectValue placeholder="Select a status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem
                                        v-for="status in statuses"
                                        :key="status.value"
                                        :value="status.value"
                                    >
                                    <VIcon :name="status.icon" class="mr-1"/>

                                        {{ status.label }}
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div class="grid grid-cols-4 items-center gap-x-4 text-primary">
                    <Label for="mobile" class="text-right"> Attachment </Label>
                    <div class="col-span-3 ">
                        <Input id="name" type="file"  class="col-span-3" />
                    </div> 
                    <p class="col-start-2 col-span-3 mt-1 text-sm text-gray-500 dark:text-gray-300">SVG, PNG, JPG or JPEG, PDF (MAX. 1080x720px).</p>

  
                </div>
            </div>
            <DialogFooter class="flex justify-end">
                <Button type="submit">Add</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
