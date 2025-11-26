import React from 'react'

export function Header() {
  return (
    <header className="flex items-center justify-between h-16 px-6 bg-card border-b border-border">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold">WildGuard AI</h2>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Connected</span>
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      </div>
    </header>
  )
}