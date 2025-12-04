'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

import imgLaPaz from '../src/assets/img/destinos/la-paz.webp'
import imgSantaCruz from '../src/assets/img/destinos/santa-cruz.webp'
import imgCochabamba from '../src/assets/img/destinos/cbba.webp'
import imgSucre from '../src/assets/img/destinos/sucre.webp'
import imgTarija from '../src/assets/img/destinos/tarija.webp'
import imgTrinidad from '../src/assets/img/destinos/trinidad.webp'
import logoBoa from '../src/assets/img/logo-3-boa.png'
import imgMascotas from '../src/assets/img/mascotas/mascotas.webp'
import imgCanguro from '../src/assets/img/mascotas/canguro.webp'

export default function Destinations() {
    const destinations = [
        {
            city: 'La Paz',
            slug: 'la-paz',
            description: 'Ciudad sede de gobierno, el Illimani y teleféricos',
            image: imgLaPaz,
            highlight: 'Desde $450',
        },
        {
            city: 'Santa Cruz',
            slug: 'santa-cruz',
            description: 'Capital económica y centro de negocios',
            image: imgSantaCruz,
            highlight: 'Desde $520',
        },
        {
            city: 'Cochabamba',
            slug: 'cochabamba',
            description: 'La ciudad del eterno clima primaveral y capital gastronómica',
            image: imgCochabamba,
            highlight: 'Desde $380',
        },
        {
            city: 'Sucre',
            slug: 'sucre',
            description: 'Capital constitucional y patrimonio de la humanidad',
            image: imgSucre,
            highlight: 'Desde $420',
        },
        {
            city: 'Tarija',
            slug: 'tarija',
            description: 'Valle de vinos y tradición',
            image: imgTarija,
            highlight: 'Desde $490',
        },
        {
            city: 'Trinidad',
            slug: 'trinidad',
            description: 'Puerta del Beni y la Amazonía boliviana',
            image: imgTrinidad,
            highlight: 'Desde $550',
        },
    ]

    return (
        <>
            <section className="section-container bg-gray-50">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-boa-dark mb-4">
                        Nuestros <span className="text-gradient-boa">Destinos</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Vuela a los principales destinos de Bolivia con BOA
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {destinations.map((destination, index) => (
                        <motion.div
                            key={destination.slug}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Link href={`/destinos/${destination.slug}`}>
                                <div className="card group cursor-pointer">
                                    <div className="relative h-64 overflow-hidden">
                                        <Image
                                            src={destination.image}
                                            alt={`Vista de ${destination.city}`}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                                        {/* Price Badge */}
                                        <div className="absolute top-4 right-4 bg-boa-yellow text-boa-dark font-bold px-4 py-2 rounded-full shadow-lg z-10">
                                            {destination.highlight}
                                        </div>

                                        {/* City Info */}
                                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                                            <h3 className="text-2xl font-bold mb-2">{destination.city}</h3>
                                            <p className="text-sm text-gray-200">{destination.description}</p>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <button className="w-full btn-outline group-hover:bg-boa-blue group-hover:text-white">
                                            Ver detalles
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Sección de Cuidado de Mascotas y Equipaje */}
            <section className="section-container bg-white">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-xl overflow-hidden"
                >
                    {/* Header con Logo */}
                    <div className="text-center pt-12 pb-8 px-6">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <span className="text-2xl md:text-3xl font-bold text-gray-800">Ahora</span>
                            <div className="relative w-24 h-12">
                                <Image
                                    src={logoBoa}
                                    alt="Logo BOA"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-boa-dark mb-4">
                            Cuida tus <span className="text-gradient-boa">mascotas y equipaje</span> como tú lo harías
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            En BOA nos preocupamos por lo que más te importa. Brindamos el mejor cuidado y atención
                            para tus mascotas y equipaje durante todo el viaje.
                        </p>
                    </div>

                    {/* Grid de Imágenes y Contenido */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12">
                        {/* Tarjeta de Mascotas */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                        >
                            <div className="relative h-64 lg:h-80">
                                <Image
                                    src={imgMascotas}
                                    alt="Cuidado de mascotas BOA"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <h3 className="text-2xl font-bold mb-2">🐾 Cuidado de Mascotas</h3>
                                    <p className="text-sm text-gray-200">
                                        Transportamos a tu mejor amigo con el máximo cuidado y seguridad
                                    </p>
                                </div>
                            </div>
                            <div className="p-6">
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>Compartimentos especiales con temperatura controlada</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>Personal capacitado en manejo de animales</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>Seguimiento durante todo el vuelo</span>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>

                        {/* Tarjeta de Equipaje */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                        >
                            <div className="relative h-64 lg:h-80">
                                <Image
                                    src={imgCanguro}
                                    alt="Cuidado de equipaje BOA"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <h3 className="text-2xl font-bold mb-2">🧳 Cuidado de Equipaje</h3>
                                    <p className="text-sm text-gray-200">
                                        Tu equipaje está en las mejores manos desde el check-in hasta el destino
                                    </p>
                                </div>
                            </div>
                            <div className="p-6">
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>Manejo cuidadoso y profesional de tu equipaje</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>Sistema de rastreo para mayor seguridad</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span>Protección y seguro incluido en tu boleto</span>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>
                    </div>

                    {/* Footer de la sección */}
                    <div className="bg-gradient-to-r from-boa-blue to-blue-600 text-white py-8 px-6 text-center">
                        <p className="text-lg md:text-xl font-semibold mb-2">
                            🇧🇴 BOA cuida a las mascotas y maletas de todos los bolivianos
                        </p>
                        <p className="text-blue-100 text-sm">
                            Porque sabemos que lo que llevas contigo es importante para ti
                        </p>
                    </div>
                </motion.div>
            </section>
        </>
    )
}
