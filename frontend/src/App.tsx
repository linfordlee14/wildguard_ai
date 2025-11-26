import React, { useEffect } from 'react'
import { SWRConfig } from 'swr'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { Dashboard } from '@/components/dashboard/Dashboard'
import { useStore } from '@/store/useStore'
import { cn } from '@/lib/utils'

// Import premium views
import { Settings } from '@/components/settings/Settings'
import { Documentation } from '@/components/docs/Documentation'

// Simple placeholder views for complex components
import { LiveMap } from '@/components/maps/LiveMap-leaflet'
import { Analytics } from '@/components/analytics/Analytics'
import { AgentStatus } from '@/components/agents/AgentStatus'

const views = {
  dashboard: Dashboard,
  map: LiveMap,
  analytics: Analytics,
  agents: AgentStatus,
  docs: Documentation,
  settings: Settings,
}

function AppContent() {
  const { selectedView } = useStore()
  const CurrentView = views[selectedView as keyof typeof views] || Dashboard

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedView}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <CurrentView />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

function App() {
  const { apiBaseUrl, setApiBaseUrl } = useStore()
  
  // Ensure API base URL is set correctly for local development
  useEffect(() => {
    if (!apiBaseUrl || apiBaseUrl === '') {
      setApiBaseUrl('http://localhost:5000')
    }
  }, [apiBaseUrl, setApiBaseUrl])

  // Configure SWR with base URL
  const swrConfig = {
    fetcher: async (url: string) => {
      const fullUrl = url.startsWith('http') ? url : `${apiBaseUrl}${url}`
      const response = await fetch(fullUrl)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.json()
    },
    onError: (error: Error) => {
      console.warn('SWR Error:', error.message)
    },
    refreshInterval: 0, // Disable automatic refresh by default
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  }

  return (
    <ThemeProvider>
      <SWRConfig value={swrConfig}>
        <div className={cn(
          "min-h-screen bg-background text-foreground",
          "transition-colors duration-300"
        )}>
          <AppContent />
        </div>
      </SWRConfig>
    </ThemeProvider>
  )
}

export default App