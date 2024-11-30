import { GripHorizontal } from 'lucide-react'

interface ResizeHandleProps {
  onResize: (deltaY: number) => void
}

function ResizeHandle({ onResize }: ResizeHandleProps) {
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    const startY = e.pageY

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaY = moveEvent.pageY - startY
      onResize(deltaY)
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-6 flex items-center justify-center cursor-ns-resize hover:bg-white/10 transition-colors rounded-b-xl"
      onMouseDown={handleMouseDown}
    >
      <GripHorizontal className="w-4 h-4 text-white/50" />
    </div>
  )
}

export default ResizeHandle