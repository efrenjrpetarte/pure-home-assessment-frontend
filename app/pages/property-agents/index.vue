<template>
  <div class="container mx-auto p-6">
    <div class="flex mb-4">
        <h2 class="text-xl font-bold">Agents</h2>
        <Button type="button" class="ml-auto" @click="openCreatePropertyAgentModal = true" variant="green">Add agent</Button>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full border border-gray-200 divide-y divide-gray-200">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Firstname</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Lastname</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Mobile #</th>
            <th class="sr-only"></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="property in propertyAgentStore.agents" :key="property.id" class="hover:bg-gray-50">
            <td class="px-4 py-2 text-sm text-gray-600">{{ property.id }}</td>
            <td class="px-4 py-2 text-sm text-gray-600">{{ property.firstName }}</td>
            <td class="px-4 py-2 text-sm text-gray-600">{{ property.lastName }}</td>
            <td class="px-4 py-2 text-sm text-gray-600">{{ property.mobileNumber }}</td>
            <td class="px-4 py-2 text-sm text-gray-600">Edit | Delete</td>
          </tr>
        </tbody>
      </table>
    </div>

    <ModalsCreatePropertyAgentForm :open="openCreatePropertyAgentModal" @close="openCreatePropertyAgentModal = false" />
  </div>
</template>

<script setup lang="ts">
import { usePropertyAgentStore } from '~/stores/propertyAgent';

const openCreatePropertyAgentModal = ref(false)
const propertyAgentStore = usePropertyAgentStore()

onMounted(() => {
  propertyAgentStore.fetchAgents();
});
</script>