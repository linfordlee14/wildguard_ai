import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts'
import {
  TrendingUp,
  BarChart3,
  PieChart as PieChartIcon,
  Download,
  Calendar,
  Activity,
  AlertTriangle,
  Clock
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

// Mock data for analytics
const activityTrends = [
  { date: 'Mon', detections: 12, alerts: 2, threats: 1 },
  { date: 'Tue', detections: 19, alerts: 5, threats: 2 },
  { date: 'Wed', detections: 15, alerts: 3, threats: 1 },
  { date: 'Thu', detections: 25, alerts: 7, threats: 3 },
  { date: 'Fri', detections: 22, alerts: 4, threats: 2 },
  { date: 'Sat', detections: 30, alerts: 6, threats: 4 },
  { date: 'Sun', detections: 28, alerts: 8, threats: 3 }
]

const hourlyPattern = [
  { hour: '00', detections: 2 }, { hour: '02', detections: 1 },
  { hour: '04', detections: 3 }, { hour: '06', detections: 8 },
  { hour: '08', detections: 12 }, { hour: '10', detections: 15 },
  { hour: '12', detections: 18 }, { hour: '14', detections: 20 },
  { hour: '16', detections: 22 }, { hour: '18', detections: 25 },
  { hour: '20', detections: 18 }, { hour: '22', detections: 10 }
]

const speciesData = [
  { name: 'Rhino', value: 45, color: '#14b8a6' },
  { name: 'Elephant', value: 30, color: '#f59e0b' },
  { name: 'Lion', value: 15, color: '#ef4444' },
  { name: 'Leopard', value: 10, color: '#8b5cf6' }
]

const threatTimeline = [
  {
    id: 1,
    time: '14:30',
    date: 'Today',
    type: 'Movement Anomaly',
    severity: 'high',
    location: 'Northern Ridge',
    description: 'Sudden speed drop detected in RH001'
  },
  {
    id: 2,
    time: '12:15',
    date: 'Today',
    type: 'Hotspot Activity',
    severity: 'critical',
    location: 'Eastern Valley',
    description: 'Unauthorized vehicle detected near water source'
  },
  {
    id: 3,
    time: '09:45',
    date: 'Yesterday',
    type: 'Behavioral Change',
    severity: 'medium',
    location: 'Central Plains',
    description: 'Unusual clustering behavior observed'
  }
]

const heatmapData = [
  { location: 'Northern Ridge', morning: 85, afternoon: 92, evening: 78, night: 45 },
  { location: 'Eastern Valley', morning: 65, afternoon: 88, evening: 95, night: 72 },
  { location: 'Central Plains', morning: 45, afternoon: 55, evening: 48, night: 32 },
  { location: 'Southern Border', morning: 78, afternoon: 85, evening: 90, night: 68 }
]

type TabType = 'overview' | 'trends' | 'heatmap'

export function Analytics() {
  const [activeTab, setActiveTab] = useState<TabType>('overview')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'trends', label: 'Trends', icon: TrendingUp },
    { id: 'heatmap', label: 'Heatmap', icon: Activity }
  ]

  const exportData = () => {
    const data = {
      activityTrends,
      hourlyPattern,
      speciesData,
      threatTimeline,
      heatmapData,
      exportedAt: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `wildguard-analytics-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-500 bg-red-500/10'
      case 'high': return 'text-yellow-500 bg-yellow-500/10'
      case 'medium': return 'text-blue-500 bg-blue-500/10'
      default: return 'text-gray-500 bg-gray-500/10'
    }
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gradient">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Wildlife activity patterns and threat analysis
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={exportData} variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Data
          </Button>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            Last 7 days
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Activity Trends */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-wildguard-500" />
                  Activity Trends (7 Days)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={activityTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="detections"
                      stackId="1"
                      stroke="#14b8a6"
                      fill="#14b8a6"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="alerts"
                      stackId="1"
                      stroke="#f59e0b"
                      fill="#f59e0b"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="threats"
                      stackId="1"
                      stroke="#ef4444"
                      fill="#ef4444"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Species Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="w-5 h-5 text-wildguard-500" />
                  Species Detection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={speciesData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {speciesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Threat Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-wildguard-500" />
                  Recent Threats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {threatTimeline.map((threat) => (
                    <div key={threat.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="flex flex-col items-center">
                        <Badge variant="outline" className={getSeverityColor(threat.severity)}>
                          {threat.severity}
                        </Badge>
                        <div className="text-xs text-muted-foreground mt-1">
                          {threat.time}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{threat.type}</h4>
                        <p className="text-sm text-muted-foreground">{threat.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">📍 {threat.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'trends' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Hourly Detection Pattern */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-wildguard-500" />
                  Detection Pattern by Hour
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={hourlyPattern}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="detections" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Weekly Comparison */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-wildguard-500" />
                  Weekly Activity Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={activityTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="detections"
                      stroke="#14b8a6"
                      strokeWidth={3}
                      dot={{ fill: '#14b8a6', strokeWidth: 2, r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="alerts"
                      stroke="#f59e0b"
                      strokeWidth={3}
                      dot={{ fill: '#f59e0b', strokeWidth: 2, r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="threats"
                      stroke="#ef4444"
                      strokeWidth={3}
                      dot={{ fill: '#ef4444', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'heatmap' && (
          <div className="space-y-6">
            {/* Risk Heatmap */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-wildguard-500" />
                  Risk Level Heatmap by Location & Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-5 gap-2 text-sm">
                    <div className="font-medium">Location</div>
                    <div className="font-medium text-center">Morning</div>
                    <div className="font-medium text-center">Afternoon</div>
                    <div className="font-medium text-center">Evening</div>
                    <div className="font-medium text-center">Night</div>
                  </div>
                  {heatmapData.map((row, index) => (
                    <div key={index} className="grid grid-cols-5 gap-2 items-center">
                      <div className="font-medium text-sm">{row.location}</div>
                      {(['morning', 'afternoon', 'evening', 'night'] as const).map((time) => {
                        const value = row[time]
                        const intensity = value / 100
                        return (
                          <div
                            key={time}
                            className="h-12 rounded flex items-center justify-center text-white font-medium text-sm"
                            style={{
                              backgroundColor: `rgba(239, 68, 68, ${intensity})`,
                              color: intensity > 0.5 ? 'white' : 'black'
                            }}
                          >
                            {value}
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
                  <span>Low Risk</span>
                  <div className="flex items-center gap-1">
                    {[0.2, 0.4, 0.6, 0.8, 1.0].map((opacity) => (
                      <div
                        key={opacity}
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: `rgba(239, 68, 68, ${opacity})` }}
                      />
                    ))}
                  </div>
                  <span>High Risk</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </motion.div>
    </div>
  )
}