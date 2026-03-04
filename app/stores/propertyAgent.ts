import { defineStore } from 'pinia'
import type { CreatePropertyAgentDto, PropertyAgent } from '~/types/property-agent';

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

  const createAgent = async (payload: CreatePropertyAgentDto) => {
    loading.value = true
    try {
      const res = await api.post('/property-agent', payload)
      await fetchAgents()

      return res.data
    } catch (err: any) {
      err.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteAgent = async (id: string) => {
    loading.value = true
    try {
      await api.delete(`/property-agent/${id}`)
      await fetchAgents()
    } catch (err: any) {
      err.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return { agents, loading, fetchAgents, createAgent, deleteAgent }
})