import React, { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin } from 'lucide-react'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icons in Leaflet
import L from 'leaflet'
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Component to handle map resizing
function MapResizer() {
  const map = useMap()
  
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize()
    }, 100)
    
    return () => clearTimeout(timer)
  }, [map])
  
  return null
}

export function LiveMap() {
  // Sample wildlife data
  const animals = [
    { id: 'RH001', lat: -25.7461, lng: 28.1881, name: 'Rhino Alpha' },
    { id: 'RH002', lat: -25.7500, lng: 28.1900, name: 'Rhino Beta' },
    { id: 'EL001', lat: -25.7480, lng: 28.1850, name: 'Elephant Charlie' }
  ]

  const mapCenter: [number, number] = [-25.7461, 28.1881]

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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map */}
        <div className="lg:col-span-3">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-wildguard-500" />
                Conservation Area Map
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-[600px]">
              <div className="h-full w-full rounded-b-lg overflow-hidden">
                <MapContainer
                  center={mapCenter}
                  zoom={13}
                  style={{ height: '100%', width: '100%' }}
                  className="rounded-b-lg"
                >
                  <MapResizer />
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  
                  {/* Animal Markers */}
                  {animals.map((animal) => (
                    <Marker key={animal.id} position={[animal.lat, animal.lng]}>
                      <Popup>
                        <div className="p-2">
                          <h3 className="font-semibold">{animal.name}</h3>
                          <p className="text-sm">ID: {animal.id}</p>
                          <p className="text-sm">Status: Active</p>
                          <p className="text-sm">Last seen: Just now</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
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
                <span className="font-semibold">{animals.length}</span>
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

          {/* Animal List */}
          <Card>
            <CardHeader>
              <CardTitle>Tracked Animals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {animals.map((animal) => (
                <div key={animal.id} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <div>
                    <p className="font-medium text-sm">{animal.id}</p>
                    <p className="text-xs text-muted-foreground">{animal.name}</p>
                  </div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}