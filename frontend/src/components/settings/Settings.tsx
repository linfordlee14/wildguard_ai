import { motion } from 'framer-motion'
import { 
  Settings as SettingsIcon, 
  Server, 
  Palette, 
  Bell, 
  Shield,
  Database,
  Wifi,
  Save
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { useStore } from '@/store/useStore'
import { cn } from '@/lib/utils'

export function Settings() {
  const { 
    theme, 
    setTheme, 
    backendMode, 
    setBackendMode, 
    apiBaseUrl, 
    setApiBaseUrl,
    isLive,
    setIsLive
  } = useStore()

  const backendModes = [
    {
      id: 'groq' as const,
      name: 'Groq AI',
      description: 'Full AI agent capabilities with Groq API',
      icon: '🤖',
      status: 'premium'
    },
    {
      id: 'simulated' as const,
      name: 'Simulated',
      description: 'Mock AI responses for development and testing',
      icon: '🎭',
      status: 'development'
    },
    {
      id: 'none' as const,
      name: 'Offline',
      description: 'Basic functionality without AI agents',
      icon: '📴',
      status: 'basic'
    }
  ]

  const themes = [
    { id: 'light' as const, name: 'Light', icon: '☀️' },
    { id: 'dark' as const, name: 'Dark', icon: '🌙' },
    { id: 'system' as const, name: 'System', icon: '💻' }
  ]

  const handleSave = () => {
    // Settings are automatically saved via Zustand persistence
    console.log('Settings saved!')
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
          <h1 className="text-3xl font-bold text-gradient">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Configure your WildGuard AI experience
          </p>
        </div>
        <Button onClick={handleSave} className="gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Backend Configuration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="w-5 h-5 text-wildguard-500" />
                Backend Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-3 block">Backend Mode</label>
                <div className="space-y-3">
                  {backendModes.map((mode) => (
                    <div
                      key={mode.id}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all",
                        backendMode === mode.id
                          ? "border-wildguard-500 bg-wildguard-500/10"
                          : "border-border hover:border-wildguard-500/50"
                      )}
                      onClick={() => setBackendMode(mode.id)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{mode.icon}</span>
                        <div>
                          <p className="font-medium">{mode.name}</p>
                          <p className="text-sm text-muted-foreground">{mode.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={
                          mode.status === 'premium' ? 'default' :
                          mode.status === 'development' ? 'secondary' : 'outline'
                        }>
                          {mode.status}
                        </Badge>
                        <div className={cn(
                          "w-4 h-4 rounded-full border-2",
                          backendMode === mode.id
                            ? "bg-wildguard-500 border-wildguard-500"
                            : "border-muted-foreground"
                        )} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">API Base URL</label>
                <input
                  type="text"
                  value={apiBaseUrl}
                  onChange={(e) => setApiBaseUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-wildguard-500"
                  placeholder="http://localhost:5000"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Backend server endpoint for API calls
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Appearance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-wildguard-500" />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-3 block">Theme</label>
                <div className="grid grid-cols-3 gap-2">
                  {themes.map((themeOption) => (
                    <button
                      key={themeOption.id}
                      onClick={() => setTheme(themeOption.id)}
                      className={cn(
                        "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all",
                        theme === themeOption.id
                          ? "border-wildguard-500 bg-wildguard-500/10"
                          : "border-border hover:border-wildguard-500/50"
                      )}
                    >
                      <span className="text-2xl">{themeOption.icon}</span>
                      <span className="text-sm font-medium">{themeOption.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Data & Privacy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-wildguard-500" />
                Data & Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Live Data Updates</p>
                  <p className="text-sm text-muted-foreground">
                    Enable real-time data synchronization
                  </p>
                </div>
                <Switch
                  checked={isLive}
                  onCheckedChange={setIsLive}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Analytics Collection</p>
                  <p className="text-sm text-muted-foreground">
                    Help improve the platform with usage analytics
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Error Reporting</p>
                  <p className="text-sm text-muted-foreground">
                    Automatically report errors for debugging
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-wildguard-500" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Critical Alerts</p>
                  <p className="text-sm text-muted-foreground">
                    High-priority wildlife threats
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Movement Anomalies</p>
                  <p className="text-sm text-muted-foreground">
                    Unusual animal behavior patterns
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">System Updates</p>
                  <p className="text-sm text-muted-foreground">
                    Agent status and system notifications
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Daily Reports</p>
                  <p className="text-sm text-muted-foreground">
                    Automated ranger briefings
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* System Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-wildguard-500" />
                System Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-wildguard-500">v2.0.0</div>
                  <div className="text-sm text-muted-foreground">Version</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-wildguard-500">
                    {backendMode === 'groq' ? '🟢' : backendMode === 'simulated' ? '🟡' : '🔴'}
                  </div>
                  <div className="text-sm text-muted-foreground">Status</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-wildguard-500">
                    <Wifi className="w-8 h-8 mx-auto" />
                  </div>
                  <div className="text-sm text-muted-foreground">Connected</div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground text-center">
                  WildGuard AI - Wildlife Conservation Platform<br />
                  Built with React, TypeScript, and modern web technologies<br />
                  © 2024 WildGuard AI. All rights reserved.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}