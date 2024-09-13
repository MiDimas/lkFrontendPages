import {useRequest} from "shared/lib/hooks/useRequest/useRequest";
import {Dispatch, SetStateAction, useCallback} from "react";
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
    setData?: Dispatch<SetStateAction<TicketSchema[]|undefined>>;
}


export const useSendMyTicketBP = (props: SendMyTicketsBPHandlerProps) => {
    const {
        userData,
        setError,
        setIsLoading,
        setMessage,
        onCloseModal,
        updateTicket,
        setData
    } = props;
    const {id} = userData;
    const onSuccess = useCallback(() => {
        setMessage?.("Успешная отправка");
        onCloseModal?.();
    }, [setMessage, onCloseModal]);

    const setDataHandler = useCallback((ticket?:TicketSchema|null)=> {
        if(ticket){
            setData?.((prev) => {
                if(prev?.length){
                    for (let i=0; i<prev.length; i++){
                        if(prev[i].id === ticket.id){
                            prev[i] = ticket;
                            prev = [...prev];
                            break;
                        }
                    }
                }
                return prev;
            });
        }
    }, [setData]);
    return useRequest<SendTicketBPParams, TicketSchema|null, ResponsesInfoStructure>({
        request: useCallback((param: SendTicketBPParams) => (sendTicketBP({...param,
            userId:id,
        })), [id]),
        setError,
        setIsLoading,
        onSuccess,
        setData: setDataHandler
    });

};