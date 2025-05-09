import colors from 'tailwindcss/colors';

module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./styles/globals.css",
        "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
    ],
    // Force light mode in Trevor:
    darkMode: 'class',
    theme: {
        transparent: 'transparent',
        current: 'currentColor',
        extend: {
            backgroundImage: {
                gradient:
                    "linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82)",
            },
            animation: {
                opacity: "opacity 0.25s ease-in-out",
                appearFromRight: "appearFromRight 300ms ease-in-out",
                wiggle: "wiggle 1.5s ease-in-out infinite",
                popup: "popup 0.25s ease-in-out",
                shimmer: "shimmer 3s ease-out infinite alternate",
                'infinite-scroll': 'scroll 5s linear infinite',
            },
            keyframes: {
                opacity: {
                    "0%": {opacity: 0},
                    "100%": {opacity: 1},
                },
                appearFromRight: {
                    "0%": {opacity: 0.3, transform: "translate(15%, 0px);"},
                    "100%": {opacity: 1, transform: "translate(0);"},
                },
                wiggle: {
                    "0%, 20%, 80%, 100%": {
                        transform: "rotate(0deg)",
                    },
                    "30%, 60%": {
                        transform: "rotate(-2deg)",
                    },
                    "40%, 70%": {
                        transform: "rotate(2deg)",
                    },
                    "45%": {
                        transform: "rotate(-4deg)",
                    },
                    "55%": {
                        transform: "rotate(4deg)",
                    },
                },
                popup: {
                    "0%": {transform: "scale(0.8)", opacity: 0.8},
                    "50%": {transform: "scale(1.1)", opacity: 1},
                    "100%": {transform: "scale(1)", opacity: 1},
                },
                shimmer: {
                    "0%": {backgroundPosition: "0 50%"},
                    "50%": {backgroundPosition: "100% 50%"},
                    "100%": {backgroundPosition: "0% 50%"},
                },
                scroll: {
                    '0%': {transform: 'translateX(0)'},
                    '100%': {transform: 'translateX(-100%)'},
                },
            },
            colors: {
                // light mode
                tremor: {
                    brand: {
                        faint: colors.blue[50],
                        muted: colors.blue[200],
                        subtle: colors.blue[400],
                        DEFAULT: colors.blue[500],
                        emphasis: colors.blue[700],
                        inverted: colors.white,
                    },
                    background: {
                        muted: colors.gray[50],
                        subtle: colors.gray[100],
                        DEFAULT: colors.white,
                        emphasis: colors.gray[700],
                    },
                    border: {
                        DEFAULT: colors.gray[200],
                    },
                    ring: {
                        DEFAULT: colors.gray[200],
                    },
                    content: {
                        subtle: colors.gray[400],
                        DEFAULT: colors.gray[500],
                        emphasis: colors.gray[700],
                        strong: colors.gray[900],
                        inverted: colors.white,
                    },
                },
                // dark mode
                'dark-tremor': {
                    brand: {
                        faint: '#0B1229',
                        muted: colors.blue[950],
                        subtle: colors.blue[800],
                        DEFAULT: colors.blue[500],
                        emphasis: colors.blue[400],
                        inverted: colors.blue[950],
                    },
                    background: {
                        muted: '#131A2B',
                        subtle: colors.gray[800],
                        DEFAULT: colors.gray[900],
                        emphasis: colors.gray[300],
                    },
                    border: {
                        DEFAULT: colors.gray[800],
                    },
                    ring: {
                        DEFAULT: colors.gray[800],
                    },
                    content: {
                        subtle: colors.gray[600],
                        DEFAULT: colors.gray[500],
                        emphasis: colors.gray[200],
                        strong: colors.gray[50],
                        inverted: colors.gray[950],
                    },
                },
            },
            boxShadow: {
                // light
                'tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                'tremor-card':
                    '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                'tremor-dropdown':
                    '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                // dark
                'dark-tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                'dark-tremor-card':
                    '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                'dark-tremor-dropdown':
                    '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
            },
            borderRadius: {
                'tremor-small': '0.375rem',
                'tremor-default': '0.5rem',
                'tremor-full': '9999px',
            },
            fontSize: {
                'tremor-label': ['0.75rem', {lineHeight: '1rem'}],
                'tremor-default': ['0.875rem', {lineHeight: '1.25rem'}],
                'tremor-title': ['1.125rem', {lineHeight: '1.75rem'}],
                'tremor-metric': ['1.875rem', {lineHeight: '2.25rem'}],
            }
        },
    },
    safelist: [
        {
            pattern:
                /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
            variants: ['hover', 'ui-selected'],
        },
        {
            pattern:
                /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
            variants: ['hover', 'ui-selected'],
        },
        {
            pattern:
                /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
            variants: ['hover', 'ui-selected'],
        },
        {
            pattern:
                /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
        },
        {
            pattern:
                /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
        },
        {
            pattern:
                /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
        }
    ],
    plugins: [require("daisyui")],
    daisyui: {
        // Light & dark themes are added by default (it switches automatically based on OS settings)
        // You can add another theme among the list of 30+
        // Add "data-theme='theme_name" to any HTML tag to enable the 'theme_name' theme.
        // https://daisyui.com/
        themes: [
            {
                emerald: {
                    ...require("daisyui/src/theming/themes")["emerald"],
                    primary: "#b45309",
                }
            },
            // "dark"
        ],
    },
};