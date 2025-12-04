import Image from 'next/image'
import FlightSearch from './FlightSearch'
import heroImage from '../src/assets/img/portada.webp'
import logoBoa from '../src/assets/img/logo-3-boa.png'

export default function Hero() {
    return (
        <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={heroImage}
                    alt="BOA Hero Background"
                    fill
                    priority
                    className="object-cover"
                    quality={100}
                />
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="relative z-10 w-full section-container">
                <div className="text-center mb-16">
                    {/* Airplane Icon */}
                    {/* Logo */}
                   

                    {/* Hero Title */}
                    <br />
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
                        Vuela con <div className="inline-flex items-center justify-center mb-6 animate-fade-in">
                        <Image
                            src={logoBoa}
                            alt="BOA Logo"
                            width={120}
                            height={120}
                            className="object-contain drop-shadow-2xl"
                        />
                    </div>
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 mb-4 max-w-3xl mx-auto animate-slide-up">
                        Conectando Bolivia con el mundo
                    </p>
                    <p className="text-lg text-blue-200 max-w-2xl mx-auto animate-slide-up">
                        Descubre nuestros destinos nacionales e internacionales con la mejor atención y servicio
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
