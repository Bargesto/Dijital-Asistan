import { useState, useEffect, useRef } from 'react'
import { Pencil, Check, X } from 'lucide-react'

interface EditableTextProps {
  value: string
  onSave: (newValue: string) => void
  className?: string
}

function EditableText({ value, onSave, className = '' }: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const handleSave = () => {
    const trimmedValue = editValue.trim()
    if (trimmedValue && trimmedValue !== value) {
      onSave(trimmedValue)
    } else {
      setEditValue(value)
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditValue(value)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-white/10 text-white px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30"
        />
        <button
          onClick={handleSave}
          className="p-1 hover:bg-white/10 rounded-lg transition-colors"
          title="Kaydet"
        >
          <Check className="w-4 h-4 text-green-400" />
        </button>
        <button
          onClick={handleCancel}
          className="p-1 hover:bg-white/10 rounded-lg transition-colors"
          title="İptal"
        >
          <X className="w-4 h-4 text-red-400" />
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <span className={className}>{value}</span>
      <button
        onClick={() => setIsEditing(true)}
        className="p-1 hover:bg-white/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
        title="Düzenle"
      >
        <Pencil className="w-4 h-4 text-white/70" />
      </button>
    </div>
  )
}

export default EditableText