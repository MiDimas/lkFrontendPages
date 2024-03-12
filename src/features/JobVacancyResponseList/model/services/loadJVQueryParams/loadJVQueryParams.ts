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
    // const category = Number(searchParams.get("category"));
    // const identifier = Number(searchParams.get("identifier"));
    return {
        sort:  sort ? sort : undefined,
        order: order ? order : undefined,
        status: isNaN(status) || !status ? undefined : status,
        worker: isNaN(worker) || !worker ? undefined : worker,
        // category: isNaN(category) ? undefined : category,
        // identifier: isNaN(identifier) ? undefined : identifier,
    };

}