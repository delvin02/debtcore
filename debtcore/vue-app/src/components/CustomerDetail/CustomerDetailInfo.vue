<script setup lang="ts">
import { onMounted, reactive, computed } from 'vue'
import axios from 'axios'

interface CustomerDetailInfoProps {
	customer_id: string
}

const props = defineProps<CustomerDetailInfoProps>()

interface InfoData {
	name: string
	whatsapp_phone_number: string
  streetAddress: string
  city: string
  state: string
  postcode: string
  country_name: string
}
const info = reactive<InfoData>({
	name: '',
	whatsapp_phone_number: '',
  streetAddress: '',
  city: '',
  state: '',
  postcode: '',
  country_name: '',
})


const url = `/api/customer/${props.customer_id}/`
const init = async () => {
	try {
		const response = await axios.get(url)
		Object.assign(info, response.data.Result)
	} catch (error) {
		console.log(error)
	}
}

var address = computed(() => {
  const addressParts = [
    info.streetAddress,
    info.city,
    info.state,
    info.postcode,
  ];

  const filteredParts = addressParts.filter(part => part);

  return filteredParts.length ? filteredParts.join(', ') : '';
});

onMounted(() => {
	init()
})

</script>

<template>
  <div class="p-4 bg-secondary">
			<h2 class="text-3xl font-bold tracking-tight mt-2 mb-4">{{ info.name }}</h2>

			<div class="flex justify-items-center place-items-center items-center">
				<VIcon name="fa-phone-alt" class="w-4 h-4" />
				<p class="text-muted-foreground ml-2 place-self-center">{{ info.whatsapp_phone_number.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3') }}</p>
			</div>
			<div class="flex justify-items-center place-items-center items-center">
				<VIcon name="fa-address-book" class="w-4 h-4" />
				<p class="text-muted-foreground ml-2 place-self-center">
					{{ address }}
				</p>
			</div>

      <div class="flex justify-items-center place-items-center items-center">
				<VIcon name="fa-map-pin" class="w-4 h-4" />
				<p class="text-muted-foreground ml-2 place-self-center">
					{{ info.country_name }}
				</p>
			</div>

  </div>
</template>