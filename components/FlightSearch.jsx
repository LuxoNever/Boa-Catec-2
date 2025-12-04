'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

export default function FlightSearch() {
    const [tripType, setTripType] = useState('roundtrip')
    const { register, handleSubmit, formState: { errors } } = useForm()
    const router = useRouter()

    const cities = [
        { code: 'LPB', name: 'La Paz' },
        { code: 'SRZ', name: 'Santa Cruz' },
        { code: 'CBB', name: 'Cochabamba' },
        { code: 'SRE', name: 'Sucre' },
        { code: 'TJA', name: 'Tarija' },
        { code: 'TDD', name: 'Trinidad' },
    ]

    const onSubmit = (data) => {
        // Build query string with search parameters
        const params = new URLSearchParams({
            origin: data.origin,
            destination: data.destination,
            departureDate: data.departureDate,
            ...(tripType === 'roundtrip' && data.returnDate && { returnDate: data.returnDate }),
            passengers: data.passengers || '1',
            class: data.class || 'economy',
            tripType: tripType
        })

        // Navigate to vuelos page with parameters
        router.push(`/vuelos?${params.toString()}`)
    }

    return (
        <div className="bg-gradient-to-br from-white via-blue-50/30 to-white rounded-3xl shadow-2xl shadow-blue-100/50 p-8 md:p-10 max-w-6xl mx-auto -mt-16 relative z-20 border border-blue-100/50">
    {/* Encabezado elegante */}
    <div className="text-center mb-10">
        <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-1 bg-gradient-to-r from-transparent via-boa-blue to-transparent rounded-full"></div>
            <span className="text-sm font-semibold tracking-widest text-boa-blue uppercase">
                Reserva tu vuelo
            </span>
            <div className="w-10 h-1 bg-gradient-to-r from-transparent via-boa-blue to-transparent rounded-full"></div>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Encuentra tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-boa-blue to-cyan-600">vuelo perfecto</span>
        </h2>
        <p className="text-gray-500">Viaja con comodidad y seguridad a los mejores destinos</p>
    </div>

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Trip Type Toggle - Elegante */}
        <div className="flex gap-2 p-2 bg-gray-50 rounded-xl max-w-md mx-auto">
            <button
                type="button"
                onClick={() => setTripType('roundtrip')}
                className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${tripType === 'roundtrip'
                        ? 'bg-gradient-to-r from-boa-blue to-cyan-600 text-white shadow-lg shadow-blue-200'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                    }`}
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                Ida y vuelta
            </button>
            <button
                type="button"
                onClick={() => setTripType('oneway')}
                className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${tripType === 'oneway'
                        ? 'bg-gradient-to-r from-boa-blue to-cyan-600 text-white shadow-lg shadow-blue-200'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                    }`}
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                Solo ida
            </button>
        </div>

        {/* Flight Search Fields - Diseño Aeroportuario */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Origin */}
            <div className="relative group">
                <label htmlFor="origin" className="block text-sm font-semibold text-gray-700 mb-3 pl-1">
                    <span className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-boa-blue" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        Origen
                    </span>
                </label>
                <div className="relative">
                    <select
                        id="origin"
                        {...register('origin', { required: 'Seleccione origen' })}
                        className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-boa-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 appearance-none hover:border-gray-300"
                    >
                        <option value="">Seleccionar ciudad</option>
                        {cities.map((city) => (
                            <option key={city.code} value={city.code}>
                                {city.name} ({city.code})
                            </option>
                        ))}
                    </select>
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-boa-blue">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                    </div>
                </div>
                {errors.origin && (
                    <p className="mt-2 text-sm text-red-500 flex items-center gap-1 pl-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.origin.message}
                    </p>
                )}
            </div>

            {/* Destination */}
            <div className="relative group">
                <label htmlFor="destination" className="block text-sm font-semibold text-gray-700 mb-3 pl-1">
                    <span className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-boa-blue" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        Destino
                    </span>
                </label>
                <div className="relative">
                    <select
                        id="destination"
                        {...register('destination', { required: 'Seleccione destino' })}
                        className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-boa-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 appearance-none hover:border-gray-300"
                    >
                        <option value="">Seleccionar ciudad</option>
                        {cities.map((city) => (
                            <option key={city.code} value={city.code}>
                                {city.name} ({city.code})
                            </option>
                        ))}
                    </select>
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-boa-blue">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                    </div>
                </div>
                {errors.destination && (
                    <p className="mt-2 text-sm text-red-500 flex items-center gap-1 pl-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.destination.message}
                    </p>
                )}
            </div>

            {/* Departure Date */}
            <div className="relative group">
                <label htmlFor="departureDate" className="block text-sm font-semibold text-gray-700 mb-3 pl-1">
                    <span className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-boa-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Salida
                    </span>
                </label>
                <div className="relative">
                    <input
                        id="departureDate"
                        type="date"
                        {...register('departureDate', { required: 'Seleccione fecha' })}
                        className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-boa-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 hover:border-gray-300"
                        min={new Date().toISOString().split('T')[0]}
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-boa-blue">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
                {errors.departureDate && (
                    <p className="mt-2 text-sm text-red-500 flex items-center gap-1 pl-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.departureDate.message}
                    </p>
                )}
            </div>

            {/* Return Date */}
            {tripType === 'roundtrip' && (
                <div className="relative group">
                    <label htmlFor="returnDate" className="block text-sm font-semibold text-gray-700 mb-3 pl-1">
                        <span className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-boa-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                            Regreso
                        </span>
                    </label>
                    <div className="relative">
                        <input
                            id="returnDate"
                            type="date"
                            {...register('returnDate', { required: tripType === 'roundtrip' && 'Seleccione fecha' })}
                            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-boa-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 hover:border-gray-300"
                            min={new Date().toISOString().split('T')[0]}
                        />
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-boa-blue">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    {errors.returnDate && (
                        <p className="mt-2 text-sm text-red-500 flex items-center gap-1 pl-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.returnDate.message}
                        </p>
                    )}
                </div>
            )}
        </div>

        {/* Passengers and Class - Diseño Compacto y Elegante */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Passengers */}
            <div className="relative">
                <label htmlFor="passengers" className="block text-sm font-semibold text-gray-700 mb-3 pl-1">
                    <span className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-boa-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 5.197a9 9 0 00-9-9m9 9a9 9 0 01-9-9m9 9v1a9 9 0 01-9 9m0-9v1a9 9 0 009 9m0 0v1a9 9 0 01-9 9m0 0a9 9 0 01-9-9" />
                        </svg>
                        Pasajeros
                    </span>
                </label>
                <select
                    id="passengers"
                    {...register('passengers')}
                    className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-boa-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 appearance-none hover:border-gray-300"
                >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <option key={num} value={num}>
                            {num} {num === 1 ? 'Pasajero' : 'Pasajeros'}
                        </option>
                    ))}
                </select>
                <div className="absolute left-4 bottom-4 text-boa-blue">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                </div>
            </div>

            {/* Class */}
            <div className="relative">
                <label htmlFor="class" className="block text-sm font-semibold text-gray-700 mb-3 pl-1">
                    <span className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-boa-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                        </svg>
                        Clase
                    </span>
                </label>
                <select
                    id="class"
                    {...register('class')}
                    className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-boa-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 appearance-none hover:border-gray-300"
                >
                    <option value="economy">Económica</option>
                    <option value="business">Ejecutiva</option>
                </select>
                <div className="absolute left-4 bottom-4 text-boa-blue">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>

            {/* Search Button - Llamativo */}
            <div className="flex items-end">
                <button
                    type="submit"
                    className="w-full group bg-gradient-to-r from-boa-blue to-cyan-600 text-white font-bold py-5 px-8 rounded-xl hover:shadow-xl hover:shadow-blue-200 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3"
                >
                    <span className="relative flex items-center justify-center">
                        <svg className="w-6 h-6 animate-pulse group-hover:animate-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span className="absolute w-6 h-6 bg-white/20 rounded-full group-hover:scale-150 transition-transform duration -300"></span>
                    </span>
                    <span className="text-lg">Buscar Vuelos</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </button>
            </div>
        </div>

        {/* Información adicional minimalista */}
        <div className="pt-6 border-t border-gray-100">
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Mejor precio garantizado</span>
                </div>
                <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Sin cargos ocultos</span>
                </div>
                <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Cancelación flexible</span>
                </div>
            </div>
        </div>
    </form>
</div>
)}
