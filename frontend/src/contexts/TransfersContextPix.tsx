import { createContext, ReactNode } from "react";
import { useEffect, useState } from "react";
import { api } from "../library/axios";

interface TransferPix {
    id: number;
    pix: string;
    value: number;
    description: string;
    category: string;
    type: "input" | "output";
    password: string;
    createdAt: string;
}

interface TransfersContextType {
    transferspix: TransferPix[];
    fetchTransfersPix: (query?: string) => Promise<void>;
    createTransfersPix: (data: CreateTransfersDados) => Promise<void>;
}

interface TransfersProviderProps {
    children: ReactNode;
}

interface CreateTransfersDados {
    pix: string,
    value: number,
    description: string,
    category: string,
    type: "input" | "output",
    password: string,
}

export const TransfersContextPix = createContext({} as TransfersContextType);

export function TransfersProvider({ children }: TransfersProviderProps) {
    const [transferspix, setTransfers] = useState<TransferPix[]>([])

    async function fetchTransfersPix(query?: string) {
        const response = await api.get("/transferspix", {
            params: {
                _sort: "createdAt",
                _order: "desc",
                q: query,
            }
        })

        setTransfers(response.data);
    }

    async function createTransfersPix(data: CreateTransfersDados) {
        const { pix, value, description, category, type, password } = data;

        const response = await api.post("transfers", {
            pix,
            value,
            description,
            category,
            type,
            password,
            createdAt: new Date(),
        });

        setTransfers(state => [response.data, ...state]);
    }

    useEffect(() => {
        fetchTransfersPix();
    }, [])

    return (
        <TransfersContextPix.Provider value={{
            transferspix,
            fetchTransfersPix,
            createTransfersPix,
        }}>
            {children}
        </TransfersContextPix.Provider>
    )
}