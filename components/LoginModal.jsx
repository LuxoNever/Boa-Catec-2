'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { X, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react'
import Image from 'next/image'
import logoBoa from '../src/assets/img/logo-3-boa.png'

export default function LoginModal({ isOpen, onClose, onSwitchToRegister }) {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
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
                onClose()
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
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden pointer-events-auto relative">
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>

                            <div className="p-8">
                                <div className="text-center mb-8">
                                    <div className="inline-flex justify-center mb-4">
                                        <Image src={logoBoa} alt="BOA Logo" width={64} height={64} className="object-contain" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">Bienvenido de nuevo</h2>
                                    <p className="text-gray-500 mt-2 text-sm">Ingresa a tu cuenta para gestionar tus viajes</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="email"
                                                placeholder="Correo electrónico"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-boa-blue focus:ring-2 focus:ring-boa-blue/20 outline-none transition-all"
                                            />
                                        </div>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="password"
                                                placeholder="Contraseña"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-boa-blue focus:ring-2 focus:ring-boa-blue/20 outline-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-3 rounded-lg bg-red-50 text-red-600 text-sm flex items-center justify-center"
                                        >
                                            {error}
                                        </motion.div>
                                    )}

                                    <div className="flex items-center justify-between text-sm">
                                        <label className="flex items-center text-gray-600 cursor-pointer">
                                            <input type="checkbox" className="mr-2 rounded border-gray-300 text-boa-blue focus:ring-boa-blue" />
                                            Recordarme
                                        </label>
                                        <button type="button" className="text-boa-blue hover:underline font-medium">
                                            ¿Olvidaste tu contraseña?
                                        </button>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-boa-blue hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center group"
                                    >
                                        {loading ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <>
                                                Iniciar Sesión
                                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </form>

                                <div className="mt-6 text-center text-sm text-gray-500">
                                    ¿No tienes una cuenta?{' '}
                                    <button
                                        onClick={() => {
                                            onClose()
                                            if (onSwitchToRegister) onSwitchToRegister()
                                        }}
                                        className="text-boa-blue font-bold hover:underline"
                                    >
                                        Regístrate gratis
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
