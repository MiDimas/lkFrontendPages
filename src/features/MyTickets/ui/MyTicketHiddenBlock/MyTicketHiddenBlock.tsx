import {GetMyTicketsParams} from "../../model/types/MyTicketsSchema";
import {Dispatch, SetStateAction, useCallback, useMemo} from "react";
import {Select, SelectOption} from "shared/ui/Select/Select";
import {BaseTicketSort, TicketsDirection} from "entities/Tickets/model/types/GetTicketsSchema";
import {myTicketSortOptions} from "../../model/consts/sortOptions";
import {ticketDirectionOptions} from "../../model/consts/directionOptions";
import cls from "./MyTicketHiddenBlock.module.css";
interface MyTicketHiddenBlockProps{
    params: GetMyTicketsParams;
    setParams: Dispatch<SetStateAction<GetMyTicketsParams>>
}

export function MyTicketHiddenBlock(props: MyTicketHiddenBlockProps) {
    const {
        params,
        setParams
    } = props;
    const {
        sort,
        direction
    } = params;

    const sortOptions: SelectOption<BaseTicketSort>[] = myTicketSortOptions;

    const sortValue = sort;

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

    const directionOptions: SelectOption<TicketsDirection>[] = ticketDirectionOptions;

    const directionValue = direction;

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
        <div className={cls.container}>
            <div className={cls.element}>
                <span>Сортировать по:</span>
                <Select
                    options={sortOptions}
                    value={sortValue}
                    onChange={changeSort}
                />
            </div>
            <div className={cls.element}>
                <Select
                    options={directionOptions}
                    value={directionValue}
                    onChange={changeDirection}
                />
            </div>
        </div>
    );
}