module.exports = {
    mode: "jit",
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        colors: {
            primary: { // black
                low: '#909090',
                medium: '#666666',
                high: '#525252'
            },
            secondary: { // white
                low: 'rgba(255, 255, 255, 0.2)',
                mid: ' #E5E5E5',
                high: '#ffffff'
            },
            tertiary: { // green
                low: 'rgba(42, 196, 140, 0.5)',
                mid: '#2AC48C',
                high: '#187A56'
            },
            background: "#F8F8F8"
        },

        fontFamily: {
            'header': ['Epilogue', 'system-ui'],
            'body': ['Inter', 'system-ui', 'sans-serif'],

        },


        extend: {},
    },
    plugins: [],
}