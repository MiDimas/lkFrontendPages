import {createContext, ReactNode} from "react";

export interface BPContextParams {
    setTicketId?: (ticketId: number) => void;
}

export const BPContext = createContext<BPContextParams>({});