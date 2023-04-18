export function validateLogin(cpf: string, password: string): string | null {
    if (cpf === "" || password === "") {
      return "Digite o cpf e senha";
    }
  
    return null;
}