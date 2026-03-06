<template>
  <div class="container mx-auto p-6">
    <div class="mb-4 border-b border-gray-400 pb-5">
        <h2 class="text-xl font-bold">{{ selectedPropertyAgent.lastName }}, {{ selectedPropertyAgent.firstName }}</h2>
        <div>Email: <span class="font-semibold">{{ selectedPropertyAgent.email }}</span></div>
        <div>Contact Number: <span class="font-semibold">{{ selectedPropertyAgent.mobileNumber }}</span></div>
        <div>Date created: <span class="font-semibold">{{ formatDateTime(selectedPropertyAgent.createdAt) }}</span></div>
    </div>
    <div class="font-semibold text-2xl pt-3 pb-5">Properties</div>
    <div class="grid grid-cols-4 gap-5">
      <template v-for="property in selectedPropertyAgent.properties">
        <div class=" border border-gray-400 rounded shadow-xl p-3 bg-gray-200">
          <div class="font-semibold text-center">{{ property.name }}</div>
          <div class="text-sm text-center">{{ property.address }}</div>
        </div>
      </template>
    </div>

  </div>
</template>

<script setup lang="ts">
import { usePropertyAgentStore } from '~/stores/propertyAgent';
import type { PropertyAgent } from '~/types/property-agent';


const route = useRoute()
const agentId = route.params.id as string

const selectedPropertyAgent = ref(<PropertyAgent>{})
const propertyAgentStore = usePropertyAgentStore()
const { formatDateTime } = useFormat()

onMounted( async() => {
  selectedPropertyAgent.value = await propertyAgentStore.fetchAgent(agentId);
});
</script>