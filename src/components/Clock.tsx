import { useState, useEffect, useRef } from 'react'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { Clock as ClockIcon, Timer, Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react'

function Clock() {
  const [time, setTime] = useState(new Date())
  const [countdown, setCountdown] = useState<number | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [hours, setHours] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')
  const [isMuted, setIsMuted] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (countdown === 0) {
      setIsRunning(false)
      if (!isMuted && audioRef.current) {
        audioRef.current.play()
      }
    }

    if (isRunning && countdown !== null && countdown > 0) {
      timerRef.current = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [countdown, isRunning, isMuted])

  const startTimer = () => {
    const hoursNum = parseInt(hours) || 0
    const minutesNum = parseInt(minutes) || 0
    const secondsNum = parseInt(seconds) || 0
    const totalSeconds = hoursNum * 3600 + minutesNum * 60 + secondsNum

    if (totalSeconds > 0) {
      setCountdown(totalSeconds)
      setIsRunning(true)
    }
  }

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setCountdown(null)
    setHours('')
    setMinutes('')
    setSeconds('')
  }

  const formatCountdown = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <ClockIcon className="w-5 h-5 text-white" />
        <h2 className="text-lg font-semibold text-white">Saat</h2>
      </div>

      <div className="space-y-3">
        <div>
          <div className="text-3xl font-bold text-white">
            {format(time, 'HH:mm:ss')}
          </div>
          <div className="text-white/80 text-sm mt-1">
            {format(time, 'd MMMM yyyy, EEEE', { locale: tr })}
          </div>
        </div>

        <div className="border-t border-white/10 pt-3">
          <div className="flex items-center gap-2 mb-2">
            <Timer className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">Geri Sayım</span>
            <button
              onClick={toggleMute}
              className="ml-auto text-white/70 hover:text-white transition-colors"
              title={isMuted ? "Sesi aç" : "Sesi kapat"}
            >
              {isMuted ? (
                <VolumeX className="w-3 h-3" />
              ) : (
                <Volume2 className="w-3 h-3" />
              )}
            </button>
          </div>

          {countdown === null ? (
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="00"
                min="0"
                max="23"
                className="w-12 px-1 py-0.5 bg-white/20 rounded text-white text-center placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/30 text-sm"
              />
              <span className="text-white/70">:</span>
              <input
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                placeholder="00"
                min="0"
                max="59"
                className="w-12 px-1 py-0.5 bg-white/20 rounded text-white text-center placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/30 text-sm"
              />
              <span className="text-white/70">:</span>
              <input
                type="number"
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
                placeholder="00"
                min="0"
                max="59"
                className="w-12 px-1 py-0.5 bg-white/20 rounded text-white text-center placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/30 text-sm"
              />
              <button
                onClick={startTimer}
                className="ml-1 p-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                <Play className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="text-xl font-mono text-white">
                {formatCountdown(countdown)}
              </div>
              <div className="flex gap-1">
                <button
                  onClick={toggleTimer}
                  className="p-1 bg-white/20 rounded hover:bg-white/30 transition-colors"
                >
                  {isRunning ? (
                    <Pause className="w-3 h-3 text-white" />
                  ) : (
                    <Play className="w-3 h-3 text-white" />
                  )}
                </button>
                <button
                  onClick={resetTimer}
                  className="p-1 bg-white/20 rounded hover:bg-white/30 transition-colors"
                >
                  <RotateCcw className="w-3 h-3 text-white" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hidden audio element for timer completion sound */}
      <audio ref={audioRef}>
        <source src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3" type="audio/mpeg" />
      </audio>
    </div>
  )
}

export default Clock