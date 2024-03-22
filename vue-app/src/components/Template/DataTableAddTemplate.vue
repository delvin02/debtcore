<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
    Input
} from "@/components/ui/input"

import {
    Label
} from "@/components/ui/label"

import { Separator } from '@/components/ui/separator'


import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge} from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import {
  CardContent,

} from '@/components/ui/card'
</script>

<template>
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="secondary" size="sm" class="hidden h-8 ml-2 lg:flex">
            <!-- <MixerHorizontalIcon class="mr-2 h-4 w-4" /> -->
                <VIcon name="fa-plus" class="size-4" />
            </Button>
        </DialogTrigger>
        <DialogContent :isSideBar="true">
          <DialogHeader>
            <DialogTitle>Add Template</DialogTitle>
            <Separator  class="my-3"/>
            <DialogTitle>Header <Badge class="ml-2">Optional</Badge></DialogTitle>
            <DialogDescription>
              Add a title or choose which type of media you'll use for this header.
            </DialogDescription>
          </DialogHeader>
          <!-- :validation-schema="vendorSchema" -->
          <div class="grid gap-2 py-2">
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="name" class="text-right">
                Media
              </Label>
              <div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Media" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Media</SelectLabel>
                    <SelectItem value="text">
                      Text
                    </SelectItem>
                    <SelectItem value="nonee=">
                      None
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              </div>
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="name" class="text-right">
                
              </Label>
              <RadioGroup class="flex" default-value="comfortable">
                <CardContent class="border p-4 cursor-pointer">
                    <div class="grid items-center w-full gap-4">
                      <div class="flex flex-col space-y-1.5">
                        <div class="flex justify-start items-center space-x-2">
                          <RadioGroupItem id="r1" value="default" />
                        </div>
                        <VIcon name="fa-book" scale="5"/>
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
                        <VIcon name="fa-file-image" scale="5"/>
                        <Label for="name" class="text-center">Image</Label>
                      </div>
                    </div>
                </CardContent>
              </RadioGroup> 
              <!-- <RadioGroup class="flex" default-value="comfortable">
                <div class="flex items-center space-x-2">
                  <RadioGroupItem id="r1" value="default" />
                  <Label for="r1">Default</Label>
                </div>
                <div class="flex items-center space-x-2">
                  <RadioGroupItem id="r2" value="comfortable" />
                  <Label for="r2">Comfortable</Label>
                </div>
                <div class="flex items-center space-x-2">
                  <RadioGroupItem id="r3" value="compact" />
                  <Label for="r3">Compact</Label>
                </div>
              </RadioGroup>             -->
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="name" class="text-right">
                Name
              </Label>
              <Input id="name"  placeholder="John Doe" class="col-span-3" />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="type" class="text-right">
                Type
              </Label>
              <Input id="type" placeholder="Test" class="col-span-3" />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="language" class="text-right">
                Language
              </Label>
              <Input id="language" placeholder="English" class="col-span-3" />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="message" class="text-right">
                Message
              </Label>
              <div class="col-span-3">
                <Textarea placeholder="Type your message here."  />
                <Button variant="none" class="font-bold">🤭</Button>
                <Button variant="none" class="font-bold ml-1">B</Button>
                <Button variant="none" class="font-bold ml-2"><i>I</i></Button>
                <Button class="mt-2 ml-2">+ Add Variable</Button>

                <!-- <p class="text-muted-foreground">Enter the text for your message in the language you've selected.</p> -->
              </div>
              
            </div>
          </div>
          <DialogFooter class="flex justify-end">
            <Button type="submit">Save changes</Button>
          </DialogFooter>
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
    box-shadow: -2px 0 5px rgba(0,0,0,0.5); /* Optional: shadow for depth */
    z-index: 1000; /* Ensure it's above other content */
    /* Add more styling as needed */
}</style>