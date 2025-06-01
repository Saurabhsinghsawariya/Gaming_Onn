/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'hero-bg':'url(/src/assets/images/CTA.png)',
        'login-bg': "url('/src/assets/images/login-bg.jpg')",
      },
      keyframes :{
        fade:{
          '0%, 100%':{opacity:'0'},
          '50%':{opacity:'1'}
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center',
            'opacity': '0.2'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
            'opacity': '0.15'
          }
        },
        'gradient-slow': {
          '0%, 100%': {
            'background-position': '0% 50%',
            'opacity': '1'
          },
          '50%': {
            'background-position': '100% 50%',
            'opacity': '0.8'
          }
        },
        'text': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': '0% 50%'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': '100% 50%'
          }
        }
      },
      animation:{
        fade:'fade 5s ease-in-out infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'gradient-slow': 'gradient-slow 15s ease infinite',
        'text': 'text 8s ease infinite',
      },
      colors:{
        darkGray:'#0f0e17',
        lightGray:'#232323',
        glowLeft:'#4000ff',
        glowRight:'#ff0072',
        gray: {
          950: '#0a0a0f',
        }
      },
      boxShadow:{
        'left-glow':'-10px 0 30px 10px rgba(64,0,255,0.5)',
        'right-glow':'-10px 0 30px 10px rgba(255,0,114,0.5)',
      },
    },
  },
  plugins: [],
}

