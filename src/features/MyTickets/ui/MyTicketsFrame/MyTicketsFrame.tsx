import {createContext, memo, useCallback, useEffect, useMemo, useState} from "react";
import {PaginationMenu} from "shared/ui/PaginationMenu/PaginationMenu";
import {MyTicketHiddenBlock} from "../MyTicketHiddenBlock/MyTicketHiddenBlock";
import {loadQueryParams} from "../../model/services/queryParams/loadQueryParams";
import {GetMyTicketsParams} from "../../model/types/MyTicketsSchema";
import {addQueryParams} from "shared/lib/url/addQueryParams/addQueryParams";
import {useGetMyTicketsHandler} from "../../api/useGetMyTicketsHandler/useGetMyTicketsHandler";
import {TicketInfoSchema, TicketSchema} from "entities/Tickets/model/types/TicketSchema";
import {TicketsList} from "entities/Tickets";
import cls from "./MyTicketsFrame.module.css";
import {useSendMyTicketBP} from "../../api/useSendMyTicketBP/useSendMyTicketBP";
import {usePopUpMsg} from "shared/lib/hooks/usePopUpMsg/usePopUpMsg";
import {useModalState} from "shared/lib/hooks/useModalState/useModalState";
import {TicketBPLoadModal} from "entities/Tickets/ui/TicketBPLoadModal/TicketBPLoadModal";
import {BPContext} from "entities/Tickets/model/services/BPContext";

interface MyTicketsProps {
    user: User;
}
export const MyTicketsFrame = memo((props: MyTicketsProps) => {
    const [params, setParams] = useState<GetMyTicketsParams>(
        loadQueryParams(new URLSearchParams(window.location.search))
    );
    const {user} = props;
    const [data, setData] = useState<TicketSchema[]>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] =  useState<string>();
    const [info, setInfo]  = useState<TicketInfoSchema>();
    const [isLoadingModal, setIsLoadingModal] = useState(false);

    const [selectTicket, setSelectTicket] = useState<number|null>(null);
    
    const {onOpen, isOpen, onClose} = useModalState(false);
    
    const {Component: Popup, setMessage} = usePopUpMsg(1000);

    const getTickets =  useGetMyTicketsHandler({
        userData: user,
        setData,
        setIsLoading,
        setError,
        setInfo
    });
    useEffect(() => {
        addQueryParams(params);
        getTickets(params);
    }, [getTickets, params]);

    const onChangePage = useCallback((page?: number) => {
        if(!page) return;
        setParams((prevState)=> {
            if(prevState.page ===page){
                return prevState;
            }
            return {
                ...prevState,
                page: page
            };
        });
    }, []);

    const sendTicketsBP = useSendMyTicketBP({
        onCloseModal: onClose,
        userData: user,
        setError,
        setMessage: msg => setMessage({text:msg, severity: "success"}),
        setIsLoading: setIsLoadingModal
    });

    const onOpenTicketBPLoad = useCallback((id: number) => {
        setSelectTicket(id);
        onOpen();
    }, [setSelectTicket, onOpen]);

    const onCloseTicketBPLoad = useCallback(() => {
        onClose();
        setSelectTicket(null);
    }, [onClose, setSelectTicket]);


    return (
        <div className={cls.main}>
            <MyTicketHiddenBlock params={params} setParams={setParams}/>
            <div className={cls.content}>
                {data
                    ? <BPContext.Provider value={{setTicketId: onOpenTicketBPLoad}}>
                        <TicketsList tickets={data} />
                    </BPContext.Provider>
                    : <div>Ошибка получения данных</div>
                }
            </div>
            <PaginationMenu lastPage={info?.pagesCount}
                selectedPage={params.page}
                onChangePage={onChangePage}
            />
            <TicketBPLoadModal isOpen={isOpen}
                onClose={onCloseTicketBPLoad}
            />
        </div>
    );
});

MyTicketsFrame.displayName = "MyTicketFrame";
