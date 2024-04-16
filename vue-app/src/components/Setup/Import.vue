<script setup lang="ts">
import { Button } from '@/components/ui/button'
import EditCompanyModal from '@/components/Setup/EditCompanyModal.vue'

</script>

<template>
  <div>
    <h4 class="text-lg font-bold py-3">Company</h4>
    <table class="w-full border-t-2 border-primary bg-secondary mb-5">
      <tr>
        <td class="p-2"><EditCompanyModal/></td>
      </tr>
    </table>

    <h4 class="text-lg font-bold py-3">Management</h4>
    <table class="w-full border-t-2 border-primary bg-secondary gap-4">
      <tr class="pb-2 border-primary border-b">
        <td class=" p-2 text-sm w-1/4 ">Whatsapp Template</td>
        <td class="font-bold text-center">Created</td>
        <td class="px-2"><Button class="my-2">Export Default Template</Button></td>
        <td class="px-2"><Button class="my-2">Import</Button></td>
      </tr>

    </table>
  </div>
</template>
