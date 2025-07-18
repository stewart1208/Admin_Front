import api from "@/Services/api";
import Cookies from "js-cookie";


export const login = async (email, password) => {
    try {
        const response = await api.post("auth/login", { email, password })

        const { token, admin } = response.data;

        Cookies.set("token", token, { expires: 99, secure: true, sameSite: "Strict" });
        localStorage.setItem("admin", JSON.stringify(admin));

        window.dispatchEvent(new Event("adminLogin")); // Notifier les autres composants
        window.location.reload(); 

        window.location.href = "/pecherie/";

        return { token, admin };
    } catch (error) {
        throw new Error(error.response?.data?.error || "Erreur de connexion");
    }
};

export const logout = () => {
    Cookies.remove("token"); 
    localStorage.removeItem("admin");
};
