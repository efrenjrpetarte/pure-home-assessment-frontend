import { defineStore } from 'pinia'
import type { Message } from '~/types/alert-message';
import type { CreatePropertyAgentDto, FieldErrorMessage, PropertyAgent } from '~/types/property-agent';

export const usePropertyAgentStore = defineStore('propertyAgent', () => {
  const api = useApi() // use Axios instance from composable
  const agents = ref<PropertyAgent[]>([])
  const loading = ref(false)
  const errorMessage = ref<Message | null>(null)
  const fieldErrors = ref<FieldErrorMessage | null>(null)

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
    fieldErrors.value = null as FieldErrorMessage | null
    loading.value = true
    try {
      await api.post('/property-agent', payload)
      await fetchAgents()

      return true
    } catch (err: any) {
      fieldErrors.value = err.response?.data?.errors
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchAgent = async (id: string) => {
    loading.value = true
    try {
      const res = await api.get(`/property-agent/${id}`)
      return res.data
    } catch (err) {
      console.error('Failed to fetch agent', err)
    } finally {
      loading.value = false
    }
  }

  const updateAgent = async (agent: PropertyAgent) => {
    fieldErrors.value = null as FieldErrorMessage | null
    loading.value = true
    try {
      await api.put(`/property-agent/${agent.id}`, agent)
      await fetchAgents()

      return true
    } catch (err: any) {
      fieldErrors.value = err.response?.data?.errors
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteAgent = async (id: string) => {
    errorMessage.value = null as Message | null
    loading.value = true
    try {
      await api.delete(`/property-agent/${id}`)
      await fetchAgents()
    } catch (err: any) {
      errorMessage.value = err.response?.data 
      return
    } finally {
      loading.value = false
    }
  }

  return { agents, loading, errorMessage, fieldErrors, fetchAgents, createAgent, fetchAgent, updateAgent, deleteAgent }
})