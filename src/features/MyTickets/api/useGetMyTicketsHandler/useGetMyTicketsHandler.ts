import {getTickets} from "entities/Tickets/api/getTickets/getTickets";
import {TicketInfoSchema, TicketSchema} from "entities/Tickets/model/types/TicketSchema";
import {GetMyTicketsParams} from "../../model/types/MyTicketsSchema";
import {useRequest} from "shared/lib/hooks/useRequest/useRequest";
import {useCallback} from "react";

interface GetMyTicketsHandlerProps {
    userData: User;
    setData?: (data: TicketSchema[]) => void;
    setInfo?: (info: TicketInfoSchema) => void;
    setError?: (error: string) => void;
    setIsLoading?: (isLoading: boolean) => void;
}


export const useGetMyTicketsHandler = (props: GetMyTicketsHandlerProps) => {
    const {
        userData,
        setData,
        setInfo,
        setError,
        setIsLoading
    } = props;
    const {id} = userData;
    return useRequest<GetMyTicketsParams, TicketSchema[], TicketInfoSchema>({
        request: useCallback((param: GetMyTicketsParams) => (getTickets({...param,
            user_id:id,
            resolved: undefined,
        })), [id]),
        setData,
        setInfo,
        setError,
        setIsLoading
    });

};