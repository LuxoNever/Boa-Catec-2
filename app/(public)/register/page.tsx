'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { User, Mail, Lock, Phone, CreditCard, ArrowRight, Loader2, Plane } from 'lucide-react'
import Image from 'next/image'
import logoBoa from '@/src/assets/img/logo-3-boa.png'

export default function RegisterPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: '',
        carnet: '',
        phone: '',
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Simulate API call
        try {
            // In a real app, you would send this data to your API
            console.log('Registering with:', formData)

            // Simulate delay
            await new Promise(resolve => setTimeout(resolve, 1500))

            // Redirect to login (or dashboard if auto-login)
            router.push('/login?registered=true')
        } catch (error) {
            console.error('Registration error:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-boa-blue/5 rounded-full blur-3xl" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-boa-yellow/5 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden z-10 relative"
            >
                <div className="p-8 md:p-10">
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-flex justify-center mb-6 hover:scale-105 transition-transform">
                            <Image src={logoBoa} alt="BOA Logo" width={80} height={80} className="object-contain" />
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Únete a BOA</h1>
                        <p className="text-gray-500">Regístrate para gestionar tus viajes fácilmente</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-5">
                            <div className="relative group">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-boa-blue transition-colors" />
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Nombre Completo"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-boa-blue focus:ring-4 focus:ring-boa-blue/10 outline-none transition-all bg-gray-50 focus:bg-white"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="relative group">
                                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-boa-blue transition-colors" />
                                    <input
                                        type="text"
                                        name="carnet"
                                        placeholder="C.I. / Pasaporte"
                                        required
                                        value={formData.carnet}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-boa-blue focus:ring-4 focus:ring-boa-blue/10 outline-none transition-all bg-gray-50 focus:bg-white"
                                    />
                                </div>
                                <div className="relative group">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-boa-blue transition-colors" />
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Celular"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-boa-blue focus:ring-4 focus:ring-boa-blue/10 outline-none transition-all bg-gray-50 focus:bg-white"
                                    />
                                </div>
                            </div>

                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-boa-blue transition-colors" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Correo Electrónico"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-boa-blue focus:ring-4 focus:ring-boa-blue/10 outline-none transition-all bg-gray-50 focus:bg-white"
                                />
                            </div>

                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-boa-blue transition-colors" />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Contraseña"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-boa-blue focus:ring-4 focus:ring-boa-blue/10 outline-none transition-all bg-gray-50 focus:bg-white"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-boa-blue hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center group mt-6"
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

                    <div className="mt-8 text-center">
                        <p className="text-gray-500">
                            ¿Ya tienes una cuenta?{' '}
                            <Link href="/login" className="text-boa-blue font-bold hover:underline">
                                Inicia Sesión
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Bottom decorative bar */}
                <div className="h-2 w-full bg-gradient-to-r from-boa-blue via-boa-yellow to-boa-blue" />
            </motion.div>
        </div>
    )
}
