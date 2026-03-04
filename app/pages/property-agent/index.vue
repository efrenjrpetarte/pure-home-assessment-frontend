<template>
  <div class="container mx-auto p-6">
    <div class="flex mb-4">
        <h2 class="text-xl font-bold">Agents</h2>
        <Button type="button" variant="green">Add agent</Button>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full border border-gray-200 divide-y divide-gray-200">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Firstname</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Lastname</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">mobileNumber</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="property in propertyAgents" :key="property.id" class="hover:bg-gray-50">
            <td class="px-4 py-2 text-sm text-gray-600">{{ property.id }}</td>
            <td class="px-4 py-2 text-sm text-gray-600">{{ property.firstName }}</td>
            <td class="px-4 py-2 text-sm text-gray-600">{{ property.lastName }}</td>
            <td class="px-4 py-2 text-sm text-gray-600">{{ property.mobileNumber }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import api from '~/services/api';
import type { PropertyAgent } from '~/types/property-agent';

const propertyAgents = ref<PropertyAgent[]>([])

const fetchPropertyAgents  = async () => {
    console.log('loading')
    const res = await api.get('/property-agent')
    console.log('run')
    console.log(res)

    propertyAgents.value = res.data;
    return res;
}

onMounted(() => {
  fetchPropertyAgents();
});
</script>