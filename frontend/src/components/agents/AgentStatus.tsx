import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Bot,
  Brain,
  Eye,
  Calculator,
  FileText,
  Zap,
  CheckCircle,
  AlertCircle,
  Clock,
  Activity,
  ArrowRight,
  Download,
  Settings,
  Play,
  Pause
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAgentStatus } from '@/hooks/useApi'
import { useStore } from '@/store/useStore'
import { cn, formatDate } from '@/lib/utils'

interface Agent {
  id: string
  name: string
  icon: any
  status: 'operational' | 'idle' | 'error'
  lastRun: string
  inputCount: number
  outputCount: number
  confidence: number
  description: string
  metrics: {
    processed: number
    generated: number
    accuracy: number
  }
}

const agentDefinitions: Agent[] = [
  {
    id: 'planner',
    name: 'Strategic Planner',
    icon: Brain,
    status: 'operational',
    lastRun: new Date(Date.now() - 300000).toISOString(), // 5 min ago
    inputCount: 12,
    outputCount: 8,
    confidence: 92,
    description: 'Analyzes data to create optimal ranger deployment strategies',
    metrics: { processed: 156, generated: 23, accuracy: 94 }
  },
  {
    id: 'movement',
    name: 'Movement Analyst',
    icon: Activity,
    status: 'operational',
    lastRun: new Date(Date.now() - 120000).toISOString(), // 2 min ago
    inputCount: 45,
    outputCount: 12,
    confidence: 87,
    description: 'Detects anomalous wildlife movement patterns',
    metrics: { processed: 342, generated: 67, accuracy: 89 }
  },
  {
    id: 'vision',
    name: 'Vision Analyst',
    icon: Eye,
    status: 'idle',
    lastRun: new Date(Date.now() - 900000).toISOString(), // 15 min ago
    inputCount: 8,
    outputCount: 6,
    confidence: 95,
    description: 'Analyzes camera trap images for threat detection',
    metrics: { processed: 89, generated: 34, accuracy: 96 }
  },
  {
    id: 'scoring',
    name: 'Risk Scorer',
    icon: Calculator,
    status: 'operational',
    lastRun: new Date(Date.now() - 60000).toISOString(), // 1 min ago
    inputCount: 23,
    outputCount: 15,
    confidence: 91,
    description: 'Calculates comprehensive threat risk scores',
    metrics: { processed: 234, generated: 45, accuracy: 92 }
  },
  {
    id: 'reporter',
    name: 'Report Generator',
    icon: FileText,
    status: 'operational',
    lastRun: new Date(Date.now() - 180000).toISOString(), // 3 min ago
    inputCount: 15,
    outputCount: 12,
    confidence: 88,
    description: 'Generates professional ranger briefings and reports',
    metrics: { processed: 78, generated: 56, accuracy: 91 }
  }
]

export function AgentStatus() {
  const { backendMode } = useStore()
  const { data: agentStatusData, isLoading } = useAgentStatus()
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [isOrchestrating, setIsOrchestrating] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-green-500 bg-green-500/10'
      case 'idle': return 'text-yellow-500 bg-yellow-500/10'
      case 'error': return 'text-red-500 bg-red-500/10'
      default: return 'text-gray-500 bg-gray-500/10'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return CheckCircle
      case 'idle': return Clock
      case 'error': return AlertCircle
      default: return Clock
    }
  }

  const runOrchestration = async () => {
    setIsOrchestrating(true)
    // Simulate orchestration
    setTimeout(() => {
      setIsOrchestrating(false)
    }, 3000)
  }

  const downloadLogs = (agentId: string) => {
    const logs = {
      agentId,
      timestamp: new Date().toISOString(),
      logs: [
        'Agent initialized successfully',
        'Processing input data...',
        'Analysis complete',
        'Output generated'
      ]
    }
    
    const blob = new Blob([JSON.stringify(logs, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${agentId}-logs-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (backendMode === 'none') {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Bot className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">AI Agents Offline</h2>
          <p className="text-muted-foreground">
            Enable backend mode in settings to activate AI agents
          </p>
        </div>
      </div>
    )
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
          <h1 className="text-3xl font-bold text-gradient">AI Agent Orchestration</h1>
          <p className="text-muted-foreground mt-1">
            Real-time monitoring and control of wildlife conservation AI agents
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant={backendMode === 'groq' ? 'default' : 'secondary'} className="gap-1">
            <Zap className="w-3 h-3" />
            {backendMode === 'groq' ? 'Groq AI Active' : 'Simulated Mode'}
          </Badge>
          <Button
            onClick={runOrchestration}
            disabled={isOrchestrating}
            className="gap-2"
          >
            {isOrchestrating ? (
              <>
                <Pause className="w-4 h-4" />
                Running...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Run Orchestration
              </>
            )}
          </Button>
        </div>
      </motion.div>

      {/* Agent Flow Diagram */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-wildguard-500" />
            Agent Orchestration Flow
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            {agentDefinitions.map((agent, index) => {
              const Icon = agent.icon
              const StatusIcon = getStatusIcon(agent.status)
              
              return (
                <div key={agent.id} className="flex items-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={cn(
                      "relative p-4 rounded-lg border-2 cursor-pointer transition-all",
                      selectedAgent?.id === agent.id
                        ? "border-wildguard-500 bg-wildguard-500/10"
                        : "border-border bg-card hover:border-wildguard-500/50"
                    )}
                    onClick={() => setSelectedAgent(agent)}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className="relative">
                        <Icon className="w-8 h-8 text-wildguard-500" />
                        <StatusIcon className={cn(
                          "w-4 h-4 absolute -top-1 -right-1",
                          getStatusColor(agent.status).split(' ')[0]
                        )} />
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-sm">{agent.name}</p>
                        <Badge variant="outline" className={getStatusColor(agent.status)}>
                          {agent.status}
                        </Badge>
                      </div>
                    </div>
                    
                    {isOrchestrating && (
                      <motion.div
                        className="absolute inset-0 bg-wildguard-500/20 rounded-lg flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.5 }}
                      >
                        <div className="w-6 h-6 border-2 border-wildguard-500 border-t-transparent rounded-full animate-spin" />
                      </motion.div>
                    )}
                  </motion.div>
                  
                  {index < agentDefinitions.length - 1 && (
                    <ArrowRight className="w-6 h-6 text-muted-foreground mx-4" />
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Agent List */}
        <div className="lg:col-span-2 space-y-4">
          {agentDefinitions.map((agent) => {
            const Icon = agent.icon
            const StatusIcon = getStatusIcon(agent.status)
            
            return (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className={cn(
                  "cursor-pointer transition-all",
                  selectedAgent?.id === agent.id && "ring-2 ring-wildguard-500"
                )}
                onClick={() => setSelectedAgent(agent)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="p-3 bg-wildguard-500/10 rounded-lg">
                            <Icon className="w-6 h-6 text-wildguard-500" />
                          </div>
                          <StatusIcon className={cn(
                            "w-4 h-4 absolute -top-1 -right-1",
                            getStatusColor(agent.status).split(' ')[0]
                          )} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{agent.name}</h3>
                          <p className="text-sm text-muted-foreground">{agent.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span>Last run: {formatDate(agent.lastRun)}</span>
                            <span>Confidence: {agent.confidence}%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <Badge variant="outline" className={getStatusColor(agent.status)}>
                          {agent.status}
                        </Badge>
                        <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">Input</p>
                            <p className="font-semibold">{agent.inputCount}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Output</p>
                            <p className="font-semibold">{agent.outputCount}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Agent Details */}
        <div className="space-y-6">
          {selectedAgent ? (
            <motion.div
              key={selectedAgent.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <selectedAgent.icon className="w-5 h-5 text-wildguard-500" />
                    {selectedAgent.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Status</p>
                    <Badge variant="outline" className={getStatusColor(selectedAgent.status)}>
                      {selectedAgent.status}
                    </Badge>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Performance Metrics</p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Processed</span>
                        <span className="font-semibold">{selectedAgent.metrics.processed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Generated</span>
                        <span className="font-semibold">{selectedAgent.metrics.generated}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Accuracy</span>
                        <span className="font-semibold">{selectedAgent.metrics.accuracy}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Last Activity</p>
                    <p className="text-sm">{formatDate(selectedAgent.lastRun)}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => downloadLogs(selectedAgent.id)}
                      className="flex-1 gap-1"
                    >
                      <Download className="w-3 h-3" />
                      Logs
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 gap-1">
                      <Settings className="w-3 h-3" />
                      Config
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <Bot className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Select an agent to view detailed information
                </p>
              </CardContent>
            </Card>
          )}

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-wildguard-500" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Active Agents</span>
                <span className="font-semibold">
                  {agentDefinitions.filter(a => a.status === 'operational').length}/5
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Processed</span>
                <span className="font-semibold">
                  {agentDefinitions.reduce((sum, a) => sum + a.metrics.processed, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Avg Accuracy</span>
                <span className="font-semibold">
                  {Math.round(agentDefinitions.reduce((sum, a) => sum + a.metrics.accuracy, 0) / agentDefinitions.length)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Backend Mode</span>
                <Badge variant={backendMode === 'groq' ? 'default' : 'secondary'}>
                  {backendMode}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}