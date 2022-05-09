/* eslint-disable eol-last */
/* eslint-disable quote-props */
/* eslint-disable indent */
module.exports = {
    mode: "jit",
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        colors: {
            primary: { // black
                low: '#909090',
                medium: '#666666',
                high: '#525252',
            },
            secondary: { // white
                low: 'rgba(255, 255, 255, 0.2)',
                mid: ' #E5E5E5',
                high: '#ffffff',
            },
            tertiary: { // green
                low: 'rgba(42, 196, 140, 0.1)',
                mid: '#2AC48C',
                high: '#187A56',
            },
            background: "#F8F8F8",
            transparent: "rgba(42, 196, 140, 0.0)",
        },

        fontFamily: {
            'header': ['Epilogue', 'system-ui'],
            'body': ['Inter', 'system-ui', 'sans-serif'],

        },
        boxShadow: {
            1: "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)",
        },


        extend: {},
    },
    plugins: [],
};