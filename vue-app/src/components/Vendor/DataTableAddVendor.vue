<script setup lang="ts">
// import MixerHorizontalIcon from '~icons/radix-icons/mixer-horizontal'

import { Button } from '@/components/ui/button'
</script>

<template>
    <Button variant="secondary" size="sm" class="hidden h-8 ml-2 lg:flex">
        <!-- <MixerHorizontalIcon class="mr-2 h-4 w-4" /> -->
        <VIcon name="fa-plus" class="size-4" />
    </Button>
</template>
