// Importa a função withMT do @material-tailwind/react
const withMT = require("@material-tailwind/react/utils/withMT");

// Exporte a configuração do Tailwind usando withMT
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
});
