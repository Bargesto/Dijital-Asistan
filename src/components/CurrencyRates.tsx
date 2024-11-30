import { useState, useEffect } from 'react'
import axios from 'axios'
import { DollarSign, Loader } from 'lucide-react'

function CurrencyRates() {
  const [rates, setRates] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get(
          'https://api.exchangerate-api.com/v4/latest/TRY'
        )
        setRates(response.data.rates)
      } catch (err) {
        setError('Döviz kurları alınamadı')
      } finally {
        setLoading(false)
      }
    }

    fetchRates()
    const interval = setInterval(fetchRates, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

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
        <DollarSign className="w-5 h-5 text-white" />
        <h2 className="text-lg font-semibold text-white">Döviz Kurları</h2>
      </div>
      {rates && (
        <div className="space-y-2">
          <div className="flex justify-between text-white">
            <span className="text-white/80">USD/TRY</span>
            <span className="font-semibold">{(1 / rates.USD).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-white">
            <span className="text-white/80">EUR/TRY</span>
            <span className="font-semibold">{(1 / rates.EUR).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-white">
            <span className="text-white/80">GBP/TRY</span>
            <span className="font-semibold">{(1 / rates.GBP).toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default CurrencyRates