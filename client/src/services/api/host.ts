const host = window.location.origin
export const baseURL = import.meta.env.MODE == "development"
    ? host.replace("5173", "3000")
    : ""
console.log(baseURL)