import { motion } from 'framer-motion'
import { 
  Bell, 
  Search, 
  Sun, 
  Moon, 
  Monitor,
  Command,
  Wifi,
  WifiOff
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useStore } from '@/store/useStore'
import { cn } from '@/lib/utils'
import { useHealthCheck } from '@/hooks/useApi'
import { useEffect } from 'react'

export function Header() {
  const { 
    theme, 
    setTheme, 
    setCommandPaletteOpen, 
    notifications,
    isLive,
    setIsLive
  } = useStore()
  
  const { data: healthData, error: healthError } = useHealthCheck()
  const isOnline = !healthError && healthData?.status

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCommandPaletteOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [setCommandPaletteOpen])

  const cycleTheme = () => {
    const themes: Array<typeof theme> = ['light', 'dark', 'system']
    const currentIndex = themes.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  const ThemeIcon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="flex items-center justify-between h-16 px-6 bg-card border-b border-border"
    >
      {/* Left side */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => setCommandPaletteOpen(true)}
        >
          <Search className="w-4 h-4" />
          <span className="hidden sm:inline">Search...</span>
          <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs bg-muted rounded">
            <Command className="w-3 h-3" />K
          </kbd>
        </Button>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Connection Status */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted">
          {isOnline ? (
            <Wifi className="w-4 h-4 text-green-500" />
          ) : (
            <WifiOff className="w-4 h-4 text-red-500" />
          )}
          <span className="text-sm font-medium">
            {isOnline ? 'Connected' : 'Offline'}
          </span>
        </div>

        {/* Live Data Toggle */}
        <Button
          variant={isLive ? "default" : "outline"}
          size="sm"
          onClick={() => setIsLive(!isLive)}
          className={cn(
            "gap-2",
            isLive && "animate-pulse-glow"
          )}
        >
          <div className={cn(
            "w-2 h-2 rounded-full",
            isLive ? "bg-green-500" : "bg-gray-500"
          )} />
          {isLive ? 'LIVE' : 'PAUSED'}
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </Button>

        {/* Theme Toggle */}
        <Button variant="ghost" size="icon" onClick={cycleTheme}>
          <ThemeIcon className="w-5 h-5" />
        </Button>
      </div>
    </motion.header>
  )
}