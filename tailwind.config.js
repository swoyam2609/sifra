import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF567D",
        secondary: "#5EB0FF",
        black1: "#131314",
        black2: "#111111",
      },
      fontFamily: {
        primary: "GoogleSansRegular",
        primaryBold: "GoogleSansBold",
      },
    },
  },
  plugins: [],
});
