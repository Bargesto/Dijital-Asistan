import { useState, useCallback } from 'react'
import Clock from './Clock'
import Weather from './Weather'
import TodoList from './TodoList'
import CurrencyRates from './CurrencyRates'
import NewsWidget from './NewsWidget'
import AIAssistant from './AIAssistant'
import MusicPlayer from './MusicPlayer'
import EditableText from './EditableText'
import { Layout, Maximize2, Minimize2 } from 'lucide-react'

interface DashboardProps {
  userName: string
  onNameChange: (newName: string) => void
}

function Dashboard({ userName, onNameChange }: DashboardProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }, [])

  const WidgetContainer = ({ children }: { children: React.ReactNode }) => (
    <div className="widget-container">
      {children}
    </div>
  )

  return (
    <div className="min-h-screen">
      <div className="p-6">
        <header className="max-w-7xl mx-auto flex items-center justify-between mb-8">
          <div className="flex items-center gap-3 group">
            <Layout className="w-8 h-8 text-white" />
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              Hoş geldiniz,{' '}
              <EditableText
                value={userName}
                onSave={onNameChange}
                className="font-bold"
              />
            </h1>
          </div>
          
          <button
            onClick={toggleFullscreen}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title={isFullscreen ? "Tam ekrandan çık" : "Tam ekran yap"}
          >
            {isFullscreen ? (
              <Minimize2 className="w-5 h-5 text-white" />
            ) : (
              <Maximize2 className="w-5 h-5 text-white" />
            )}
          </button>
        </header>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <WidgetContainer>
              <Clock />
            </WidgetContainer>
            <WidgetContainer>
              <Weather />
            </WidgetContainer>
            <WidgetContainer>
              <CurrencyRates />
            </WidgetContainer>
            <WidgetContainer>
              <AIAssistant />
            </WidgetContainer>
            <WidgetContainer>
              <MusicPlayer />
            </WidgetContainer>
            <WidgetContainer>
              <TodoList />
            </WidgetContainer>
            <WidgetContainer>
              <NewsWidget />
            </WidgetContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard