import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn, getRiskColor } from '@/lib/utils'
import { AlertTriangle, Shield, Zap } from 'lucide-react'

interface RiskGaugeProps {
  score: number
  className?: string
}

export function RiskGauge({ score, className }: RiskGaugeProps) {
  const normalizedScore = Math.max(0, Math.min(100, score))
  const circumference = 2 * Math.PI * 90
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference
  
  const getRiskLevel = (score: number) => {
    if (score >= 70) return { level: 'CRITICAL', icon: AlertTriangle, color: 'text-red-500' }
    if (score >= 40) return { level: 'HIGH', icon: Zap, color: 'text-yellow-500' }
    return { level: 'LOW', icon: Shield, color: 'text-green-500' }
  }
  
  const risk = getRiskLevel(normalizedScore)
  const RiskIcon = risk.icon

  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <RiskIcon className={cn("w-5 h-5", risk.color)} />
          Threat Level
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        {/* Circular Progress */}
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r="90"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-muted"
            />
            {/* Progress circle */}
            <motion.circle
              cx="100"
              cy="100"
              r="90"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeLinecap="round"
              className={getRiskColor(normalizedScore)}
              style={{
                strokeDasharray,
                strokeDashoffset,
              }}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="text-center"
            >
              <div className={cn("text-4xl font-bold", getRiskColor(normalizedScore))}>
                {Math.round(normalizedScore)}
              </div>
              <div className="text-sm text-muted-foreground">Risk Score</div>
            </motion.div>
          </div>
        </div>
        
        {/* Risk Level Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className={cn(
            "px-4 py-2 rounded-full font-semibold text-sm",
            normalizedScore >= 70 ? "bg-red-500/20 text-red-500" :
            normalizedScore >= 40 ? "bg-yellow-500/20 text-yellow-500" :
            "bg-green-500/20 text-green-500"
          )}
        >
          {risk.level} RISK
        </motion.div>
        
        {/* Risk Description */}
        <div className="text-center text-sm text-muted-foreground max-w-xs">
          {normalizedScore >= 70 && "Immediate action required. Deploy rangers and activate emergency protocols."}
          {normalizedScore >= 40 && normalizedScore < 70 && "Elevated threat detected. Increase patrol frequency and monitoring."}
          {normalizedScore < 40 && "Normal conditions. Continue standard monitoring protocols."}
        </div>
      </CardContent>
    </Card>
  )
}