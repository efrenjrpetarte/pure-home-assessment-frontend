import { defineStore } from 'pinia'
import type { CreatePropertyDto, Property } from '~/types/property'

export const usePropertyStore = defineStore('property', () => {
  const api = useApi()
  const properties = ref<Property[]>([])
  const loading = ref(false)

  const fetchProperties = async () => {
    loading.value = true
    try {
      const res = await api.get('/property')
      properties.value = res.data
    } catch (err) {
      console.error('Failed to fetch properties', err)
    } finally {
      loading.value = false
    }
  }

  const createProperty = async (payload: CreatePropertyDto) => {
    loading.value = true
    try {
      await api.post('/property', payload)
      await fetchProperties()

      return true
    } catch (err: any) {
      err.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateProperty = async (property: Property) => {
  loading.value = true
  try {
    await api.put(`/property/${property.id}`, property)
    await fetchProperties()

    return true
  } catch (err: any) {
    err.value = err.message
    throw err
  } finally {
    loading.value = false
  }
}

  const deleteProperty = async (id: string) => {
    loading.value = true
    try {
      await api.delete(`/property/${id}`)
      await fetchProperties()
    } catch (err: any) {
      err.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return { properties, loading, fetchProperties, createProperty, updateProperty, deleteProperty }
})