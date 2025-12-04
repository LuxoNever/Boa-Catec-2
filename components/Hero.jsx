'use client'
import { useEffect, useState } from 'react'
import FlightSearch from './FlightSearch'

// Componente TextGenerateEffect personalizado
const TextGenerateEffect = ({ words, className = "" }) => {
  const [currentText, setCurrentText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < words.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + words[currentIndex])
        setCurrentIndex(prevIndex => prevIndex + 1)
      }, 30) // Velocidad de escritura (ms)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, words])

  return (
    <span className={`${className} inline-block`}>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

export default function Hero() {
  const [textKey, setTextKey] = useState(0)
  
  // Reiniciar la animación cuando se monta el componente
  useEffect(() => {
    setTextKey(prev => prev + 1)
  }, [])

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center gradient-boa-radial overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Cloud animation elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full section-container">
        <div className="text-center mb-16">
          {/* Airplane Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-boa-yellow to-orange-400 rounded-full mb-6 shadow-2xl animate-float">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </div>

          {/* Hero Title con efecto de máquina de escribir */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 h-24 md:h-28 flex items-center justify-center">
            <span className="text-white">
              <TextGenerateEffect key={textKey} words="Vuela con " className="inline" />
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-boa-yellow to-yellow-300 ml-2">
              <TextGenerateEffect key={textKey + 1} words="BOA" className="font-bold" />
            </span>
          </h1>

          {/* Subtítulo con efecto */}
          <p className="text-xl md:text-2xl text-blue-100 mb-4 max-w-3xl mx-auto h-12 flex items-center justify-center">
            <TextGenerateEffect 
              key={textKey + 2}
              words="Conectando Bolivia con el mundo" 
              className="font-light tracking-wide"
            />
          </p>
          
          {/* Descripción con efecto */}
          <p className="text-lg text-blue-200 max-w-2xl mx-auto h-20 flex items-center justify-center">
            <TextGenerateEffect 
              key={textKey + 3}
              words="Descubre nuestros destinos nacionales e internacionales con la mejor atención y servicio" 
              className="font-light opacity-90"
            />
          </p>
        </div>

        {/* Flight Search Component */}
        <FlightSearch />
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}