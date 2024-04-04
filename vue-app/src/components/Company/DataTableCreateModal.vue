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
import Separator from '../ui/separator/Separator.vue'

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
                <DialogTitle>Create Company</DialogTitle>
                <DialogDescription>
                    Insert the details of the company here. Click create when you're done.
                </DialogDescription>
            </DialogHeader>
            <!-- :validation-schema="vendorSchema" -->
            <div class="grid gap-4 py-4">
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="name" class="text-right"> Name </Label>
                    <Input id="name" placeholder="Geroge Sdn Bhd" class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="companyname" class="text-right"> Country </Label>
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
                <Separator />
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="name" class="text-right leading-normal"> Whatsapp Business Account ID </Label>
                    <Input id="name" placeholder="XXXXXXX-XXXXXXX-XXXXXXX-XXXXXXX" class="col-span-3" />
                </div>
            </div>
            <DialogFooter class="flex justify-end">
                <Button type="submit">Create</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
