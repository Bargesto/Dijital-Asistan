import { useState, useRef, useEffect } from 'react'
import { Bot, Send, Loader } from 'lucide-react'
import { GoogleGenerativeAI } from '@google/generative-ai'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

// Initialize Gemini AI outside component to avoid re-initialization
const genAI = new GoogleGenerativeAI('AIzaSyBWwu30nrdPoz8hX_C6FEuinS5CpuOJIgw')
const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    setLoading(true)

    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])

    try {
      // Get response from Gemini
      const result = await model.generateContent(userMessage)
      const response = await result.response
      const text = response.text()

      if (text) {
        // Add AI response to chat
        setMessages(prev => [...prev, { role: 'assistant', content: text }])
      } else {
        throw new Error('Empty response from AI')
      }
    } catch (error) {
      console.error('AI Error:', error)
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin veya internet bağlantınızı kontrol edin.' 
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Bot className="w-5 h-5 text-white" />
        <h2 className="text-lg font-semibold text-white">AI Asistan</h2>
      </div>

      <div className="h-[180px] flex flex-col">
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2 hover-scrollbar"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255, 255, 255, 0.3) transparent'
          }}
        >
          {messages.length === 0 && (
            <div className="text-white/50 text-center py-4">
              Merhaba! Size nasıl yardımcı olabilirim?
            </div>
          )}
          
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-3 py-1.5 text-sm transition-all duration-200 hover:scale-[1.02] ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/20 backdrop-blur-sm text-white'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5">
                <Loader className="w-4 h-4 animate-spin text-white" />
              </div>
            </div>
          )}
        </div>

        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Bir soru sorun..."
            className="flex-1 px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:hover:bg-blue-500"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default AIAssistant