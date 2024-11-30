import { useState } from 'react'
import { UserCircle } from 'lucide-react'

interface WelcomeProps {
  onNameSubmit: (name: string) => void
}

function Welcome({ onNameSubmit }: WelcomeProps) {
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onNameSubmit(name.trim())
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full glassmorphic rounded-xl p-8">
        <div className="flex flex-col items-center gap-6">
          <UserCircle className="w-20 h-20 text-white" />
          <h1 className="text-3xl font-bold text-white">Dijital Asistan</h1>
          <p className="text-white/90 text-center max-w-md">
            Başlamak için lütfen isminizi girin
          </p>
          
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="İsminiz"
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              required
            />

            <button
              type="submit"
              className="w-full mt-6 bg-white/20 text-white py-2 rounded-lg hover:bg-white/30 transition-colors border border-white/30"
            >
              Başla
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Welcome