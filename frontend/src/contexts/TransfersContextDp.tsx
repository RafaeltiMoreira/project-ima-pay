import { createContext, ReactNode } from "react";
import { useEffect, useState } from "react";
import { api } from "../library/axios";

interface TransferDp {
    id: number;
    name: string;
    cpf: string;
    agency: string;
    account: string;
    value: number;
    description: string;
    category: string;
    type: "input" | "output";
    password: string;
    createdAt: string;
}

interface TransfersContextType {
    transfersdp: TransferDp[];
    fetchTransfersDp: (query?: string) => Promise<void>;
    createTransfersDp: (data: CreateTransfersDp) => Promise<void>;
}

interface TransfersProviderProps {
    children: ReactNode;
}

interface CreateTransfersDp {
    name: string;
    cpf: string;
    agency: string;
    account: string;
    value: number;
    description: string;
    category: string;
    type: "input" | "output";
    password: string;
}

export const TransfersContextDp = createContext({} as TransfersContextType);

export function TransfersProviderDp({ children }: TransfersProviderProps) {
    const [transfersdp, setTransfersDp] = useState<TransferDp[]>([])

    async function fetchTransfersDp(query?: string) {
        const response = await api.get("/transfersdp", {
            params: {
                _sort: "createdAt",
                _order: "desc",
                q: query,
            }
        })

        setTransfersDp(response.data);
    }

    async function createTransfersDp(data: CreateTransfersDp) {
        const { name, cpf, agency, account, value, description, category, type, password } = data;

        const response = await api.post("transfers", {
            name,
            cpf,
            agency,
            account,
            value,
            description,
            category,
            type,
            password,
            createdAt: new Date(),
        });

        setTransfersDp(state => [response.data, ...state]);
    }

    useEffect(() => {
        fetchTransfersDp();
    }, [])

    return (
        <TransfersContextDp.Provider value={{
            transfersdp,
            fetchTransfersDp,
            createTransfersDp,
        }}>
            {children}
        </TransfersContextDp.Provider>
    )
}