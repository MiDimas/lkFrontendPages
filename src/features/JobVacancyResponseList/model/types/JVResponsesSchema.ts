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
export type JVSortSchema = "updated" | "created" | "fio" | "id";
export type JVOrderSchema = "ASC" | "DESC";