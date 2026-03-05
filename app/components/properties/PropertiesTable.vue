<template>
    <div class="flex mb-4">
        <h2 class="text-xl font-bold">Properties</h2>
        <Button type="button" class="ml-auto" @click="openCreatePropertyModal = true" variant="green">Add property</Button>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full border border-gray-200 divide-y divide-gray-200">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Agent name</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Tenant name</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Property Name</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Address</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Created</th>
            <th class="sr-only"></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="property in propertyStore.properties" :key="property.id" class="hover:bg-gray-50">
            <td class="px-4 py-2 text-sm text-gray-600">{{ property.id }}</td>
            <td class="px-4 py-2 text-sm text-gray-600">{{ property.agent?.firstName }} {{ property.agent?.lastName }}</td>
            <td class="px-4 py-2 text-sm text-gray-600">{{ property.family?.name }}</td>
            <td class="px-4 py-2 text-sm text-gray-600">{{ property.name }}</td>
            <td class="px-4 py-2 text-sm text-gray-600">{{ property.address }}</td>
            <td class="px-4 py-2 text-sm text-gray-600">{{ formatDateTime(property.createdAt) }}</td>
            <td class="px-4 py-2 text-sm text-gray-600 flex">
              <PencilIcon @click="selectProperty(property, 'edit')" class="w-5 h-5 mr-2 text-blue-800 cursor-pointer hover:text-blue-600" />
              <TrashIcon @click="selectProperty(property, 'delete')" class="w-5 h-5 text-red-800 cursor-pointer hover:text-red-600" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <PropertiesCreatePropertyModalForm :agentId="agentId" :options="agentOptions" :open="openCreatePropertyModal" @close="openCreatePropertyModal = false" />
    <PropertiesEditPropertyModalForm :options="agentOptions" :property="selectedProperty" :open="openEditPropertyModal" @close="openEditPropertyModal = false" />
    <ModalsConfirmation 
      title="Remove Property"
      :description="`Are you sure you want to remove ${selectedProperty.name} property?`"
      :submit-button="propertyStore.loading ? 'Deleting...' : 'Delete'"
      :open="openDeletePropertyModal" 
      @close="openDeletePropertyModal = false"  
      @submit="deleteProperty"
    />
</template>

<script setup lang="ts">
import { PencilIcon, TrashIcon } from '@heroicons/vue/16/solid';
import type { Property } from '~/types/property';

const props = defineProps<{
    agentId?: string
}>()

const openCreatePropertyModal = ref(false)
const openDeletePropertyModal = ref(false)
const openEditPropertyModal = ref(false)
const selectedProperty = ref(<Property>{})
const propertyStore = usePropertyStore()
const propertyAgentStore = usePropertyAgentStore();
const { formatDateTime } = useFormat()

const selectProperty = (property: Property, type: String) => {
  selectedProperty.value = property
  type === 'delete' ? openDeletePropertyModal.value = true : openEditPropertyModal.value = true
}

const deleteProperty = async () => {
  try {
    await propertyStore.deleteProperty(selectedProperty.value.id)

    selectedProperty.value = {} as Property
    openDeletePropertyModal.value = false
  } catch (err) {
    console.error('Failed to delete property')
  }
}

const agentOptions = computed(() => {
    return propertyAgentStore.agents.map(agent => ({
        label: `${agent.firstName} ${agent.lastName}`,
        value: agent.id
    }))
})

onMounted(() => {
  propertyStore.fetchProperties();
  propertyAgentStore.fetchAgents();
});
</script>