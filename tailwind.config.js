module.exports = {
    mode: "jit",
    purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    important: true,
    theme: {
        extend: { spacing: { 35: "35px" } },
    },

    plugins: [],
};