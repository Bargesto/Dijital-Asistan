import { Cloud } from 'lucide-react'

// Declare the window object extension for the widget script
declare global {
  interface Window {
    _wordpressWeatherWidget?: any
  }
}

function Weather() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Cloud className="w-5 h-5 text-white" />
        <h2 className="text-lg font-semibold text-white">Hava Durumu</h2>
      </div>

      {/* Weather Widget */}
      <div>
        <div 
          id="ww_a5377a49e1b47" 
          v='1.3' 
          loc='id' 
          a='{"t":"horizontal","lang":"tr","sl_lpl":1,"ids":[],"font":"Arial","sl_ics":"one_a","sl_sot":"celsius","cl_bkg":"image","cl_font":"#FFFFFF","cl_cloud":"#FFFFFF","cl_persp":"#81D4FA","cl_sun":"#FFC107","cl_moon":"#FFC107","cl_thund":"#FF5722","el_phw":3}'
          className="w-full"
        >
          <a 
            href="https://oneweather.org/tr/istanbul/15_days/" 
            id="ww_a5377a49e1b47_u" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 hover:text-blue-400 transition-colors"
          >
            Daha fazla hava durumu tahmini
          </a>
        </div>

        <script async src="https://app3.weatherwidget.org/js/?id=ww_a5377a49e1b47"></script>
      </div>
    </div>
  )
}

export default Weather