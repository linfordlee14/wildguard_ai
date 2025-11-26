import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin } from 'lucide-react'

export function LiveMap() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Live Wildlife Map</h1>
          <p className="text-muted-foreground mt-1">
            Real-time tracking and threat zone monitoring
          </p>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-wildguard-500" />
                Conservation Area Map
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-[600px]">
              <div className="h-full w-full bg-muted/30 rounded-b-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Interactive Map Loading...</h3>
                  <p className="text-muted-foreground">
                    Preparing wildlife tracking visualization
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Legend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Map Legend</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-wildguard-500 rounded-full flex items-center justify-center text-white text-xs">🦏</div>
                <span className="text-sm">Rhino Location</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">⚠️</div>
                <span className="text-sm">Hotspot Zone</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border-2 border-wildguard-500 rounded-full bg-wildguard-500/20"></div>
                <span className="text-sm">Movement Path</span>
              </div>
            </CardContent>
          </Card>

          {/* Live Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Live Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Animals Tracked</span>
                <span className="font-semibold">4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Hotspots</span>
                <span className="font-semibold">2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Active Alerts</span>
                <span className="font-semibold text-yellow-500">2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Coverage Area</span>
                <span className="font-semibold">25 km²</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}