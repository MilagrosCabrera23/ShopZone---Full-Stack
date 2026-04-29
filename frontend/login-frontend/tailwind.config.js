/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        heading: [' Poppins', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      colors: {
        'btn-primary': '#E11D48',
        'text-title': '#FB923C', 
        'card-bg': '#F8FAFC', 
        'text-color': '#1E293B', 
        'background': '#FFFFFF',
      }
    },
  },
  plugins: [],
};
