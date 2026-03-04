<template>
  <nav class="bg-white text-gray-800 px-6 py-4 items-center shadow">
    <div class="container mx-auto flex justify-between">
        <div class="font-medium text-2xl">Assessment Exam</div>
        <ul class="flex space-x-6">
          <li v-for="link in links" :key="link.name">
            <NuxtLink
              :to="link.path"
              class="hover:text-gray-400"
              :class="{ 'font-bold': route.path === link.path }"
            >
              {{ link.name }}
            </NuxtLink>
          </li>
        </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

interface NavLink {
  name: string
  path: string
}

const route = useRoute()

const links = ref<NavLink[]>([
  { name: 'Agents', path: '/property-agents' },
  { name: 'Properties', path: '/properties' },
  { name: 'Families', path: '/families' },
  { name: 'Tenant', path: '/tenants' },
  { name: 'Announcements', path: '/announcements' },
])
</script>