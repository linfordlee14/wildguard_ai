import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

interface MetricCardProps {
  title: string
  value: number
  previousValue?: number
  icon: LucideIcon
  color: 'green' | 'yellow' | 'red' | 'blue' | 'purple'
  suffix?: string
  className?: string
}

const colorMap = {
  green: 'text-green-500 bg-green-500/10 border-green-500/20',
  yellow: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
  red: 'text-red-500 bg-red-500/10 border-red-500/20',
  blue: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
  purple: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
}

export function MetricCard({ 
  title, 
  value, 
  previousValue, 
  icon: Icon, 
  color, 
  suffix = '',
  className 
}: MetricCardProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const [isIncreasing, setIsIncreasing] = useState(false)

  useEffect(() => {
    if (previousValue !== undefined) {
      setIsIncreasing(value > previousValue)
    }
    
    // Animate counter
    const duration = 2000
    const steps = 60
    const increment = (value - displayValue) / steps
    
    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      setDisplayValue(prev => {
        const newValue = prev + increment
        if (currentStep >= steps) {
          clearInterval(timer)
          return value
        }
        return newValue
      })
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value, previousValue, displayValue])

  const change = previousValue !== undefined ? value - previousValue : 0
  const changePercent = previousValue !== undefined && previousValue > 0 
    ? ((change / previousValue) * 100).toFixed(1) 
    : '0'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={className}
    >
      <Card className={cn("border-2 transition-all duration-300 hover:shadow-lg", colorMap[color])}>
        <CardContent className="p-3 lg:p-6">
          <div className="flex items-center justify-between gap-2">
            <div className="space-y-1 lg:space-y-2 min-w-0 flex-1">
              <p className="text-xs lg:text-sm font-medium text-muted-foreground truncate">{title}</p>
              <div className="flex flex-col lg:flex-row lg:items-baseline gap-1 lg:gap-2">
                <motion.span 
                  className="text-xl lg:text-3xl font-bold animate-counter"
                  key={value}
                >
                  {Math.round(displayValue).toLocaleString()}{suffix}
                </motion.span>
                {previousValue !== undefined && (
                  <span className={cn(
                    "text-[10px] lg:text-sm font-medium",
                    isIncreasing ? "text-green-500" : change < 0 ? "text-red-500" : "text-muted-foreground"
                  )}>
                    {change > 0 ? '+' : ''}{change} ({changePercent}%)
                  </span>
                )}
              </div>
            </div>
            <div className={cn(
              "flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex-shrink-0",
              colorMap[color]
            )}>
              <Icon className="w-5 h-5 lg:w-6 lg:h-6" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}