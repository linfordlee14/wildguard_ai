import React from 'react'
import { useStore } from '@/store/useStore'

const navigation = [
  { name: 'Dashboard', id: 'dashboard' },
  { name: 'Live Map', id: 'map' },
  { name: 'Analytics', id: 'analytics' },
  { name: 'AI Agents', id: 'agents' },
  { name: 'Documentation', id: 'docs' },
  { name: 'Settings', id: 'settings' },
]

export function Sidebar() {
  const { selectedView, setSelectedView } = useStore()

  return (
    <div className="flex flex-col w-64 bg-card border-r border-border">
      <div className="flex items-center gap-3 p-6 border-b border-border">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-teal-600">
          🛡️
        </div>
        <div>
          <h1 className="text-xl font-bold">WildGuard AI</h1>
          <p className="text-xs text-muted-foreground">Conservation Platform</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = selectedView === item.id
          return (
            <button
              key={item.id}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-teal-600 text-white' 
                  : 'hover:bg-muted text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setSelectedView(item.id)}
            >
              {item.name}
            </button>
          )
        })}
      </nav>
    </div>
  )
}