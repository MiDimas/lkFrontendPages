import {memo, useCallback, useEffect, useMemo, useState} from "react";
import {PaginationMenu} from "shared/ui/PaginationMenu/PaginationMenu";
import {MyTicketHiddenBlock} from "../MyTicketHiddenBlock/MyTicketHiddenBlock";
import {loadQueryParams} from "../../model/services/queryParams/loadQueryParams";
import {GetMyTicketsParams} from "../../model/types/MyTicketsSchema";
import {addQueryParams} from "shared/lib/url/addQueryParams/addQueryParams";
import {useGetMyTicketsHandler} from "../../api/useGetMyTicketsHandler/useGetMyTicketsHandler";
import {TicketInfoSchema, TicketSchema} from "entities/Tickets/model/types/TicketSchema";
import {TicketsList} from "entities/Tickets";

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

    return (
        <div>
            <MyTicketHiddenBlock params={params} setParams={setParams}/>
            <div>
                {data
                    ? <TicketsList tickets={data} />
                    : <div>Ошибка получения данных</div>
                }
            </div>
            <PaginationMenu lastPage={info?.pagesCount}
                selectedPage={params.page}
                onChangePage={onChangePage}
            />
        </div>
    );
});

MyTicketsFrame.displayName = "MyTicketFrame";
