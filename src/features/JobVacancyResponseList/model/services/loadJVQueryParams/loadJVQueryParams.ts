import {
    GetJVResponsesParams,
    JVOrderSchema,
    JVSortSchema
} from "../../types/JVResponsesSchema";

export function loadJVQueryParams (
    searchParams: URLSearchParams,
):GetJVResponsesParams {
    const sort = searchParams.get("sort") as JVSortSchema;
    const order  = searchParams.get("order") as JVOrderSchema;
    const status = Number(searchParams.get("status"));
    const worker = Number(searchParams.get("worker"));
    const category = Number(searchParams.get("category"));
    // const identifier = Number(searchParams.get("identifier"));
    return {
        sort:  sort ? sort : "updated",
        order: order ? order : "DESC",
        status: isNaN(status) || !status ? 0 : status,
        worker: isNaN(worker) || !worker ? 0 : worker,
        category: isNaN(category) || !category? 0 : category,
        // identifier: isNaN(identifier) ? undefined : identifier,
    };

}