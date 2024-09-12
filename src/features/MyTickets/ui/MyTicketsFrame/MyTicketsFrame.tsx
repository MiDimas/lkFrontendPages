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

    const [selectTicket, setSelectTicket] = useState<number>();
    const [dataSelectTicket, setDataSelectTicket] = useState<TicketSchema>();
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

    useEffect(() => {
        if (data?.length && selectTicket){
            for (const value of data){
                if(value.id === selectTicket) {
                    setDataSelectTicket(value);
                    break;
                }
            }
        }
    }, [selectTicket, data]);

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

    const updateTicket = useCallback((ticketId: number, newState: Partial<TicketSchema>) => {
        setData(prevState=> {
            if(prevState?.length){
                for(let item=0; item< prevState.length; item++){
                    const value = prevState[item];
                    if (value.id === ticketId){
                        prevState[item] = {...value, ...newState};
                        console.log("updated", item);
                        break;
                    }
                }
                prevState = [...prevState];
            }
            return prevState;
        });
    }, [setData]);

    const sendTicketsBP = useSendMyTicketBP({
        onCloseModal: onClose,
        userData: user,
        setError,
        setMessage: msg => setMessage({text:msg, severity: "success"}),
        setIsLoading: setIsLoadingModal,
        updateTicket
    });

    const onOpenTicketBPLoad = useCallback((id: number) => {
        setSelectTicket(id);
        onOpen();
    }, [setSelectTicket, onOpen]);

    const onCloseTicketBPLoad = useCallback(() => {
        onClose();
        setSelectTicket(undefined);
    }, [onClose, setSelectTicket]);

    

    return (
        <div className={cls.main}>
            <MyTicketHiddenBlock params={params} setParams={setParams}/>
            <div className={cls.content}>
                <BPContext.Provider value={{setTicketId: onOpenTicketBPLoad}}>
                    <TicketsList tickets={data} isLoading={true} error={error}/>
                </BPContext.Provider>
            </div>
            <div className={cls.pageBtns}>
                <PaginationMenu

                    lastPage={info?.pagesCount}
                    selectedPage={params.page}
                    onChangePage={onChangePage}
                />
            </div>
            <TicketBPLoadModal
                isLoading={isLoadingModal}
                isOpen={isOpen}
                onClose={onCloseTicketBPLoad}
                ticketId={selectTicket}
                ticketInfo={dataSelectTicket}
                userId={user.id}
                onSend={sendTicketsBP}
            />
            <Popup />
        </div>
    );
});

MyTicketsFrame.displayName = "MyTicketFrame";
