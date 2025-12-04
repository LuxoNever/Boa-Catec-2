'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { useSession, signOut } from 'next-auth/react'
import { User, LogOut, LayoutDashboard, Plane, Menu, X, ChevronDown } from 'lucide-react'

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [userMenuOpen, setUserMenuOpen] = useState(false)
    const [hoveredIndex, setHoveredIndex] = useState(null)
    const [scrolled, setScrolled] = useState(false)
    const [navItemsMounted, setNavItemsMounted] = useState(false)
    const { data: session, status } = useSession()
    const { scrollY } = useScroll()

    // Efecto de scroll con Framer Motion
    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 50) {
            setScrolled(true)
        } else {
            setScrolled(false)
        }
    })

    // Animación de entrada para los elementos de navegación
    useEffect(() => {
        const timer = setTimeout(() => {
            setNavItemsMounted(true)
        }, 300)
        return () => clearTimeout(timer)
    }, [])

    const navigation = [
        { name: 'Inicio', href: '/' },
        { name: 'Destinos', href: '/destinos' },
        { name: 'Reservas', href: '/vuelos' },
        { name: 'Check-in', href: '/checkin' },
        { name: 'Info Vuelos', href: '/informacion' },
        { name: 'Promociones', href: '/#promociones' },
    ]

    return (
        <motion.div
            initial={false}
            animate={{
                y: scrolled ? 0 : 0,
            }}
            className="fixed inset-x-0 top-0 z-50 w-full"
        >
            {/* Desktop Navigation - Solo visible en pantallas grandes */}
            <motion.div
                animate={{
                    backdropFilter: scrolled ? "blur(10px)" : "none",
                    boxShadow: scrolled 
                        ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
                        : "none",
                    width: scrolled ? "90%" : "100%",
                    minWidth: scrolled ? "800px" : "100%",
                    borderRadius: scrolled ? "20px" : "0px",
                    marginTop: scrolled ? "20px" : "0px",
                    paddingLeft: scrolled ? "16px" : "0px",
                    paddingRight: scrolled ? "16px" : "0px",
                    height: scrolled ? "70px" : "80px",
                }}
                transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 30
                }}
                className="hidden lg:flex relative z-50 mx-auto w-full max-w-7xl items-center justify-between bg-white/90 backdrop-blur-md"
            >
                {/* Logo */}
                <motion.div
                    animate={{
                        scale: scrolled ? 0.9 : 1,
                    }}
                    className="flex items-center space-x-3 z-20 pl-4"
                >
                    <Link href="/" className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-boa-blue to-blue-700 rounded-lg">
                            <span className="text-xl font-bold text-white">BOA</span>
                        </div>
                        <div className="hidden md:block">
                            <motion.div
                                animate={{
                                    opacity: scrolled ? 0.9 : 1,
                                }}
                                className="text-boa-blue font-bold text-lg leading-tight"
                            >
                                Boliviana de Aviación
                            </motion.div>
                            <motion.div
                                animate={{
                                    opacity: scrolled ? 0.7 : 1,
                                }}
                                className="text-xs text-gray-600"
                            >
                                Conectando Bolivia
                            </motion.div>
                        </div>
                    </Link>
                </motion.div>

                {/* Navigation Items con animación de expandir */}
                <div className="flex-1 flex justify-center">
                    <div 
                        className="flex items-center space-x-1" 
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        {navigation.map((item, idx) => (
                            <motion.div
                                key={item.name}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ 
                                    scale: navItemsMounted ? 1 : 0,
                                    opacity: navItemsMounted ? 1 : 0,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 20,
                                    delay: idx * 0.05
                                }}
                                whileHover={{ scale: 1.05 }}
                                className="relative"
                            >
                                <Link
                                    href={item.href}
                                    onMouseEnter={() => setHoveredIndex(idx)}
                                    className="relative px-4 py-2 text-gray-700 hover:text-boa-blue transition-colors block"
                                >
                                    {hoveredIndex === idx && (
                                        <motion.div
                                            layoutId="navbar-hover"
                                            className="absolute inset-0 h-full w-full rounded-full bg-gradient-to-r from-blue-50 to-cyan-50"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-20">{item.name}</span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* User Actions */}
                <div className="relative z-20 flex items-center gap-3 pr-4">
                    {status === 'authenticated' ? (
                        <div className="relative">
                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 text-boa-blue hover:from-blue-100 hover:to-cyan-100 transition-all duration-200"
                            >
                                <motion.div
                                    animate={{
                                        scale: scrolled ? 0.9 : 1,
                                    }}
                                    className="w-8 h-8 rounded-full bg-gradient-to-r from-boa-blue to-blue-600 flex items-center justify-center"
                                >
                                    <User className="w-4 h-4 text-white" />
                                </motion.div>
                                <motion.span
                                    animate={{
                                        opacity: scrolled ? 0.8 : 1,
                                    }}
                                    className="font-medium hidden md:inline"
                                >
                                    Hola, {session.user.name?.split(' ')[0]}
                                </motion.span>
                                <ChevronDown className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {userMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl shadow-blue-100/50 border border-blue-100 py-2 origin-top-right"
                                    >
                                        <Link
                                            href="/dashboard"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-boa-blue transition-colors"
                                            onClick={() => setUserMenuOpen(false)}
                                        >
                                            <LayoutDashboard className="w-4 h-4 mr-2" />
                                            Dashboard
                                        </Link>
                                        <Link
                                            href="/my-bookings"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-boa-blue transition-colors"
                                            onClick={() => setUserMenuOpen(false)}
                                        >
                                            <Plane className="w-4 h-4 mr-2" />
                                            Mis Viajes
                                        </Link>
                                        <button
                                            onClick={() => {
                                                signOut()
                                                setUserMenuOpen(false)
                                            }}
                                            className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                        >
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Cerrar Sesión
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: navItemsMounted ? 1 : 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 20,
                                delay: navigation.length * 0.05
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href="/login"
                                className="px-4 py-2 rounded-full bg-gradient-to-r from-boa-blue to-blue-600 text-white text-sm font-bold shadow-lg hover:shadow-xl transition-all block"
                            >
                                Iniciar Sesión
                            </Link>
                        </motion.div>
                    )}
                </div>
            </motion.div>

            {/* Mobile Navigation - Solo visible en pantallas pequeñas */}
            <motion.div
                animate={{
                    backdropFilter: scrolled ? "blur(10px)" : "none",
                    boxShadow: scrolled 
                        ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
                        : "none",
                    borderRadius: scrolled ? "20px" : "0px",
                    marginTop: scrolled ? "20px" : "0px",
                    marginLeft: scrolled ? "5%" : "0px",
                    marginRight: scrolled ? "5%" : "0px",
                }}
                transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 30
                }}
                className="lg:hidden relative z-50 bg-white/90 backdrop-blur-md mx-4"
            >
                <div className="flex items-center justify-between px-4 py-3">
                    <Link href="/" className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-boa-blue to-blue-700 rounded-lg">
                            <span className="text-xl font-bold text-white">BOA</span>
                        </div>
                        <div>
                            <div className="text-boa-blue font-bold text-lg leading-tight">Boliviana</div>
                            <div className="text-xs text-gray-600">de Aviación</div>
                        </div>
                    </Link>

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 text-boa-blue"
                    >
                        {mobileMenuOpen ? (
                            <X className="w-5 h-5" />
                        ) : (
                            <Menu className="w-5 h-5" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="absolute inset-x-0 top-full mt-2 bg-white rounded-2xl shadow-2xl shadow-blue-100/50 border border-blue-100 overflow-hidden origin-top"
                        >
                            <div className="p-4 space-y-1">
                                {navigation.map((item, idx) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="overflow-hidden"
                                    >
                                        <Link
                                            href={item.href}
                                            className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-boa-blue hover:bg-blue-50 rounded-lg transition-colors"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                ))}
                                
                                {status === 'authenticated' ? (
                                    <>
                                        <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent my-2"></div>
                                        <motion.div
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: navigation.length * 0.05 }}
                                        >
                                            <Link
                                                href="/dashboard"
                                                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-boa-blue hover:bg-blue-50 rounded-lg transition-colors"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Dashboard
                                            </Link>
                                        </motion.div>
                                        <motion.div
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: (navigation.length + 1) * 0.05 }}
                                        >
                                            <Link
                                                href="/my-bookings"
                                                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-boa-blue hover:bg-blue-50 rounded-lg transition-colors"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Mis Viajes
                                            </Link>
                                        </motion.div>
                                        <motion.div
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: (navigation.length + 2) * 0.05 }}
                                        >
                                            <button
                                                onClick={() => {
                                                    signOut()
                                                    setMobileMenuOpen(false)
                                                }}
                                                className="block w-full text-left px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                Cerrar Sesión
                                            </button>
                                        </motion.div>
                                    </>
                                ) : (
                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: navigation.length * 0.05 }}
                                        className="mt-4"
                                    >
                                        <Link
                                            href="/login"
                                            className="block px-4 py-3 rounded-lg bg-gradient-to-r from-boa-blue to-blue-600 text-white text-center font-bold"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Iniciar Sesión
                                        </Link>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    )
}