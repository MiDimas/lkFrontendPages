export interface GetTicketsParams {
    user_id?: number;
    update?: boolean;
    ticket?: number;
    resolved?: boolean;
    status?: number;
    limit?: number;
    page?: number;
    sort?: TicketsSort;
    direction?: MyTicketsDirection;
}

export interface GetMyTicketsParams extends Omit<GetTicketsParams, "user_id"|"resolved"|"ticket"|"update"|"sort">{
    sort?: MyTicketsSort;
}

export type MyTicketsDirection = "ASC" | "DESC";
export type MyTicketsSort = "ticket_date" | "update" | "price";
export type TicketsSort = MyTicketsSort | "ticket_id" | "created" |  "boarding_update" | "boarding_upload";