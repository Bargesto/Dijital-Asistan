import { useState, useRef, useEffect } from 'react'
import { Music, Play, Pause, SkipForward, Volume2, VolumeX } from 'lucide-react'

interface Song {
  name: string
  url: string
}

function MusicPlayer() {
  const [songs, setSongs] = useState<Song[]>([])
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [dragActive, setDragActive] = useState(false)

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      
      const timeUpdateHandler = () => {
        setCurrentTime(audio.currentTime)
      }
      
      const loadedDataHandler = () => {
        setDuration(audio.duration)
      }

      audio.addEventListener('timeupdate', timeUpdateHandler)
      audio.addEventListener('loadeddata', loadedDataHandler)

      return () => {
        audio.removeEventListener('timeupdate', timeUpdateHandler)
        audio.removeEventListener('loadeddata', loadedDataHandler)
      }
    }
  }, [audioRef.current])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const time = Number(e.target.value)
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = Array.from(e.dataTransfer.files)
    const audioFiles = files.filter(file => file.type.startsWith('audio/'))

    if (audioFiles.length > 0) {
      const newSongs = audioFiles.map(file => ({
        name: file.name,
        url: URL.createObjectURL(file)
      }))
      setSongs(prev => [...prev, ...newSongs])
    }
  }

  const togglePlay = () => {
    if (songs.length === 0) return

    if (isPlaying) {
      audioRef.current?.pause()
    } else {
      audioRef.current?.play()
    }
    setIsPlaying(!isPlaying)
  }

  const nextSong = () => {
    if (songs.length === 0) return
    setCurrentSongIndex((prev) => (prev + 1) % songs.length)
    if (isPlaying) {
      setTimeout(() => {
        audioRef.current?.play()
      }, 0)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Music className="w-5 h-5 text-white" />
        <h2 className="text-lg font-semibold text-white">Müzik Çalar</h2>
      </div>

      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`
          h-[180px] flex flex-col justify-between
          ${songs.length === 0 ? 'justify-center' : ''}
          rounded-lg border-2 border-dashed transition-colors
          ${dragActive 
            ? 'border-blue-400 bg-white/10' 
            : 'border-white/30 hover:border-white/50'
          }
        `}
      >
        {songs.length === 0 ? (
          <div className="text-center text-white/70 p-4">
            <p>Müzik dosyalarını sürükleyip bırakın</p>
            <p className="text-sm mt-1">MP3, WAV formatları desteklenir</p>
          </div>
        ) : (
          <>
            <div className="p-4">
              <div className="text-white text-sm truncate mb-2">
                {songs[currentSongIndex]?.name || 'Şarkı seçilmedi'}
              </div>

              <audio
                ref={audioRef}
                src={songs[currentSongIndex]?.url}
                onEnded={nextSong}
                className="hidden"
              />

              <input
                type="range"
                value={currentTime}
                min={0}
                max={duration || 0}
                onChange={handleSeek}
                className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              
              <div className="flex justify-between text-xs text-white/70 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 p-4 border-t border-white/10">
              <button
                onClick={togglePlay}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-white" />
                ) : (
                  <Play className="w-6 h-6 text-white" />
                )}
              </button>

              <button
                onClick={nextSong}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <SkipForward className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={toggleMute}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-6 h-6 text-white" />
                ) : (
                  <Volume2 className="w-6 h-6 text-white" />
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default MusicPlayer