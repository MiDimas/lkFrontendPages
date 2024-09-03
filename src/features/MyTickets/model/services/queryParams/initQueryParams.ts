import {GetMyTicketsParams} from "../../types/MyTicketsSchema";

export const initQueryParams:GetMyTicketsParams = {
    page: 1,
    status: 0,
    limit: 10,
    sort: "ticket_date",
    direction: "DESC"
};

export const stringInitQueryParams = JSON.stringify(initQueryParams);