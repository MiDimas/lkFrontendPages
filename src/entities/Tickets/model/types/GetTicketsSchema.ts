export interface GetTicketsParams {
    user_id?: number;
    update?: boolean;
    ticket?: number;
    resolved?: boolean;
    status?: number;
    limit?: number;
    page?: number;
    sort?: TicketsSort;
    direction?: TicketsDirection;
}

export type TicketsDirection = "ASC" | "DESC";
export type BaseTicketSort = "ticket_date" | "update" | "price";
export type TicketsSort = BaseTicketSort | "ticket_id" | "created" |  "boarding_update" | "boarding_upload";

