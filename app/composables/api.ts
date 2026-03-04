import axios from 'axios'

export const useApi = () => {
  const config = useRuntimeConfig()

  return axios.create({
    baseURL: `${config.public.apiBackendUrl}:${config.public.apiBackendPort}`,
    timeout: 5000,
    headers: {
      'x-api-key': config.public.apiBackendKey
    }
  })
}