import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  Map, 
  BarChart3, 
  Bot, 
  Settings, 
  FileText,
  Shield,
  Zap
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useStore } from '@/store/useStore'
import { Button } from '@/components/ui/button'

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, id: 'dashboard' },
  { name: 'Live Map', icon: Map, id: 'map' },
  { name: 'Analytics', icon: BarChart3, id: 'analytics' },
  { name: 'AI Agents', icon: Bot, id: 'agents' },
  { name: 'Documentation', icon: FileText, id: 'docs' },
  { name: 'Settings', icon: Settings, id: 'settings' },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const { selectedView, setSelectedView, backendMode } = useStore()

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className={cn(
        "flex flex-col w-64 bg-card border-r border-border",
        className
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 p-6 border-b border-border">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg gradient-wildguard">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gradient">WildGuard AI</h1>
          <p className="text-xs text-muted-foreground">Conservation Platform</p>
        </div>
      </div>

      {/* Backend Status */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center gap-2 text-sm">
          <div className={cn(
            "w-2 h-2 rounded-full",
            backendMode === 'groq' ? 'bg-green-500 animate-pulse-glow' :
            backendMode === 'simulated' ? 'bg-yellow-500' : 'bg-red-500'
          )} />
          <span className="text-muted-foreground">
            {backendMode === 'groq' ? 'Groq AI Active' :
             backendMode === 'simulated' ? 'Simulated Mode' : 'Offline Mode'}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = selectedView === item.id
          return (
            <Button
              key={item.id}
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 h-12",
                isActive && "bg-primary/10 text-primary border border-primary/20"
              )}
              onClick={() => setSelectedView(item.id)}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
              {item.id === 'agents' && backendMode === 'groq' && (
                <Zap className="w-3 h-3 ml-auto text-green-500" />
              )}
            </Button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="text-xs text-muted-foreground text-center">
          <p>WildGuard AI v2.0</p>
          <p>Wildlife Conservation Platform</p>
        </div>
      </div>
    </motion.div>
  )
}