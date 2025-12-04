'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Promotions() {
    const [timeLeft, setTimeLeft] = useState({
        days: 5,
        hours: 12,
        minutes: 30,
        seconds: 45
    })

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 }
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
                } else if (prev.hours > 0) {
                    return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
                } else if (prev.days > 0) {
                    return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
                }
                return prev
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const promotions = [
        {
            title: 'Oferta Flash: La Paz - Santa Cruz',
            discount: '35% OFF',
            originalPrice: '$538',
            currentPrice: '$350',
            description: '¡Solo ida y vuelta! Asientos limitados',
            validUntil: 'Termina en 48 horas',
            color: 'from-boa-blue via-blue-600 to-cyan-600',
            accentColor: 'yellow',
            route: '/vuelos?origin=LPB&destination=VVI',
            badge: '🔥 MÁS VENDIDO',
            icon: '✈️',
            seatsLeft: 12
        },
        {
            title: 'Descuento Exclusivo Cochabamba',
            discount: '40% OFF',
            originalPrice: '$420',
            currentPrice: '$252',
            description: 'Vuelos nacionales en clase económica premium',
            validUntil: 'Últimos cupos disponibles',
            color: 'from-blue-500 via-sky-500 to-cyan-400',
            accentColor: 'yellow',
            route: '/vuelos',
            badge: '⚡ SUPER OFERTA',
            icon: '🎯',
            seatsLeft: 8
        },
        {
            title: 'Internacionales Premium',
            discount: '30% OFF',
            originalPrice: '$850',
            currentPrice: '$595',
            description: 'Buenos Aires, Lima, São Paulo - Clase Ejecutiva',
            validUntil: 'Válido solo este fin de semana',
            color: 'from-indigo-600 via-blue-700 to-boa-blue',
            accentColor: 'yellow',
            route: '/destinos',
            badge: '⭐ EXCLUSIVO',
            icon: '🌎',
            seatsLeft: 6
        },
    ]

    const getAccentColor = (color) => {
    return color === 'yellow' 
        ? 'from-boa-yellow to-yellow-500'
        : 'from-boa-blue to-blue-600';
}

    return (
        <section id="promociones" className="section-container bg-gradient-to-br from-white via-blue-50/30 to-white overflow-hidden">
            {/* Fondo decorativo sutil */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-r from-blue-100/20 to-cyan-100/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-50/20 to-sky-100/20 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 text-center mb-16">
                <div className="inline-flex items-center justify-center gap-3 mb-4">
                    <div className="w-12 h-1 bg-gradient-to-r from-transparent to-boa-blue rounded-full"></div>
                    <span className="text-sm font-bold tracking-widest text-boa-blue uppercase">
                        Ofertas Limitadas
                    </span>
                    <div className="w-12 h-1 bg-gradient-to-l from-transparent to-boa-blue rounded-full"></div>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    Ahorra hasta <span className="text-transparent bg-clip-text bg-gradient-to-r from-boa-blue to-cyan-600">40%</span> en tu vuelo
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
                    Descuentos exclusivos por tiempo limitado - ¡Reserva ahora antes de que se agoten!
                </p>

                {/* Countdown Timer Profesional */}
                <div className="inline-flex flex-col items-center gap-8 bg-white rounded-3xl shadow-xl shadow-blue-100/50 p-8 mb-12 border border-blue-100">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <svg className="w-6 h-6 text-boa-blue" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            <span className="text-lg font-bold text-boa-blue">OFERTA TERMINA EN</span>
                        </div>
                        <p className="text-gray-600 text-sm">¡Apresúrate! Estas promociones no durarán mucho</p>
                    </div>
                    
                    <div className="flex items-center gap-4 md:gap-8">
                        {Object.entries(timeLeft).map(([unit, value]) => (
                            <div key={unit} className="text-center">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-boa-blue/20 to-cyan-500/20 blur-lg rounded-xl"></div>
                                    <div className="relative bg-gradient-to-br from-white to-blue-50 rounded-xl p-4 min-w-[80px] shadow-lg border border-blue-100">
                                        <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-boa-blue to-cyan-600 bg-clip-text text-transparent">
                                            {String(value).padStart(2, '0')}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2 text-sm font-semibold uppercase tracking-wider text-gray-700">
                                    {unit === 'days' ? 'Días' : 
                                     unit === 'hours' ? 'Horas' : 
                                     unit === 'minutes' ? 'Minutos' : 'Segundos'}
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="w-full max-w-md bg-gradient-to-r from-transparent via-blue-200/30 to-transparent h-1 rounded-full"></div>
                </div>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {promotions.map((promo, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ 
                            duration: 0.6, 
                            delay: index * 0.2,
                            type: "spring",
                            stiffness: 100
                        }}
                        viewport={{ once: true }}
                        whileHover={{ 
                            y: -12,
                            scale: 1.02,
                            transition: { duration: 0.2 }
                        }}
                        className="relative group"
                    >
                        {/* Badge destacado con acento amarillo */}
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                            <div className={`bg-gradient-to-r ${getAccentColor(promo.accentColor)} text-white font-bold px-6 py-2 rounded-full shadow-lg whitespace-nowrap flex items-center gap-2`}>
                                <span className="text-white">⭐</span>
                                {promo.badge}
                                <span className="text-white">⭐</span>
                            </div>
                        </div>

                        {/* Tarjeta de promoción profesional */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-white to-blue-50/50 rounded-3xl shadow-xl shadow-blue-100/30 h-full border border-blue-100">
                            {/* Cabecera con gradiente azul */}
                            <div className={`relative bg-gradient-to-br ${promo.color} p-8 text-white overflow-hidden`}>
                                {/* Efecto de brillo sutil */}
                                <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10"></div>
                                
                                {/* Icono decorativo */}
                                <div className="absolute -top-10 -right-10 text-9xl opacity-10 transform rotate-12">
                                    {promo.icon}
                                </div>
                                
                                {/* Contenido principal */}
                                <div className="relative z-10">
                                    {/* Descuento con acento amarillo */}
                                    <div className="inline-block bg-gradient-to-r from-boa-yellow to-yellow-500 backdrop-blur-sm px-6 py-3 rounded-2xl text-xl font-black mb-6 shadow-lg">
                                        {promo.discount}
                                    </div>
                                    
                                    <h3 className="text-2xl font-bold mb-4 leading-tight">{promo.title}</h3>
                                    
                                    {/* Precios con diseño limpio */}
                                    <div className="flex items-baseline gap-3 mb-4">
                                        <span className="text-4xl font-black">{promo.currentPrice}</span>
                                        <span className="text-lg line-through opacity-70">{promo.originalPrice}</span>
                                        <div className="bg-gradient-to-r from-boa-yellow/20 to-yellow-500/20 text-boa-dark text-xs font-bold px-3 py-1 rounded-full border border-yellow-200">
                                            AHORRA ${parseInt(promo.originalPrice.replace('$', '')) - parseInt(promo.currentPrice.replace('$', ''))}
                                        </div>
                                    </div>
                                    
                                    <p className="text-white/90 text-lg font-medium">{promo.description}</p>
                                </div>
                            </div>

                            {/* Contenido inferior */}
                            <div className="p-8">
                                {/* Tiempo restante con diseño limpio */}
                                <div className="flex items-center gap-3 text-gray-700 mb-6 bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100">
                                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-boa-blue to-blue-600 rounded-lg">
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">{promo.validUntil}</div>
                                        <div className="text-sm text-gray-600">¡No dejes pasar esta oportunidad!</div>
                                    </div>
                                </div>

                                {/* Beneficios con iconos azules */}
                                <div className="space-y-3 mb-8">
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <div className="w-6 h-6 bg-gradient-to-r from-boa-blue to-blue-500 rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-sm">Cancelación gratuita</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-sm">Equipaje incluido</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <div className="w-6 h-6 bg-gradient-to-r from-cyan-500 to-sky-500 rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-sm">Selección de asientos</span>
                                    </div>
                                </div>

                                {/* Botón profesional con gradiente azul */}
                                <Link href={promo.route}>
                                    <button className="w-full group relative overflow-hidden bg-gradient-to-r from-boa-blue via-blue-600 to-cyan-600 text-white font-bold py-4 px-8 rounded-xl hover:shadow-lg hover:shadow-blue-200 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3">
                                        <span className="relative z-10 flex items-center justify-center gap-3">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                            </svg>
                                            <span className="text-lg">Reservar ahora</span>
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </button>
                                </Link>
                                
                                {/* Cupón limitado con acento amarillo */}
                                <div className="text-center mt-6">
                                    <div className="inline-flex items-center gap-2 text-sm text-gray-600 bg-gradient-to-r from-yellow-50 to-amber-50 px-4 py-2 rounded-full border border-yellow-100">
                                        <svg className="w-4 h-4 text-boa-yellow" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" />
                                        </svg>
                                        <span className="font-semibold text-gray-800">Solo {promo.seatsLeft} cupos restantes</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Efecto de sombra al hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-cyan-500/0 to-blue-500/0 group-hover:via-cyan-500/5 group-hover:to-blue-500/5 rounded-3xl transition-all duration-300 -z-10 blur-lg"></div>
                    </motion.div>
                ))}
            </div>

            {/* Llamada a la acción profesional */}
            <div className="relative z-10 text-center mt-16">
                <div className="inline-flex flex-col md:flex-row items-center gap-6 bg-gradient-to-r from-white to-blue-50 px-8 py-6 rounded-2xl shadow-lg shadow-blue-100/50 border border-blue-200">
                    <div className="w-12 h-12 bg-gradient-to-br from-boa-blue to-blue-600 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="text-center md:text-left">
                        <p className="text-gray-800 font-bold text-lg">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-boa-blue to-cyan-600">Todas las promociones incluyen garantía</span>
                        </p>
                        <p className="text-gray-600">Asistencia 24/7 + Flexibilidad de cambios + Garantía de precio más bajo</p>
                    </div>
                    <Link href="/vuelos">
                        <button className="bg-gradient-to-r from-boa-yellow to-yellow-500 hover:from-yellow-500 hover:to-amber-500 text-boa-dark font-bold px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
                            Ver todos los vuelos
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    )
}