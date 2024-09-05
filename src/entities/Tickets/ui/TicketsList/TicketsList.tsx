import {memo} from "react";
import {TicketSchema} from "../../model/types/TicketSchema";
import {TicketCard} from "../TicketCard/TicketCard";
import {classNames} from "shared/lib/classNames/classNames";
import cls from "./TicketsList.module.css";

interface TicketsListProps {
    tickets: TicketSchema[];
}

export const TicketsList = memo((props: TicketsListProps) => {
    const {
        tickets
    } = props;
    if (!tickets.length){
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