import {useRequest} from "shared/lib/hooks/useRequest/useRequest";
import {useCallback} from "react";
import {SendTicketBPParams} from "entities/Tickets/model/types/SendTicketBPSchema";
import {sendTicketBP} from "entities/Tickets/api/sendTicketBP/sendTicketBP";

interface SendMyTicketsBPHandlerProps {
    userData: User;
    setMessage?: (msg: string) => void;
    setError?: (error: string) => void;
    setIsLoading?: (isLoading: boolean) => void;
    onCloseModal?: () => void;
}


export const useSendMyTicketBP = (props: SendMyTicketsBPHandlerProps) => {
    const {
        userData,
        setError,
        setIsLoading,
        setMessage,
        onCloseModal
    } = props;
    const {id} = userData;
    const onSuccess = useCallback(() => {
        setMessage?.("Успешная отправка");
        onCloseModal?.();
    }, [setMessage, onCloseModal]);
    return useRequest<SendTicketBPParams, object, ResponsesInfoStructure>({
        request: useCallback((param: SendTicketBPParams) => (sendTicketBP({...param,
            userId:id,
        })), [id]),
        setError,
        setIsLoading,
        onSuccess
    });

};