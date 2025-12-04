'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

export default function FlightSearch() {
    const [tripType, setTripType] = useState('roundtrip')
    const [showModal, setShowModal] = useState(false)
    const [flightOptions, setFlightOptions] = useState(null)
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

    // Función para generar vuelos directos disponibles
    const generateFlightOptions = (data) => {
        const originCity = cities.find(c => c.code === data.origin)
        const destCity = cities.find(c => c.code === data.destination)

        // Generar 3 opciones de vuelos directos con diferentes horarios
        const flights = [
            {
                flightNumber: 'OB-301',
                price: Math.floor(Math.random() * (500 - 350) + 350),
                duration: '2h 15min',
                departure: '08:30',
                arrival: '10:45',
            },
            {
                flightNumber: 'OB-305',
                price: Math.floor(Math.random() * (450 - 280) + 280),
                duration: '2h 10min',
                departure: '14:00',
                arrival: '16:10',
            },
            {
                flightNumber: 'OB-309',
                price: Math.floor(Math.random() * (550 - 400) + 400),
                duration: '2h 20min',
                departure: '18:30',
                arrival: '20:50',
            }
        ]

        return {
            searchData: data,
            origin: originCity?.name,
            destination: destCity?.name,
            flights: flights
        }
    }

    const onSubmit = (data) => {
        // Generar opciones de vuelo
        const options = generateFlightOptions(data)
        setFlightOptions(options)
        setShowModal(true)
    }

    const handleSelectFlight = (flight) => {
        // Cerrar el modal
        setShowModal(false)

        // Redirigir a la página de login con mensaje
        router.push('/login?redirect=booking&message=auth-required')
    }

    return (
        <>
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-5xl mx-auto -mt-12 relative z-10">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Trip Type Toggle */}
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={() => setTripType('roundtrip')}
                            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${tripType === 'roundtrip'
                                ? 'bg-boa-blue text-white shadow-lg'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Ida y vuelta
                        </button>
                        <button
                            type="button"
                            onClick={() => setTripType('oneway')}
                            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${tripType === 'oneway'
                                ? 'bg-boa-blue text-white shadow-lg'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Solo ida
                        </button>
                    </div>

                    {/* Flight Search Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Origin */}
                        <div>
                            <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-2">
                                Origen
                            </label>
                            <select
                                id="origin"
                                {...register('origin', { required: 'Seleccione origen' })}
                                className="input-field"
                            >
                                <option value="">Seleccionar ciudad</option>
                                {cities.map((city) => (
                                    <option key={city.code} value={city.code}>
                                        {city.name} ({city.code})
                                    </option>
                                ))}
                            </select>
                            {errors.origin && (
                                <p className="mt-1 text-sm text-red-600">{errors.origin.message}</p>
                            )}
                        </div>

                        {/* Destination */}
                        <div>
                            <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
                                Destino
                            </label>
                            <select
                                id="destination"
                                {...register('destination', { required: 'Seleccione destino' })}
                                className="input-field"
                            >
                                <option value="">Seleccionar ciudad</option>
                                {cities.map((city) => (
                                    <option key={city.code} value={city.code}>
                                        {city.name} ({city.code})
                                    </option>
                                ))}
                            </select>
                            {errors.destination && (
                                <p className="mt-1 text-sm text-red-600">{errors.destination.message}</p>
                            )}
                        </div>

                        {/* Departure Date */}
                        <div>
                            <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700 mb-2">
                                Fecha de salida
                            </label>
                            <input
                                id="departureDate"
                                type="date"
                                {...register('departureDate', { required: 'Seleccione fecha' })}
                                className="input-field"
                                min={new Date().toISOString().split('T')[0]}
                            />
                            {errors.departureDate && (
                                <p className="mt-1 text-sm text-red-600">{errors.departureDate.message}</p>
                            )}
                        </div>

                        {/* Return Date */}
                        {tripType === 'roundtrip' && (
                            <div>
                                <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700 mb-2">
                                    Fecha de regreso
                                </label>
                                <input
                                    id="returnDate"
                                    type="date"
                                    {...register('returnDate', { required: tripType === 'roundtrip' && 'Seleccione fecha' })}
                                    className="input-field"
                                    min={new Date().toISOString().split('T')[0]}
                                />
                                {errors.returnDate && (
                                    <p className="mt-1 text-sm text-red-600">{errors.returnDate.message}</p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Passengers and Class */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Passengers */}
                        <div>
                            <label htmlFor="passengers" className="block text-sm font-medium text-gray-700 mb-2">
                                Pasajeros
                            </label>
                            <select
                                id="passengers"
                                {...register('passengers')}
                                className="input-field"
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                    <option key={num} value={num}>
                                        {num} {num === 1 ? 'Pasajero' : 'Pasajeros'}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Class */}
                        <div>
                            <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-2">
                                Clase
                            </label>
                            <select
                                id="class"
                                {...register('class')}
                                className="input-field"
                            >
                                <option value="economy">Económica</option>
                                <option value="business">Ejecutiva</option>
                            </select>
                        </div>

                        {/* Search Button */}
                        <div className="flex items-end">
                            <button
                                type="submit"
                                className="w-full btn-primary flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                Buscar vuelos
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Modal de Resultados */}
            {showModal && flightOptions && flightOptions.flights && (
                <div className="fixed inset-0 bg-black bg-opacity-0 z-[9999] flex items-start justify-center p-4 pt-20 overflow-y-auto" onClick={() => setShowModal(false)}>
                    <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
                        {/* Header del Modal */}
                        <div className="bg-gradient-to-r from-boa-blue to-blue-600 text-white p-5 rounded-t-xl">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-bold">Vuelos Disponibles</h2>
                                    <p className="text-sm text-blue-100 mt-1">
                                        {flightOptions.origin} → {flightOptions.destination}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Lista de Vuelos */}
                        <div className="p-5 space-y-3 max-h-[70vh] overflow-y-auto">
                            {flightOptions.flights.map((flight, index) => {
                                const cheapest = flightOptions.flights.reduce((min, f) => f.price < min.price ? f : min, flightOptions.flights[0])
                                const isCheapest = flight.price === cheapest.price

                                return (
                                    <div
                                        key={index}
                                        className={`border-2 rounded-lg p-4 transition-all hover:shadow-md ${isCheapest
                                            ? 'border-green-500 bg-green-50'
                                            : 'border-gray-200 hover:border-boa-blue'
                                            }`}
                                    >
                                        {/* Header de la tarjeta */}
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-bold text-gray-800">Vuelo Directo</h3>
                                                    {isCheapest && (
                                                        <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                                            MÁS BARATO
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-gray-500 mt-0.5">Sin escalas</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-boa-blue">Bs. {flight.price}</p>
                                                <p className="text-xs text-gray-500">por persona</p>
                                            </div>
                                        </div>

                                        {/* Información del vuelo */}
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="text-center">
                                                <p className="text-xl font-bold text-gray-800">{flight.departure}</p>
                                                <p className="text-xs text-gray-600">{flightOptions.origin}</p>
                                            </div>

                                            <div className="flex-1 mx-3">
                                                <div className="relative">
                                                    <div className="border-t-2 border-gray-300 border-dashed"></div>
                                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                                                        <svg className="w-5 h-5 text-boa-blue" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <p className="text-center text-xs text-gray-600 mt-1">{flight.duration}</p>
                                            </div>

                                            <div className="text-center">
                                                <p className="text-xl font-bold text-gray-800">{flight.arrival}</p>
                                                <p className="text-xs text-gray-600">{flightOptions.destination}</p>
                                            </div>
                                        </div>

                                        {/* Botón de selección */}
                                        <button
                                            onClick={() => handleSelectFlight(flight)}
                                            className="w-full bg-boa-blue text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                                        >
                                            Seleccionar este vuelo
                                        </button>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Footer del Modal */}
                        <div className="bg-gray-50 px-5 py-3 rounded-b-xl border-t">
                            <p className="text-xs text-gray-600 text-center">
                                💡 Los precios son referenciales y pueden variar según disponibilidad
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
