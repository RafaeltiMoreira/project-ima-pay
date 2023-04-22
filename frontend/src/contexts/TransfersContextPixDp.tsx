import { ReactNode, useEffect, useState, useCallback } from "react";
import { api } from "../library/axios";
import { createContext } from "use-context-selector";

interface TransferPix {
    id: number;
    pix: string;
    price: number;
    description: string;
    category: string;
    type: "input" | "output";
    password: string;
    createdAt: string;
}

interface TransferDp {
    id: number;
    name: string;
    cpf: string;
    agency: string;
    account: string;
    price: number;
    description: string;
    category: string;
    type: "input" | "output";
    password: string;
    createdAt: string;
}

interface TransfersContextTypePix {
    transferspix: TransferPix[];
    fetchTransfersPix: (query?: string) => Promise<void>;
    createTransfersPix: (data: CreateTransfersDados) => Promise<void>;
}

interface TransfersContextTypeDp {
    transfersdp: TransferDp[];
    fetchTransfersDp: (query?: string) => Promise<void>;
    createTransfersDp: (data: CreateTransfersDp) => Promise<void>;
}

interface TransfersPixProviderProps {
    children: ReactNode;
}

interface TransfersDpProviderProps {
    children: ReactNode;
}

interface CreateTransfersDados {
    pix: string,
    price: number,
    description: string,
    category: string,
    type: "input" | "output",
    password: string,
}

interface CreateTransfersDp {
    name: string;
    cpf: string;
    agency: string;
    account: string;
    price: number;
    description: string;
    category: string;
    type: "input" | "output";
    password: string;
}

export const TransfersContextDp = createContext({} as TransfersContextTypeDp);
export const TransfersContextPix = createContext({} as TransfersContextTypePix);

export function TransfersProviderDp({ children }: TransfersDpProviderProps) {
    const [transfersdp, setTransfersDp] = useState<TransferDp[]>([])

    const fetchTransfersDp = useCallback(async (query?: string) => {
        const response = await api.get("/transfersdp", {
            params: {
                _sort: 'createdAt',
                _order: "desc",
                q: query,
            }
        })

        setTransfersDp(response.data);
    }, [],)

    const createTransfersDp = useCallback(async (data: CreateTransfersDp) => {
        const { name, cpf, agency, account, price, description, category, type, password } = data;

        const response = await api.post("/transfersdp", {
            name,
            cpf,
            agency,
            account,
            price,
            description,
            category,
            type,
            password,
            createdAt: new Date(),
        });

        setTransfersDp((state) => [response.data, ...state]);
    }, [],)

    useEffect(() => {
        fetchTransfersDp();
    }, [fetchTransfersDp])

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

export function TransfersProviderPix({ children }: TransfersPixProviderProps) {
    const [transferspix, setTransfers] = useState<TransferPix[]>([])

    const fetchTransfersPix = useCallback(async (query?: string) => {
        const response = await api.get("/transferspix", {
            params: {
                _sort: 'createdAt',
                _order: "desc",
                q: query,
            }
        })

        setTransfers(response.data);
    }, [],)

    const createTransfersPix = useCallback(async (data: CreateTransfersDados) => {
        const { pix, price, description, category, type, password } = data;

        const response = await api.post("/transferspix", {
            pix,
            price,
            description,
            category,
            type,
            password,
            createdAt: new Date(),
        });

        setTransfers((state) => [response.data, ...state]);
    }, [],)

    useEffect(() => {
        fetchTransfersPix();
    }, [fetchTransfersPix])

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