import { create } from 'zustand'

export type BackendMode = 'groq' | 'simulated' | 'none'
export type Theme = 'light' | 'dark' | 'system'

interface AppState {
  // Theme
  theme: Theme
  setTheme: (theme: Theme) => void
  
  // Backend Configuration
  backendMode: BackendMode
  setBackendMode: (mode: BackendMode) => void
  apiBaseUrl: string
  setApiBaseUrl: (url: string) => void
  
  // Dashboard State
  selectedView: string
  setSelectedView: (view: string) => void
  
  // Real-time Data
  isLive: boolean
  setIsLive: (live: boolean) => void
  
  // Command Palette
  commandPaletteOpen: boolean
  setCommandPaletteOpen: (open: boolean) => void
  
  // Notifications
  notifications: Array<{
    id: string
    type: 'info' | 'warning' | 'error' | 'success'
    title: string
    message: string
    timestamp: Date
  }>
  addNotification: (notification: Omit<AppState['notifications'][0], 'id' | 'timestamp'>) => void
  removeNotification: (id: string) => void
}

export const useStore = create<AppState>((set, get) => ({
  // Theme
  theme: 'dark',
  setTheme: (theme) => set({ theme }),
  
  // Backend Configuration
  backendMode: 'simulated',
  setBackendMode: (mode) => set({ backendMode: mode }),
  apiBaseUrl: 'http://localhost:5000',
  setApiBaseUrl: (url) => set({ apiBaseUrl: url }),
  
  // Dashboard State
  selectedView: 'dashboard',
  setSelectedView: (view) => set({ selectedView: view }),
  
  // Real-time Data
  isLive: true,
  setIsLive: (live) => set({ isLive: live }),
  
  // Command Palette
  commandPaletteOpen: false,
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
  
  // Notifications
  notifications: [],
  addNotification: (notification) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newNotification = {
      ...notification,
      id,
      timestamp: new Date(),
    }
    set((state) => ({
      notifications: [newNotification, ...state.notifications].slice(0, 10)
    }))
  },
  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id)
    }))
  },
}))