import {useRequest} from "shared/lib/hooks/useRequest/useRequest";
import {useCallback} from "react";
import {SendTicketBPParams} from "entities/Tickets/model/types/SendTicketBPSchema";
import {sendTicketBP} from "entities/Tickets/api/sendTicketBP/sendTicketBP";
import {TicketSchema} from "entities/Tickets/model/types/TicketSchema";

interface SendMyTicketsBPHandlerProps {
    userData: User;
    setMessage?: (msg: string) => void;
    setError?: (error: string) => void;
    setIsLoading?: (isLoading: boolean) => void;
    onCloseModal?: () => void;
    updateTicket?: (ticketId: number, newTicket: Partial<TicketSchema>) => void;
}


export const useSendMyTicketBP = (props: SendMyTicketsBPHandlerProps) => {
    const {
        userData,
        setError,
        setIsLoading,
        setMessage,
        onCloseModal,
        updateTicket
    } = props;
    const {id} = userData;
    const onSuccess = useCallback((params?:SendTicketBPParams) => {
        setMessage?.("Успешная отправка");
        if(params?.ticket){
            updateTicket?.(params.ticket, {status_name: "на рассмотрении", status: 2});
        }
        onCloseModal?.();
    }, [setMessage, onCloseModal, updateTicket]);
    return useRequest<SendTicketBPParams, object, ResponsesInfoStructure>({
        request: useCallback((param: SendTicketBPParams) => (sendTicketBP({...param,
            userId:id,
        })), [id]),
        setError,
        setIsLoading,
        onSuccess
    });

};