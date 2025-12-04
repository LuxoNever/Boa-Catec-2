/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,jsx}',
        './components/**/*.{js,jsx}',
        './app/**/*.{js,jsx}',
        './src/**/*.{js,jsx}',
    ],
    theme: {
        extend: {
            colors: {
                boa: {
                    blue: '#0033A0',
                    yellow: '#FFC72C',
                    dark: '#1F2937',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in',
                'slide-up': 'slideUp 0.6s ease-out',
                'bounce-slow': 'bounce 3s infinite',
                // Nuevas animaciones para el efecto de texto
                'slow-pulse': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
                'float-slow': 'float 8s ease-in-out infinite',
                'float-slower': 'float 10s ease-in-out infinite',
                'wave': 'wave 20s linear infinite',
                'gradient': 'gradient 3s ease infinite',
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                'count-up': 'countUp 2s ease-out forwards',
                'cursor-blink': 'cursorBlink 1s infinite',
                'fly-up': 'flyUp 1s ease-out forwards', // Nueva animación para el avión
                'shimmer': 'shimmer 2s infinite',
            },
            keyframes: {
                shimmer: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' },
  },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(100px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                // Nuevos keyframes
                float: {
                    '0%, 100%': { transform: 'translateY(50px)' },
                    '50%': { transform: 'translateY(20px)' },
                },
                flyUp: {
                    '0%': { 
                        transform: 'translateY(100px) rotate(-10deg)', 
                        opacity: '0',
                        scale: '0.8'
                    },
                    '70%': { 
                        transform: 'translateY(-10px) rotate(5deg)', 
                        opacity: '1',
                        scale: '1.05'
                    },
                    '100%': { 
                        transform: 'translateY(0) rotate(0deg)', 
                        opacity: '1',
                        scale: '1'
                    },
                },
                wave: {
                    '0%': { transform: 'translateX(0) translateZ(0) scaleY(1)' },
                    '50%': { transform: 'translateX(-25%) translateZ(0) scaleY(0.8)' },
                    '100%': { transform: 'translateX(-50%) translateZ(0) scaleY(1)' },
                },
                gradient: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                countUp: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                cursorBlink: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0' },
                },
            },
            backgroundImage: {
                'gradient-boa': 'linear-gradient(90deg, #0033A0 0%, #0066CC 100%)',
                'gradient-boa-radial': 'radial-gradient(circle at 50% 50%, #0033A0 0%, #001A4D 100%)',
                'gradient-yellow': 'linear-gradient(90deg, #FFC72C 0%, #FFD966 100%)',
            },
        },
    },
    plugins: [],
}