import {TicketSchema} from "../../model/types/TicketSchema";
import {Card} from "shared/ui/Card/Card";
import {classNames} from "shared/lib/classNames/classNames";
import cls from "./TicketCard.module.css";
import {DropdownCard} from "shared/ui/DropdownCard/DropdownCard";
import {TicketMainInfo} from "../TicketMainInfo/TicketMainInfo";

interface TicketCardProps{
    ticket: TicketSchema;
    className?: string;
}

export function TicketCard(props: TicketCardProps){
    const { ticket, className } = props;


    return (
        <DropdownCard className={cls.card}
            hideContent={
                <div>{ticket.boarding_pass}</div>
            }
            buttonPosition={"end"}
            buttonBlock={
                <div> button  </div>
            }
            classNameButtonBlock={cls.button_block}
        >
            <TicketMainInfo
                {...ticket}
            />
        </DropdownCard>
    );
}