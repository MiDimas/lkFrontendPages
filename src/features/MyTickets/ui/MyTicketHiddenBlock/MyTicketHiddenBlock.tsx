import {GetMyTicketsParams} from "../../model/types/MyTicketsSchema";
import {Dispatch, SetStateAction, useCallback, useMemo} from "react";
import {Select, SelectOption} from "shared/ui/Select/Select";
import {BaseTicketSort, TicketsDirection} from "entities/Tickets/model/types/GetTicketsSchema";

interface MyTicketHiddenBlockProps{
    params: GetMyTicketsParams;
    setParams: Dispatch<SetStateAction<GetMyTicketsParams>>
}

export function MyTicketHiddenBlock(props: MyTicketHiddenBlockProps) {
    const {
        params,
        setParams
    } = props;

    const sortOptions: SelectOption<BaseTicketSort>[] = useMemo(()=> ([
        {
            value: "ticket_date",
            content: "По дате билета"
        },
        {
            value: "update",
            content: "По дате обновления билета",
        },
        {
            value: "price",
            content: "По стоимости билета"
        }
    ]), []);

    const sortValue = params.sort;

    const changeSort = useCallback(
        (select?: BaseTicketSort) => {
            setParams((prevState) => {
                if(prevState.sort !== select){
                    return(
                        {...prevState, sort: select, page:1}
                    );
                }
                return prevState;
            });
        }, [setParams]
    );

    const directionOptions: SelectOption<TicketsDirection>[] = useMemo(()=> ([
        {
            value: "DESC",
            content: "По убыванию"
        },
        {
            value: "ASC",
            content: "По возрастанию"
        }
    ]), []);

    const directionValue = params.direction;

    const changeDirection = useCallback(
        (select?: TicketsDirection) => {
            setParams((prevState)=>  {
                if(prevState.direction !== select){
                    return {...prevState, direction: select, page:1};
                }
                return prevState;
            });
        }, [setParams]
    );


    return (
        <div>
            <div>
                <span>Сортировать по:</span>
                <Select
                    options={sortOptions}
                    value={sortValue}
                    onChange={changeSort}
                />
            </div>
            <div>
                <Select
                    options={directionOptions}
                    value={directionValue}
                    onChange={changeDirection}
                />
            </div>
        </div>
    );
}