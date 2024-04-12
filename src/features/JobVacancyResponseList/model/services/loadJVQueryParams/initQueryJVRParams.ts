import {GetJVResponsesParams} from "../../types/JVResponsesSchema";

export const initQueryJVRParams: GetJVResponsesParams = {
    sort: "updated",
    order: "DESC",
    status: 0,
    worker: 0,
    category: 0,
    page: 1,
};

export const stringInitQueryJVRParams = JSON.stringify(initQueryJVRParams);