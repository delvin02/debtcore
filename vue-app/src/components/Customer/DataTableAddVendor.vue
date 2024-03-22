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

import { Button } from '@/components/ui/button'

</script>

<template>
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="secondary" size="sm" class="hidden h-8 ml-2 lg:flex">
            <!-- <MixerHorizontalIcon class="mr-2 h-4 w-4" /> -->
                <VIcon name="fa-plus" class="size-4" />
            </Button>
        </DialogTrigger>
        <DialogContent :isSideBar="false" class="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Add Vendor</DialogTitle>
          <DialogDescription>
            Insert the details of the vendor here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <!-- :validation-schema="vendorSchema" -->
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="name" class="text-right">
              Name
            </Label>
            <Input id="name"  placeholder="John Doe" class="col-span-3" />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="companyname" class="text-right">
              Company Name
            </Label>
            <Input id="companyname" placeholder="Semix Construction" class="col-span-3" />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="email" class="text-right">
              Email
            </Label>
            <Input id="email" type="email" placeholder="hello@semix.com" class="col-span-3" />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="mobile" class="text-right">
              Mobile Phone
            </Label>
            <Input id="mobile" type="text" placeholder="011 989 6348" class="col-span-3" />
          </div>
        </div>
        <DialogFooter class="flex justify-end">
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    
</template>
