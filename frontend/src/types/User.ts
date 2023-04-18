import { Address } from "./Address";

export type User = {
    Nome: string;
    Cpf: string;
    Email: string;
    Senha: string;
    Celular: string;
    Saldo?: number;
    Agencia?: string;
    Conta?: string;
    Endereco?: Address;
};