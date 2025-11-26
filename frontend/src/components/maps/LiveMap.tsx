import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle } from 'react-leaflet'
import { Icon, LatLngExpression } from 'leaflet'
import { 
  MapPin, 
  AlertTriangle, 
  Shield, 
  Activity,
  Clock,
  Navigation,
  Zap
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useWildlifeData, useHotspots } from '@/hooks/useApi'
import { useStore } from '@/store/useStore'
import { formatDate, cn } from '@/lib/utils'
import 'leaflet/dist/leaflet.css'

// Custom marker icons
const createCustomIcon = (color: string, icon: string) => new Icon({
  iconUrl: `data:image/svg+xml;base64,${btoa(`
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="12" fill="${color}" stroke="white" stroke-width="2"/>
      <text x="16" y="20" text-anchor="middle" fill="white" font-size="12" font-weight="bold">${icon}</text>
    </svg>
  `)}`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16]
})

const rhinoIcon = createCustomIcon('#14b8a6', '🦏')
const hotspotIcon = createCustomIcon('#ef4444', '⚠️')
const safeZoneIcon = createCustomIcon('#22c55e', '✓')

interface AnimalLocation {
  rhino_id: string
  latitude: number
  longitude: number
  timestamp_utc: string
  speed_kmh: number
  heading: number
  status?: 'safe' | 'warning' | 'danger'
}

interface Hotspot {
  id: string
  name: string
  latitude: number
  longitude: number
  risk_level: string
  last_incident: string
}

export function LiveMap() {
  const { isLive } = useStore()
  const { data: wildlifeData, isLoading } = useWildlifeData()
  const { data: hotspotsData } = useHotspots()
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalLocation | null>(null)
  const [showPaths, setShowPaths] = useState(true)
  const [showHotspots, setShowHotspots] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Simulate live updates
  useEffect(() => {
    if (!isLive) return
    
    const interval = setInterval(() => {
      setLastUpdate(new Date())
    }, 5000)
    
    return () => clearInterval(interval)
  }, [isLive])

  // Process wildlife data
  const animals: AnimalLocation[] = wildlifeData || []
  const hotspots: Hotspot[] = hotspotsData?.hotspots || []

  // Generate movement paths for each animal
  const generatePath = (animalId: string): LatLngExpression[] => {
    const animalData = animals.filter(a => a.rhino_id === animalId)
    return animalData.map(a => [a.latitude, a.longitude])
  }

  // Get risk zones
  const getRiskZones = () => {
    return hotspots.map(hotspot => ({
      center: [hotspot.latitude, hotspot.longitude] as LatLngExpression,
      radius: hotspot.risk_level === 'HIGH' ? 2000 : 1000,
      color: hotspot.risk_level === 'HIGH' ? '#ef4444' : '#f59e0b'
    }))
  }

  const mapCenter: LatLngExpression = [-25.7461, 28.1881]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-wildguard-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">Loading wildlife data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gradient">Live Wildlife Map</h1>
          <p className="text-muted-foreground mt-1">
            Real-time tracking and threat zone monitoring
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            Last update: {formatDate(lastUpdate)}
          </div>
          <Badge variant={isLive ? "default" : "secondary"} className="gap-1">
            <div className={cn(
              "w-2 h-2 rounded-full",
              isLive ? "bg-green-500 animate-pulse" : "bg-gray-500"
            )} />
            {isLive ? 'LIVE' : 'PAUSED'}
          </Badge>
        </div>
      </motion.div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-3"
        >
          <Card className="h-full">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-wildguard-500" />
                  Conservation Area
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant={showPaths ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowPaths(!showPaths)}
                  >
                    <Navigation className="w-4 h-4 mr-1" />
                    Paths
                  </Button>
                  <Button
                    variant={showHotspots ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowHotspots(!showHotspots)}
                  >
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    Hotspots
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 h-[600px]">
              <MapContainer
                center={mapCenter}
                zoom={13}
                className="h-full w-full rounded-b-lg"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {/* Risk Zones */}
                {showHotspots && getRiskZones().map((zone, index) => (
                  <Circle
                    key={index}
                    center={zone.center}
                    radius={zone.radius}
                    pathOptions={{
                      color: zone.color,
                      fillColor: zone.color,
                      fillOpacity: 0.1,
                      weight: 2
                    }}
                  />
                ))}
                
                {/* Animal Markers */}
                {animals.map((animal) => (
                  <Marker
                    key={animal.rhino_id}
                    position={[animal.latitude, animal.longitude]}
                    icon={rhinoIcon}
                    eventHandlers={{
                      click: () => setSelectedAnimal(animal)
                    }}
                  >
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-semibold text-lg">{animal.rhino_id}</h3>
                        <div className="space-y-1 text-sm">
                          <p><strong>Speed:</strong> {animal.speed_kmh} km/h</p>
                          <p><strong>Heading:</strong> {animal.heading}°</p>
                          <p><strong>Last seen:</strong> {formatDate(animal.timestamp_utc)}</p>
                          <p><strong>Location:</strong> {animal.latitude.toFixed(4)}, {animal.longitude.toFixed(4)}</p>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
                
                {/* Hotspot Markers */}
                {showHotspots && hotspots.map((hotspot) => (
                  <Marker
                    key={hotspot.id}
                    position={[hotspot.latitude, hotspot.longitude]}
                    icon={hotspotIcon}
                  >
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-semibold text-lg">{hotspot.name}</h3>
                        <div className="space-y-1 text-sm">
                          <p><strong>Risk Level:</strong> 
                            <Badge variant={hotspot.risk_level === 'HIGH' ? 'destructive' : 'secondary'} className="ml-1">
                              {hotspot.risk_level}
                            </Badge>
                          </p>
                          <p><strong>Last Incident:</strong> {formatDate(hotspot.last_incident)}</p>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
                
                {/* Movement Paths */}
                {showPaths && [...new Set(animals.map(a => a.rhino_id))].map(animalId => {
                  const path = generatePath(animalId)
                  if (path.length < 2) return null
                  
                  return (
                    <Polyline
                      key={animalId}
                      positions={path}
                      pathOptions={{
                        color: '#14b8a6',
                        weight: 3,
                        opacity: 0.7,
                        dashArray: '5, 10'
                      }}
                    />
                  )
                })}
              </MapContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
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
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border-2 border-red-500 rounded-full bg-red-500/20"></div>
                <span className="text-sm">Danger Zone</span>
              </div>
            </CardContent>
          </Card>

          {/* Animal Details */}
          {selectedAnimal && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-wildguard-500" />
                  {selectedAnimal.rhino_id}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Speed</p>
                    <p className="font-semibold">{selectedAnimal.speed_kmh} km/h</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Heading</p>
                    <p className="font-semibold">{selectedAnimal.heading}°</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-muted-foreground">Last Update</p>
                    <p className="font-semibold">{formatDate(selectedAnimal.timestamp_utc)}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-muted-foreground">Coordinates</p>
                    <p className="font-semibold text-xs">
                      {selectedAnimal.latitude.toFixed(4)}, {selectedAnimal.longitude.toFixed(4)}
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="w-full justify-center">
                  <Shield className="w-3 h-3 mr-1" />
                  Status: Normal
                </Badge>
              </CardContent>
            </Card>
          )}

          {/* Live Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-wildguard-500" />
                Live Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Animals Tracked</span>
                <span className="font-semibold">{[...new Set(animals.map(a => a.rhino_id))].length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Hotspots</span>
                <span className="font-semibold">{hotspots.length}</span>
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
        </motion.div>
      </div>
    </div>
  )
}