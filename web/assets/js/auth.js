import { http, setToken, getToken } from "./api.js";

// ----------------------
// Verifica se o usuário está autenticado
// ----------------------
export function requireAuth() {
  const token = getToken();
  if (!token) {
    window.location.href = "index.html"; // redireciona para login
  }
}

// ----------------------
// Realiza o login
// ----------------------
export async function doLogin(email, senha) {
  try {
    const data = await http.post("/usuarios/login", { email, senha });

    if (!data?.token) {
      throw new Error(data?.erro || "Credenciais inválidas");
    }

    setToken(data.token);
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    alert("Falha no login. Verifique suas credenciais e tente novamente.");
    throw error;
  }
}

// ----------------------
// Logout
// ----------------------
export function logout() {
  setToken(null);
  window.location.href = "index.html";
}

// ----------------------
// Ping (verifica se o servidor está online)
// ----------------------
export async function ping() {
  try {
    await http.get("/health");
  } catch {
    console.warn("Servidor indisponível no momento.");
  }
}
