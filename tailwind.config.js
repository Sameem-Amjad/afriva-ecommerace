/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        buttonGradient:
          "linear-gradient(95.64deg, #8EE41D 1.91%, #70C600 98.09%)",

        "success-pattern": "url('/images/success-bg.png')",
        browse1: "url('/images/browse1.png')",
        browse2: "url('/images/browse2.png')",
        browse3: "url('/images/browse3.png')",
        browse4: "url('/images/browse4.png')",
        "forgot-gradient": "linear-gradient(to bottom, #9DF02F, #69B900)",
      },

      borderColor: {
        borderTag: "0.6px solid var(--secondary2, #597596)",
      },

      colors: {
        primary: "#8BC53F",
        divider: "#DADADA",
        placeholder: "#969696",
        fieldBorder: "#E1E3EA",
        text: "#818181",
        secondaryText: "#4C5673",

        grayDark: "#818181",
        graytoc: "#464646",
        grayMid: "#515151",
        grayLight: "#DADADA",
        grayLight1: "#DBDBDB",

        tagGray: "#59759633",

        greenText: "#50CD89",
        greenLight: "#E8FFF3",
        greenSideMenu: "#F5FFE8",

        whiteDark: "#F9F9F9",
        whiteLight: "#F8F8F8",
        whiteLightest: "#F5F5F5",

        blueLight: "#EDF5FF",

        secondaryBg: "#F9FAFB",

        successButton: "#EAECF0",
        grayColor: "#667085",
        grayIcon: "#D0D5DD",
        searchBarBg: "#F0F0F0",
        heroBg: "#F2F0F1",

        brandsbg: "#7F0000",
        errorColor: "#D02E2E",
        productBg: "#F0EEED",
        footerBg: "#597596",

        danger: "#E53535",

        uploadBg: "#D9D9D94D",

        redColor: "#EF4444",
      },

      boxShadow: {
        buttonShadow: "0 10px 24px 0px rgba(58, 41, 106, 0.20)",

        avatarShadow1: "0px 8px 28px 6px #18274B1F",
        datePickerShadow: "0px 0px 0px 3.2px #20A2E840",

        successShadow: "0 1px 2px 0px rgba(16, 24, 40, 0.05)",
        profileShadow:
          "0 8px 28px -6px rgba(24, 39, 75, 0.12) , 0 18px 88px -4px rgba(24, 39, 75, 0.14)",

        mobileNavShadow: "0px 5px 20px 0px rgba(0, 0, 0, 0.05)",

        closeButtonShadow: "0px 3px 8px 0px rgba(167, 174, 181, 0.4)",
      },
    },
  },
  plugins: [],
};
