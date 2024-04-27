import {GetJVResponsesParams, JVOrderSchema, JVSortSchema} from "../../types/JVResponsesSchema";
import {initQueryJVRParams} from "./initQueryJVRParams";

export function loadJVQueryParams (
    searchParams: URLSearchParams,
):GetJVResponsesParams {
    const sort = searchParams.get("sort") as JVSortSchema;
    const order  = searchParams.get("order") as JVOrderSchema;
    const status = Number(searchParams.get("status"));
    const worker = Number(searchParams.get("worker"));
    const category = Number(searchParams.get("category"));
    const page = Number(searchParams.get("page"));
    // const identifier = Number(searchParams.get("identifier"));
    return {
        sort:  sort ? sort : initQueryJVRParams.sort,
        order: order ? order : initQueryJVRParams.order,
        status: isNaN(status) || (!status && status!==0) ? initQueryJVRParams.status : status,
        worker: isNaN(worker) || !worker ? initQueryJVRParams.worker : worker,
        category: isNaN(category) || !category? initQueryJVRParams.category : category,
        page: isNaN(page) || !page ? initQueryJVRParams.page : page
        // identifier: isNaN(identifier) ? undefined : identifier,
    };

}