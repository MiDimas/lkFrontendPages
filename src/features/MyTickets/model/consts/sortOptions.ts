import {BaseTicketSort} from "entities/Tickets/model/types/GetTicketsSchema";
import {SelectOption} from "shared/ui/Select/Select";

export const myTicketSortOptions: SelectOption<BaseTicketSort>[] = [
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
];