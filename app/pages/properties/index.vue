<template>
  <div class="container mx-auto p-6">
    <div class="flex mb-4">
        <h2 class="text-xl font-bold">Properties</h2>
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
            <td class="px-4 py-2 text-sm text-gray-600 flex">
              <PencilIcon @click="selectPropertyAgent(property, 'edit')" class="w-5 h-5 mr-2 text-blue-800 cursor-pointer hover:text-blue-600" />
              <TrashIcon @click="selectPropertyAgent(property, 'delete')" class="w-5 h-5 text-red-800 cursor-pointer hover:text-red-600" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <ModalsCreatePropertyAgentForm :open="openCreatePropertyAgentModal" @close="openCreatePropertyAgentModal = false" />
    <ModalsEditPropertyAgentForm :property-agent="selectedPropertyAgent" :open="openEditPropertyAgentModal" @close="openEditPropertyAgentModal = false" />
    <ModalsConfirmation 
      title="Remove Property Agent"
      :description="`Are you sure you want to remove ${selectedPropertyAgent.firstName} as property agent?`"
      :submit-button="propertyAgentStore.loading ? 'Deleting...' : 'Delete'"
      :open="openDeletePropertyAgentModal" 
      @close="openDeletePropertyAgentModal = false"  
      @submit="deletePropertyAgent"
    />
  </div>
</template>

<script setup lang="ts">
import { PencilIcon, TrashIcon } from '@heroicons/vue/16/solid';
import { usePropertyAgentStore } from '~/stores/propertyAgent';
import type { PropertyAgent } from '~/types/property-agent';

const openCreatePropertyAgentModal = ref(false)
const openDeletePropertyAgentModal = ref(false)
const openEditPropertyAgentModal = ref(false)
const selectedPropertyAgent = ref(<PropertyAgent>{})
const propertyAgentStore = usePropertyAgentStore()

const selectPropertyAgent = (propertyAgent: PropertyAgent, type: String) => {
  selectedPropertyAgent.value = propertyAgent
  type === 'delete' ? openDeletePropertyAgentModal.value = true : openEditPropertyAgentModal.value = true
}

const deletePropertyAgent = async () => {
  try {
    await propertyAgentStore.deleteAgent(selectedPropertyAgent.value.id)

    selectedPropertyAgent.value = {} as PropertyAgent
    openDeletePropertyAgentModal.value = false
  } catch (err) {
    console.error('Failed to delete agent')
  }
}

onMounted(() => {
  propertyAgentStore.fetchAgents();
});
</script>