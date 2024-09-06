export interface TicketSchema {
    id: number;
    profile_id: number;
    profile_name?:string;
    status: number;
    city?: string;
    region?: string;
    price: number;
    ticket_date: string;
    date_update: string;
    city_name?: string;
    region_name?: string;
    boarding_id?: number;
    boarding_pass?: string;
    approve?: number;
    boarding_upload?: string;
    boarding_update?: string;
    status_name: string;
}

export interface TicketInfoSchema extends ResponsesInfoStructure{
    allCount?: number;
    pagesCount?: number;
    hasNext?: boolean;
    update?: boolean;
}