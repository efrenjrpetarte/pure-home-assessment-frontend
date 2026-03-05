import { defineStore } from 'pinia'
import type { CreateFamilyDto, Family } from '~/types/family'

export const useFamilyStore = defineStore('family', () => {
  const api = useApi()
  const families = ref<Family[]>([])
  const loading = ref(false)

  const fetchProperties = async () => {
    loading.value = true
    try {
      const res = await api.get('/family')
      families.value = res.data
    } catch (err) {
      console.error('Failed to fetch families', err)
    } finally {
      loading.value = false
    }
  }

  const createFamily = async (payload: CreateFamilyDto) => {
    loading.value = true
    try {
      const res = await api.post('/family', payload)

      return res.data
    } catch (err: any) {
      err.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateFamily = async (family: Family) => {
  loading.value = true
  try {
    const res = await api.put(`/family/${family.id}`, family)

    return res.data
  } catch (err: any) {
    err.value = err.message
    throw err
  } finally {
    loading.value = false
  }
}

  const deleteFamily = async (id: string) => {
    loading.value = true
    try {
      await api.delete(`/family/${id}`)
      await fetchProperties()
    } catch (err: any) {
      err.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return { families, loading, fetchProperties, createFamily, updateFamily, deleteFamily }
})