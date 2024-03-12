export interface JVResponses  {
    id: number;
    fio: string;
    email?: string;
    phone?: string;
    birth_date?: string;
    country?: number;
    job_title: string;
    status: number;
    worker?: number;
    comment?: string;
    category?: number;
    identifier?: number;
    created_at: string;
    updated_at: string;
    categoryName?: string;
    identifierName?: string;
    statusName?: string;
}

export interface ResponsesStructure<T> {
    result: number;
    desc:string;
    data?: T[] | [];
    info: {
        id?: number;
        count: number;
    }
}

export interface GetJVResponsesParams {
    limit?:number;
    sort?: "updated" | "created" | "fio" | "id";
    order?: "ASC" | "DESC";
    page?: number;
    status?: number;
    worker?: number;
    category?: number;
    identifier?: number;
}