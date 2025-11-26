import useSWR from 'swr'
import { useStore } from '@/store/useStore'

// Create a fetcher that uses the API base URL from the store
const createFetcher = (apiBaseUrl: string) => async (url: string) => {
  const fullUrl = url.startsWith('http') ? url : `${apiBaseUrl}${url}`
  const response = await fetch(fullUrl)
  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }
  return response.json()
}

export function useHealthCheck() {
  const { apiBaseUrl } = useStore()
  const fetcher = createFetcher(apiBaseUrl)
  
  return useSWR('/api/health', fetcher, {
    refreshInterval: 30000, // 30 seconds
  })
}

export function useWildlifeData() {
  const { apiBaseUrl } = useStore()
  const fetcher = createFetcher(apiBaseUrl)
  
  return useSWR('/api/data', fetcher, {
    refreshInterval: 10000, // 10 seconds
  })
}

export function useHotspots() {
  const { apiBaseUrl } = useStore()
  const fetcher = createFetcher(apiBaseUrl)
  
  return useSWR('/api/hotspots', fetcher)
}

export function useAgentStatus() {
  const { backendMode, apiBaseUrl } = useStore()
  const fetcher = createFetcher(apiBaseUrl)
  
  return useSWR(
    backendMode !== 'none' ? '/api/agents/status' : null,
    fetcher,
    {
      refreshInterval: 15000, // 15 seconds
      onError: (error) => {
        console.warn('Agent status fetch failed:', error)
      }
    }
  )
}

export function useMovementAnalysis(data?: any) {
  const { backendMode, apiBaseUrl } = useStore()
  
  return useSWR(
    data && backendMode !== 'none' ? ['/api/movement', data] : null,
    async ([url, payload]) => {
      const fullUrl = `${apiBaseUrl}${url}`
      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      if (!response.ok) throw new Error('Movement analysis failed')
      return response.json()
    },
    {
      refreshInterval: 20000, // 20 seconds
    }
  )
}

export function useOrchestrate(triggerAnalysis: boolean = false) {
  const { backendMode, apiBaseUrl } = useStore()
  
  return useSWR(
    triggerAnalysis && backendMode !== 'none' ? '/api/orchestrate' : null,
    async (url) => {
      const fullUrl = `${apiBaseUrl}${url}`
      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })
      if (!response.ok) throw new Error('Orchestration failed')
      return response.json()
    }
  )
}

export function useAnalytics() {
  const { apiBaseUrl } = useStore()
  const fetcher = createFetcher(apiBaseUrl)
  
  return useSWR('/api/analytics', fetcher, {
    refreshInterval: 30000, // 30 seconds
    onError: (error) => {
      console.warn('Analytics fetch failed, using mock data:', error)
    }
  })
}