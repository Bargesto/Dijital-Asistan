import { useState, useEffect } from 'react'
import { Newspaper, Loader, ExternalLink } from 'lucide-react'
import axios from 'axios'

interface NewsItem {
  title: string
  link: string
  pubDate: string
}

function NewsWidget() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          'https://api.rss2json.com/v1/api.json?rss_url=https://www.aa.com.tr/tr/rss/default?cat=guncel'
        )
        
        setNews(response.data.items.slice(0, 5).map((item: any) => ({
          title: item.title,
          link: item.link,
          pubDate: new Date(item.pubDate).toLocaleTimeString('tr-TR', {
            hour: '2-digit',
            minute: '2-digit'
          })
        })))
        setError('')
      } catch (err) {
        setError('Haberler alınamadı')
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
    const newsInterval = setInterval(fetchNews, 5 * 60 * 1000) // Fetch new news every 5 minutes
    return () => clearInterval(newsInterval)
  }, [])

  // Auto-rotate news every 5 seconds
  useEffect(() => {
    if (news.length === 0) return

    const rotationInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length)
    }, 5000)

    return () => clearInterval(rotationInterval)
  }, [news.length])

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Loader className="w-6 h-6 text-white animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <p className="text-red-300">{error}</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Newspaper className="w-5 h-5 text-white" />
        <h2 className="text-lg font-semibold text-white">Son Dakika</h2>
      </div>
      
      {news.length > 0 && (
        <div className="space-y-3">
          <a
            href={news[currentIndex].link}
            target="_blank"
            rel="noopener noreferrer"
            className="block group min-h-[80px]"
          >
            <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/10 transition-all">
              <div className="flex-1">
                <p className="text-white group-hover:text-blue-200 transition-colors">
                  {news[currentIndex].title}
                </p>
                <span className="text-sm text-white/70">{news[currentIndex].pubDate}</span>
              </div>
              <ExternalLink className="w-4 h-4 text-white/70 group-hover:text-blue-200 transition-colors mt-1 flex-shrink-0" />
            </div>
          </a>

          {/* Navigation dots */}
          <div className="flex justify-center gap-1">
            {news.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-white scale-125'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to news ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default NewsWidget