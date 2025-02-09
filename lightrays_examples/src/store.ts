import { ref } from "vue";

export const theme = ref(window.matchMedia("(prefers-color-scheme: dark)").matches ? "auto-dark" : "auto-light");
