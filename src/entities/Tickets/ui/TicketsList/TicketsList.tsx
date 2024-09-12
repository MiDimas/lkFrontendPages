import {memo} from "react";
import {TicketSchema} from "../../model/types/TicketSchema";
import {TicketCard} from "../TicketCard/TicketCard";
import {classNames} from "shared/lib/classNames/classNames";
import cls from "./TicketsList.module.css";
import {TicketCardLoader} from "../TicketCard/TicketCardLoader";

interface TicketsListProps {
    tickets?: TicketSchema[];
    isLoading?: boolean;
    error?:  string;
}
const listLoaders = [1,2,3];

export const TicketsList = memo((props: TicketsListProps) => {
    const {
        tickets,
        isLoading=true,
        error
    } = props;
    if(isLoading){
        return (<div className={classNames(cls.list, {}, [])}>
            {listLoaders.map((value)=> (<TicketCardLoader key={value}/>))}
        </div>);
    }
    if(!tickets){
        return (<div className={classNames(cls.list, {}, [])}>
            Ошибка получения данных {error}
        </div>);
    }
    if (!tickets.length) {
        return (
            <div className={classNames(cls.list, {}, [])}>
                Отсутствуют билеты
            </div>
        );
    }
    return (
        <div className={classNames(cls.list, {}, [])}>
            {tickets.map((value, index) => (
                <TicketCard
                    key={value.id}
                    ticket={value}
                />
            ))}
        </div>
    );
});

TicketsList.displayName = "TicketsList";