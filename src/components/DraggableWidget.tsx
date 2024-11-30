import { ReactNode } from 'react'
import { Draggable } from 'react-beautiful-dnd'

interface DraggableWidgetProps {
  id: string
  index: number
  children: ReactNode
}

function DraggableWidget({ id, index, children }: DraggableWidgetProps) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="glassmorphic rounded-xl p-6 transition-transform hover:scale-[1.02]"
        >
          {children}
        </div>
      )}
    </Draggable>
  )
}

export default DraggableWidget