import { User } from "./User";

export type Address = {
    Cep: string;
    Rua: string;
    Numero: string;
    Bairro: string;
    Cidade: string;
    Estado: string;
    user: User;
}