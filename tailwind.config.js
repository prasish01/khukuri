/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream:       '#FAF6EF',
        parchment:   '#F2EBD9',
        warm:        '#EDE3D0',
        ink:         '#1A1209',
        inkLight:    '#3D2E1A',
        brick:       '#C0392B',
        brickLight:  '#E8563A',
        saffron:     '#F0A500',
        saffronLight:'#FFD166',
        sage:        '#6B7F5E',
        stone:       '#8C7B6B',
        stoneLight:  '#BFB0A0',
        border:      '#DDD5C5',
      },
      fontFamily: {
        serif:   ['"Playfair Display"', 'Georgia', 'serif'],
        sans:    ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Bebas Neue"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
