import {SelectOption} from "shared/ui/Select/Select";
import {TicketsDirection} from "entities/Tickets/model/types/GetTicketsSchema";

export const ticketDirectionOptions: SelectOption<TicketsDirection>[] = [
    {
        value: "DESC",
        content: "По убыванию"
    },
    {
        value: "ASC",
        content: "По возрастанию"
    }
];