'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Destinations() {
    const destinations = [
        {
            city: 'La Paz',
            slug: 'la-paz',
            description: 'Ciudad sede de gobierno, el Illimani y teleféricos',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/La_Paz_Skyline.jpg/330px-La_Paz_Skyline.jpg',
            highlight: 'Desde $450',
        },
        {
            city: 'Santa Cruz',
            slug: 'santa-cruz',
            description: 'Capital económica y centro de negocios',
            image: 'https://cdn.bolivia.com/sdi/2018/02/22/ocho-paseos-para-hacer-este-verano-en-santa-cruz-612315.jpg',
            highlight: 'Desde $520',
        },
        {
            city: 'Cochabamba',
            slug: 'cochabamba',
            description: 'La ciudad del eterno clima primaveral',
            image: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Ciudad_de_Cochabamba.jpg',
            highlight: 'Desde $380',
        },
        {
            city: 'Sucre',
            slug: 'sucre',
            description: 'Capital constitucional y patrimonio de la humanidad',
            image: 'https://magritouroperator.com/wp-content/uploads/2023/09/bolivia-magri-7.jpg',
            highlight: 'Desde $420',
        },
        {
            city: 'Tarija',
            slug: 'tarija',
            description: 'Valle de vinos y tradición',
            image: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Tarija.jpg',
            highlight: 'Desde $490',
        },
        {
            city: 'Trinidad',
            slug: 'trinidad',
            description: 'Puerta del Beni y la Amazonía boliviana',
            image: 'https://i.pinimg.com/736x/21/2d/e0/212de04d5e5bd550290457d2594d067e.jpg',
            highlight: 'Desde $550',
        },
    ]

   return (
    <section className="section-container bg-gradient-to-b from-white to-blue-50/30">
        <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-boa-blue"></div>
                <span className="text-sm font-semibold tracking-wider text-boa-blue uppercase">
                    Vuela con nosotros
                </span>
                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-boa-blue"></div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                Destinos <span className="text-transparent bg-clip-text bg-gradient-to-r from-boa-blue to-cyan-600">BOA</span>
            </h2>
            
            <div className="flex items-center justify-center gap-2 text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-lg">Conectamos Bolivia con el mundo</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {destinations.map((destination, index) => (
                <motion.div
                    key={destination.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                        duration: 0.6, 
                        delay: index * 0.15,
                        ease: [0.22, 1, 0.36, 1]
                    }}
                    viewport={{ once: true, margin: "-50px" }}
                    whileHover={{ y: -8 }}
                    className="group"
                >
                    <Link href={`/destinos/${destination.slug}`}>
                        <div className="relative overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-400 border border-gray-100">
                            {/* Imagen con efecto de vuelo */}
                            <div className="relative h-72 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/90 z-10" />
                                
                                <img
                                    src={destination.image}
                                    alt={`Vuelos a ${destination.city} con BOA`}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                                
                                {/* Indicador de vuelo */}
                                <div className="absolute top-4 left-4 z-20">
                                    <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                        <svg className="w-4 h-4 text-boa-blue" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                        </svg>
                                        <span className="text-xs font-semibold text-gray-800">VUELOS DIRECTOS</span>
                                    </div>
                                </div>
                                
                                {/* Precio minimalista */}
                                <div className="absolute top-4 right-4 z-20">
                                    <div className="bg-gradient-to-r from-boa-blue to-cyan-600 text-white font-bold px-4 py-2.5 rounded-lg shadow-lg transform group-hover:scale-105 transition-transform">
                                        <span className="text-sm">Desde</span>
                                        <div className="text-xl">{destination.highlight}</div>
                                    </div>
                                </div>
                                
                                {/* Info ciudad */}
                                <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-8 h-0.5 bg-boa-yellow"></div>
                                        <span className="text-sm font-medium text-boa-yellow tracking-wide">
                                            DESTINO POPULAR
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">{destination.city}</h3>
                                    <p className="text-gray-200 text-sm leading-relaxed">{destination.description}</p>
                                </div>
                            </div>
                            
                            {/* Botón minimalista */}
                            <div className="p-5 border-t border-gray-50">
                                <button className="w-full flex items-center justify-center gap-2 text-boa-blue font-semibold py-3 rounded-lg hover:bg-boa-blue/5 transition-colors group">
                                    <span>Explorar destino</span>
                                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                              d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </div>
        
        {/* Llamada a la acción minimalista */}
        <div className="text-center mt-16">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-boa-blue/5 to-cyan-500/5 px-8 py-4 rounded-2xl border border-boa-blue/10">
                <svg className="w-6 h-6 text-boa-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <p className="text-gray-700">
                    <span className="font-semibold text-boa-blue">+20 destinos</span> disponibles en toda Bolivia
                </p>
            </div>
        </div>
    </section>
)
}