import React from 'react'

export function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">WildGuard AI Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold">Active Alerts</h3>
          <p className="text-3xl font-bold text-red-500">3</p>
        </div>
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold">Species Detected</h3>
          <p className="text-3xl font-bold text-green-500">12</p>
        </div>
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold">Active Cameras</h3>
          <p className="text-3xl font-bold text-blue-500">8</p>
        </div>
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold">AI Agents</h3>
          <p className="text-3xl font-bold text-purple-500">5</p>
        </div>
      </div>
    </div>
  )
}