'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plane, ArrowRight, Lock, AlertCircle } from 'lucide-react'

export default function LoginPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [showAuthMessage, setShowAuthMessage] = useState(false)

    useEffect(() => {
        // Verificar si viene desde la selección de vuelo
        const message = searchParams.get('message')
        if (message === 'auth-required') {
            setShowAuthMessage(true)
        }
    }, [searchParams])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })

            if (result?.error) {
                setError('Credenciales inválidas')
            } else {
                router.push('/dashboard')
                router.refresh()
            }
        } catch (error) {
            console.error('Login error:', error)
            setError('Error al iniciar sesión')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex w-full">
            {/* Left Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <div className="flex justify-center lg:justify-start mb-6">
                            <div className="h-12 w-12 bg-[#0033A0] rounded-xl flex items-center justify-center">
                                <span className="text-2xl font-bold text-white">B</span>
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Bienvenido de nuevo</h1>
                        <p className="mt-2 text-gray-600">Ingresa a tu cuenta BOA para gestionar tus viajes</p>

                        {/* Mensaje de autenticación requerida */}
                        {showAuthMessage && (
                            <div className="mt-6 p-4 rounded-lg bg-blue-50 border-2 border-blue-200 text-blue-800">
                                <div className="flex items-start">
                                    <AlertCircle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold text-sm">Autenticación requerida</p>
                                        <p className="text-sm mt-1">
                                            Para continuar con la compra de tu vuelo, debes iniciar sesión o{' '}
                                            <Link href="/register" className="font-semibold underline hover:text-blue-900">
                                                crear una cuenta gratis
                                            </Link>
                                            .
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Correo Electrónico</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="nombre@ejemplo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="h-12"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Contraseña</Label>
                                    <Link href="#" className="text-sm font-medium text-[#0033A0] hover:underline">
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="h-12"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm flex items-center">
                                <Lock className="h-4 w-4 mr-2" />
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full h-12 bg-[#0033A0] hover:bg-blue-800 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Iniciando...
                                </div>
                            ) : (
                                <div className="flex items-center justify-center">
                                    Iniciar Sesión
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </div>
                            )}
                        </Button>

                        <p className="text-center text-sm text-gray-600">
                            ¿No tienes una cuenta?{' '}
                            <Link href="/register" className="font-semibold text-[#0033A0] hover:underline">
                                Regístrate gratis
                            </Link>
                        </p>
                    </form>

                    <div className="pt-8 border-t border-gray-100">
                        <div className="flex items-center justify-center space-x-6 text-gray-400">
                            <Plane className="h-6 w-6" />
                            <span className="text-sm">La aerolínea de todos los bolivianos</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Image/Gradient */}
            <div className="hidden lg:flex w-1/2 bg-[#0033A0] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0033A0] to-[#001F5C] opacity-90"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12 text-center z-10">
                    <div className="mb-8 p-6 bg-white/10 rounded-full backdrop-blur-md">
                        <Plane className="h-24 w-24" />
                    </div>
                    <h2 className="text-4xl font-bold mb-6">Viaja con nosotros</h2>
                    <p className="text-xl text-blue-100 max-w-md leading-relaxed">
                        Descubre nuevos destinos, gestiona tus reservas y disfruta de la mejor experiencia de vuelo con Boliviana de Aviación.
                    </p>

                    <div className="mt-12 grid grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold mb-1">15+</div>
                            <div className="text-sm text-blue-200">Destinos</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold mb-1">24/7</div>
                            <div className="text-sm text-blue-200">Soporte</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold mb-1">1M+</div>
                            <div className="text-sm text-blue-200">Viajeros</div>
                        </div>
                    </div>
                </div>
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
            </div>
        </div>
    )
}
