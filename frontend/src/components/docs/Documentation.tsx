import { motion } from 'framer-motion'
import { 
  FileText, 
  Book, 
  Code, 
  Zap, 
  Shield, 
  ExternalLink,
  Download,
  Play
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const sections = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: Play,
    description: 'Quick setup guide for WildGuard AI',
    items: [
      'Installation and setup',
      'Backend configuration',
      'API key setup',
      'First deployment'
    ]
  },
  {
    id: 'api-reference',
    title: 'API Reference',
    icon: Code,
    description: 'Complete API documentation',
    items: [
      'Authentication',
      'Wildlife data endpoints',
      'Agent orchestration',
      'Real-time updates'
    ]
  },
  {
    id: 'ai-agents',
    title: 'AI Agents',
    icon: Zap,
    description: 'Understanding the AI agent system',
    items: [
      'Agent architecture',
      'Groq integration',
      'Custom prompts',
      'Performance tuning'
    ]
  },
  {
    id: 'security',
    title: 'Security',
    icon: Shield,
    description: 'Security best practices',
    items: [
      'Data encryption',
      'Access control',
      'API security',
      'Compliance'
    ]
  }
]

const quickLinks = [
  { name: 'GitHub Repository', url: '#', icon: ExternalLink },
  { name: 'API Documentation', url: '#', icon: Book },
  { name: 'Download PDF Guide', url: '#', icon: Download },
  { name: 'Video Tutorials', url: '#', icon: Play }
]

export function Documentation() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gradient">Documentation</h1>
          <p className="text-muted-foreground mt-1">
            Complete guide to WildGuard AI platform
          </p>
        </div>
        <Badge variant="secondary" className="gap-1">
          <FileText className="w-3 h-3" />
          v2.0.0
        </Badge>
      </motion.div>

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {quickLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Button
                    key={link.name}
                    variant="outline"
                    className="h-auto p-4 flex flex-col gap-2"
                    asChild
                  >
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      <Icon className="w-6 h-6 text-wildguard-500" />
                      <span className="text-sm">{link.name}</span>
                    </a>
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Documentation Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sections.map((section, index) => {
          const Icon = section.icon
          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-wildguard-500" />
                    {section.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {section.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-wildguard-500 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Setup Guide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="w-5 h-5 text-wildguard-500" />
              Quick Setup Guide
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Backend Setup</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="bg-wildguard-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">1</span>
                    <span>Install Python dependencies: <code className="bg-muted px-1 rounded">pip install -r requirements.txt</code></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="bg-wildguard-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">2</span>
                    <span>Configure environment: <code className="bg-muted px-1 rounded">cp .env.example .env</code></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="bg-wildguard-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">3</span>
                    <span>Add Groq API key to .env file</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="bg-wildguard-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">4</span>
                    <span>Start server: <code className="bg-muted px-1 rounded">python app.py</code></span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Frontend Setup</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="bg-wildguard-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">1</span>
                    <span>Install dependencies: <code className="bg-muted px-1 rounded">npm install</code></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="bg-wildguard-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">2</span>
                    <span>Start development server: <code className="bg-muted px-1 rounded">npm run dev</code></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="bg-wildguard-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">3</span>
                    <span>Open browser: <code className="bg-muted px-1 rounded">http://localhost:3000</code></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="bg-wildguard-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">4</span>
                    <span>Configure backend mode in Settings</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Features Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Platform Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-wildguard-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-8 h-8 text-wildguard-500" />
                </div>
                <h3 className="font-semibold mb-2">AI-Powered Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced machine learning algorithms for wildlife behavior analysis and threat detection
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-wildguard-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-8 h-8 text-wildguard-500" />
                </div>
                <h3 className="font-semibold mb-2">Real-time Monitoring</h3>
                <p className="text-sm text-muted-foreground">
                  Live tracking of wildlife movements with instant threat alerts and ranger notifications
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-wildguard-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-8 h-8 text-wildguard-500" />
                </div>
                <h3 className="font-semibold mb-2">Automated Reporting</h3>
                <p className="text-sm text-muted-foreground">
                  Professional ranger briefings and conservation reports generated automatically
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}