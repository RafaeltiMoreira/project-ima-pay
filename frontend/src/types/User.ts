import { Address } from "./Address";

export type User = {
    id: number;
    name: string;
    cpf: string;
    email: string;
    password: string;
    celular: string;
    saldo?: number;
    agencia?: string;
    conta?: string;
    endereco?: Address;
};