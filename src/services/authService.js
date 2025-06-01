// src/services/authService.js
export async function resetarSenha(email) {
  // Aqui você pode colocar a lógica para resetar senha sem Firebase,
  // por exemplo, uma requisição para sua API
  if (!email) throw new Error("Email é obrigatório");

  // Exemplo simulado de sucesso
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Email para reset enviado com sucesso");
    }, 1000);
  });
}
