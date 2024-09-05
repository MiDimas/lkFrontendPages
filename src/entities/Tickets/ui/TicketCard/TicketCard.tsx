import {TicketSchema} from "../../model/types/TicketSchema";
import {Card} from "shared/ui/Card/Card";
import {classNames} from "shared/lib/classNames/classNames";
import cls from "./TicketCard.module.css";
import {DropdownCard} from "shared/ui/DropdownCard/DropdownCard";

interface TicketCardProps{
    ticket: TicketSchema;
    className?: string;
}

export function TicketCard(props: TicketCardProps){
    const { ticket, className } = props;


    return (
        <DropdownCard 
            hideContent={
                (<Card>
                    <div>{ticket.boarding_pass}</div>
                </Card>)
            }
            buttonPosition={"left"}
        >
            <Card className={classNames(cls.card, {}, [className])}>
                {ticket.city_name &&  <div><span>Город: </span>{ticket.city_name}</div>}
                {ticket.region_name &&  <div><span>Участок: </span>{ticket.region_name}</div>}
            </Card>
        </DropdownCard>
    );
}