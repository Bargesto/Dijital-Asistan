import { useState, useEffect } from 'react'
import { CheckSquare, Plus, Trash2 } from 'lucide-react'

interface Todo {
  id: number
  text: string
  completed: boolean
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos')
    return saved ? JSON.parse(saved) : []
  })
  const [newTodo, setNewTodo] = useState('')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo.trim(), completed: false }])
      setNewTodo('')
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <CheckSquare className="w-5 h-5 text-white" />
        <h2 className="text-lg font-semibold text-white">Yapılacaklar</h2>
      </div>

      <form onSubmit={addTodo} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Yeni görev ekle..."
          className="flex-1 px-3 py-1.5 text-sm rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
        />
        <button
          type="submit"
          className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all hover:scale-105 active:scale-95"
        >
          <Plus className="w-4 h-4" />
        </button>
      </form>

      <div className="space-y-1.5">
        {todos.map(todo => (
          <div
            key={todo.id}
            className="group flex items-center gap-3 px-3 py-2 hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            <div 
              className="relative flex items-center"
              onClick={() => toggleTodo(todo.id)}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="w-4 h-4 border-2 border-white/30 rounded-md bg-transparent checked:bg-blue-500 checked:border-blue-500 transition-colors cursor-pointer"
              />
            </div>
            
            <span 
              className={`flex-1 text-sm text-white transition-all duration-200 ${
                todo.completed 
                  ? 'line-through opacity-50' 
                  : 'opacity-90 group-hover:opacity-100'
              }`}
            >
              {todo.text}
            </span>
            
            <button
              onClick={() => deleteTodo(todo.id)}
              className="opacity-0 group-hover:opacity-100 text-white/70 hover:text-red-400 transition-all duration-200"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TodoList