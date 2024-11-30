import { PanelLeft, Settings } from 'lucide-react'
import { AVAILABLE_WIDGETS } from '../config/widgets'

interface SidebarProps {
  activeWidgets: string[]
  onToggleWidget: (widgetId: string) => void
  onToggleSidebar: () => void
  isOpen: boolean
}

function Sidebar({ activeWidgets, onToggleWidget, onToggleSidebar, isOpen }: SidebarProps) {
  return (
    <div className={`
      fixed left-0 top-0 h-screen bg-black/30 backdrop-blur-lg
      transition-all duration-300 z-50
      border-r border-white/10
      ${isOpen ? 'w-64' : 'w-16'}
    `}>
      <button
        onClick={onToggleSidebar}
        className="absolute right-0 top-6 -mr-3 bg-white/10 rounded-full p-1.5 hover:bg-white/20 transition-colors"
      >
        <PanelLeft className={`w-4 h-4 text-white transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <div className="p-4 flex items-center gap-3 border-b border-white/10">
        <Settings className="w-6 h-6 text-white" />
        <span className={`text-white font-semibold transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          Widget Yönetimi
        </span>
      </div>

      <div className="py-4">
        {AVAILABLE_WIDGETS.map((widget) => (
          <button
            key={widget.id}
            onClick={() => onToggleWidget(widget.id)}
            className={`
              w-full px-4 py-3 flex items-center gap-3
              hover:bg-white/10 transition-colors
              ${activeWidgets.includes(widget.id) ? 'text-blue-400' : 'text-white/70'}
            `}
          >
            {widget.icon}
            <span className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
              {widget.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Sidebar