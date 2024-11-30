import { useState, useEffect } from 'react'
import { Sparkles } from 'lucide-react'

interface Fact {
  category: string
  content: string
}

const facts: Fact[] = [
  { category: "Sanat", content: "Leonardo da Vinci'nin Mona Lisa tablosu, yaklaşık 83 milyon dolar değerinde sigortalıdır." },
  { category: "Sanat", content: "Van Gogh yaşamı boyunca sadece bir tablo satabilmiştir." },
  { category: "Sanat", content: "Picasso'nun tam adı Pablo Diego José Francisco de Paula Juan Nepomuceno María de los Remedios Cipriano de la Santísima Trinidad Martyr Patricio Clito Ruíz y Picasso'dur." },
  { category: "Teknoloji", content: "İlk email spam'i 1978'de gönderilmiştir." },
  { category: "Teknoloji", content: "YouTube'un ilk videosu 2005'te 'Me at the zoo' başlığıyla yüklenmiştir." },
  { category: "Teknoloji", content: "İlk mouse ahşaptandı ve sadece iki düğmesi vardı." },
  { category: "Eğitim", content: "Finlandiya'da öğretmenlik yapmak için yüksek lisans derecesi gereklidir." },
  { category: "Eğitim", content: "Japonya'da öğrenciler okullarını kendileri temizler." },
  { category: "Eğitim", content: "Dünyanın en eski üniversitesi MS 859'da Fas'ta kurulmuştur." },
  { category: "Kültür", content: "Japonya'da 'Tsundoku' kelimesi, kitap alıp okumadan biriktirme alışkanlığını tanımlar." },
  { category: "Kültür", content: "İzlanda'da soyisimler babadan değil, ebeveynin adından türetilir." },
  { category: "Kültür", content: "Danimarka'da 'Hygge' kavramı, rahatlık ve huzur içinde yaşama sanatını ifade eder." },
]

function FunFacts() {
  const [currentFact, setCurrentFact] = useState<Fact>(facts[0])

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * facts.length)
      setCurrentFact(facts[randomIndex])
    }, 10000) // Her 10 saniyede bir değişir

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col md:flex-row items-center gap-6">
      <div className="flex items-center gap-2 md:w-48 flex-shrink-0">
        <Sparkles className="w-5 h-5 text-white" />
        <h2 className="text-lg font-semibold text-white">Seni Şaşırtalım</h2>
      </div>
      
      <div className="flex-1 min-h-[100px] flex items-center">
        <div className="w-full rounded-lg bg-white/10 p-6">
          <div className="text-sm text-blue-200 mb-2">
            #{currentFact.category}
          </div>
          <p className="text-white text-lg leading-relaxed">
            {currentFact.content}
          </p>
        </div>
      </div>
    </div>
  )
}

export default FunFacts