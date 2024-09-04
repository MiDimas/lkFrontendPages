import {GetMyTicketsParams} from "../../types/MyTicketsSchema";
import {initQueryParams} from "./initQueryParams";
import {BaseTicketSort, TicketsDirection, TicketsSort} from "entities/Tickets/model/types/GetTicketsSchema";

export function loadQueryParams (
    searchParams: URLSearchParams,
): GetMyTicketsParams {
    const page = Number(searchParams.get("page"));
    const status = Number(searchParams.get("status"));
    // const limit = Number(searchParams.get("limit"));

    const sort = searchParams.get("sort") as BaseTicketSort | undefined;
    const direction = searchParams.get("direction") as TicketsDirection | undefined;

    const finalObj:GetMyTicketsParams = {
        page: isNaN(page) || !page ? initQueryParams.page : page,
        // limit: isNaN(limit) || !limit ? initQueryParams.limit : limit,
        sort: sort ? sort : initQueryParams.sort,
        direction: direction ? direction : initQueryParams.direction,
    };
    if(!isNaN(status) && status){
        finalObj.status = status;
    }
    return finalObj;
}
