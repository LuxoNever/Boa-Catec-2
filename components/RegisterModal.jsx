'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { X, User, Mail, Lock, Phone, CreditCard, ArrowRight, Loader2 } from 'lucide-react'
import Image from 'next/image'
import logoBoa from '@/src/assets/img/logo-3-boa.png'

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }) {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: '',
        carnet: '',
        phone: '',
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Simulate API call
            console.log('Registering with:', formData)
            await new Promise(resolve => setTimeout(resolve, 1500))

            onClose()
            router.push('/login?registered=true')
        } catch (error) {
            console.error('Registration error:', error)
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
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden pointer-events-auto relative max-h-[90vh] overflow-y-auto">
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>

                            <div className="p-8">
                                <div className="text-center mb-6">
                                    <div className="inline-flex justify-center mb-4">
                                        <Image src={logoBoa} alt="BOA Logo" width={64} height={64} className="object-contain" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">Únete a BOA</h2>
                                    <p className="text-gray-500 mt-2 text-sm">Regístrate para gestionar tus viajes fácilmente</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-4">
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Nombre Completo"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-boa-blue focus:ring-2 focus:ring-boa-blue/20 outline-none transition-all"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="relative">
                                                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    name="carnet"
                                                    placeholder="C.I. / Pasaporte"
                                                    required
                                                    value={formData.carnet}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-boa-blue focus:ring-2 focus:ring-boa-blue/20 outline-none transition-all"
                                                />
                                            </div>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    placeholder="Celular"
                                                    required
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-boa-blue focus:ring-2 focus:ring-boa-blue/20 outline-none transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Correo Electrónico"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-boa-blue focus:ring-2 focus:ring-boa-blue/20 outline-none transition-all"
                                            />
                                        </div>

                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="password"
                                                name="password"
                                                placeholder="Contraseña"
                                                required
                                                value={formData.password}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-boa-blue focus:ring-2 focus:ring-boa-blue/20 outline-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-boa-blue hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center group mt-6"
                                    >
                                        {loading ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <>
                                                Crear Cuenta
                                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </form>

                                <div className="mt-6 text-center text-sm text-gray-500">
                                    ¿Ya tienes una cuenta?{' '}
                                    <button
                                        onClick={() => {
                                            onClose()
                                            if (onSwitchToLogin) onSwitchToLogin()
                                        }}
                                        className="text-boa-blue font-bold hover:underline"
                                    >
                                        Inicia Sesión
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
