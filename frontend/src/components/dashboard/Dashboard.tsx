import { motion } from 'framer-motion'
import { 
  Camera, 
  MapPin, 
  AlertTriangle, 
  Activity,
  TrendingUp,
  Users,
  Clock,
  Zap
} from 'lucide-react'
import { MetricCard } from './MetricCard'
import { RiskGauge } from './RiskGauge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useWildlifeData, useAgentStatus, useOrchestrate } from '@/hooks/useApi'
import { useStore } from '@/store/useStore'
import { formatDate } from '@/lib/utils'

export function Dashboard() {
  const { isLive, backendMode } = useStore()
  const { data: wildlifeData, isLoading: wildlifeLoading } = useWildlifeData()
  const { data: agentStatus, error: agentError } = useAgentStatus()
  const { data: orchestrateData } = useOrchestrate(false) // Don't auto-run orchestration

  // Production ready - debug logs removed

  // Mock data for demonstration
  const metrics = {
    activeAlerts: orchestrateData?.movement_alerts?.length || 3,
    speciesDetected: wildlifeData?.length || 12,
    activeCameras: 8,
    threatsIdentified: orchestrateData?.risk_assessment?.risk_score > 50 ? 2 : 0,
    riskScore: orchestrateData?.risk_assessment?.risk_score || 35,
    agentsActive: agentStatus?.status === 'operational' ? 5 : 0,
  }

  const recentAlerts = orchestrateData?.movement_alerts?.slice(0, 5) || [
    {
      id: '1',
      rhino_id: 'RH001',
      timestamp: new Date().toISOString(),
      reason: ['sudden_speed_drop'],
      confidence: 0.85,
      latitude: -25.7461,
      longitude: 28.1881
    }
  ]

  return (
    <div className="space-y-4 lg:space-y-6 p-4 lg:p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
      >
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gradient">Wildlife Conservation Dashboard</h1>
          <p className="text-sm lg:text-base text-muted-foreground mt-1">
            Real-time monitoring and AI-powered threat detection
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs lg:text-sm text-muted-foreground">
          <Clock className="w-3 lg:w-4 h-3 lg:h-4" />
          <span className="hidden sm:inline">Last updated: {formatDate(new Date())}</span>
          <span className="sm:hidden">{formatDate(new Date())}</span>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
        <MetricCard
          title="Active Alerts"
          value={metrics.activeAlerts}
          icon={AlertTriangle}
          color="red"
        />
        <MetricCard
          title="Species Detected"
          value={metrics.speciesDetected}
          icon={Activity}
          color="green"
        />
        <MetricCard
          title="Active Cameras"
          value={metrics.activeCameras}
          icon={Camera}
          color="blue"
        />
        <MetricCard
          title="AI Agents"
          value={metrics.agentsActive}
          icon={Zap}
          color={backendMode === 'groq' ? 'green' : 'yellow'}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Risk Gauge */}
        <div className="lg:col-span-1">
          <RiskGauge score={metrics.riskScore} />
        </div>

        {/* Recent Alerts */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base lg:text-lg">
                <AlertTriangle className="w-4 lg:w-5 h-4 lg:h-5 text-yellow-500" />
                Recent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 lg:space-y-4">
                {recentAlerts.map((alert, index) => (
                  <motion.div
                    key={alert.id || index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 lg:p-4 bg-muted/50 rounded-lg border"
                  >
                    <div className="flex items-center gap-2 lg:gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium text-sm lg:text-base">{alert.rhino_id}</p>
                        <p className="text-xs lg:text-sm text-muted-foreground truncate">
                          {alert.reason?.join(', ').replace(/_/g, ' ')}
                        </p>
                      </div>
                    </div>
                    <div className="text-left sm:text-right pl-4 sm:pl-0">
                      <p className="text-xs lg:text-sm font-medium">
                        {Math.round((alert.confidence || 0) * 100)}% confidence
                      </p>
                      <p className="text-[10px] lg:text-xs text-muted-foreground">
                        {formatDate(alert.timestamp)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Agent Status */}
      {backendMode !== 'none' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base lg:text-lg">
              <Zap className="w-4 lg:w-5 h-4 lg:h-5 text-wildguard-500" />
              AI Agent Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4">
              <div className="flex items-center gap-2 lg:gap-3 p-3 lg:p-4 bg-muted/50 rounded-lg">
                <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                  agentStatus?.status === 'operational' ? 'bg-green-500 animate-pulse-glow' : 'bg-yellow-500'
                }`} />
                <div>
                  <p className="font-medium text-sm lg:text-base">Status</p>
                  <p className="text-xs lg:text-sm text-muted-foreground">
                    {agentStatus?.status === 'operational' ? 
                      (agentStatus?.agent_type === 'groq' ? 'Groq AI Active' : 'Simulated') : 
                      'Offline'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 lg:gap-3 p-3 lg:p-4 bg-muted/50 rounded-lg">
                <Users className="w-4 lg:w-5 h-4 lg:h-5 text-wildguard-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm lg:text-base">Active Agents</p>
                  <p className="text-xs lg:text-sm text-muted-foreground">
                    {agentStatus?.agents?.length || 0} specialists
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 lg:gap-3 p-3 lg:p-4 bg-muted/50 rounded-lg">
                <TrendingUp className="w-4 lg:w-5 h-4 lg:h-5 text-wildguard-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm lg:text-base">Model</p>
                  <p className="text-xs lg:text-sm text-muted-foreground">
                    {agentStatus?.model || 'Simulated'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}