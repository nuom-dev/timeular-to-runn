// Example `tailwind.config.js` file
const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

module.exports = {
  mode: 'jit',
  purge: [
    `components/**/*.{vue,js}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `plugins/**/*.{js,ts}`,
    `nuxt.config.{js,ts}`,
    `node_modules/@nuom/ui-components/dist/ui-components.umd.js`,
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': {
          DEFAULT: '#4053FB',
          dark: '#03129a',
          light: '#cfd3fd',
          background: '#F7F5F1',
        },
        teal: colors.teal,
        amber: colors.amber,
        orange: colors.orange,
        indigo: colors.indigo,
        emerald: colors.emerald,
        yellow: colors.yellow,
        rose: colors.rose,
        lime: colors.lime,
        'warm-gray': colors.warmGray,
        custom: 'var(--customColor)',
        fallback: 'var(--anotherColor, #EC6D4D)',
      },
      fontFamily: {
        primary: ['GT Walsheim Pro', 'Helvetica', 'sans-serif'],
        secondary: ['Lora', 'PT Serif', 'serif'],
      },
      spacing: {
        '500p': '500px',
      },
    },
    textColor: (theme) => ({
      ...theme('colors'),
      primary: '#18181B',
      secondary: '#3F3F46',
      tertiary: '#71717A',
      'brand-contrast': colors.white,
      'sidebar-item': colors.warmGray['500'],
      'sidebar-item-active': theme('colors')['brand-primary'].dark, // `var(--primaryTextContrast,${colors.white})`,
    }),
    backgroundColor: (theme) => ({
      ...theme('colors'),
      primary: '#F7F5F1',
      sidebar: '#FFFFFF',
      headerbar: '#FFFFFF',
      amber: colors.amber,
      teal: colors.teal,
      'sidebar-item-active': theme('colors')['brand-primary'].light,
    }),
  },
  variants: {
    extend: {
      textColor: [
        'first',
        'last',
        'children',
        'children-first',
        'children-last',
      ],
      borderRadius: [
        'first',
        'last',
        'children',
        'children-first',
        'children-last',
      ],
      backgroundColor: [
        'first',
        'last',
        'children',
        'children-first',
        'children-last',
      ],
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-children'),
    require('@tailwindcss/forms'),
    plugin(function ({ addBase, theme }) {
      addBase({
        h1: { fontSize: theme('fontSize.xl') },
      });
    }),
  ],
};
