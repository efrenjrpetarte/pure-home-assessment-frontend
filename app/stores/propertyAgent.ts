import { defineStore } from 'pinia'
import type { PropertyAgent } from '~/types/property-agent';

export const usePropertyAgentStore = defineStore('propertyAgent', () => {
  const api = useApi() // use Axios instance from composable
  const agents = ref<PropertyAgent[]>([])
  const loading = ref(false)

  const fetchAgents = async () => {
    loading.value = true
    try {
      const res = await api.get('/property-agent')
      agents.value = res.data
    } catch (err) {
      console.error('Failed to fetch agents', err)
    } finally {
      loading.value = false
    }
  }

  return { agents, loading, fetchAgents }
})