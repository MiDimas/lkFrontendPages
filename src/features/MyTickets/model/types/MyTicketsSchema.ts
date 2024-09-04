import {BaseTicketSort, GetTicketsParams} from "entities/Tickets/model/types/GetTicketsSchema";

export interface GetMyTicketsParams extends Omit<GetTicketsParams, "user_id"|"resolved"|"ticket"|"update"|"sort">{
    sort?: BaseTicketSort;
}

