/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui";
export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
  daisyui: {
    themes: ["business"]
  }
}

