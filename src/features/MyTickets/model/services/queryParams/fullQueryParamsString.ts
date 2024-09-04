import {objectValuesToString} from "shared/lib/helpers/typeCorrection/objectValuesToString";
import {initQueryParams} from "./initQueryParams";
import {GetTicketsParams} from "entities/Tickets/model/types/GetTicketsSchema";

export function fullJVQueryParamsString (
    params: GetTicketsParams,
    hiddenParams: GetTicketsParams,
    route:string = "tickets"):string {
    const finalParams = new URLSearchParams(
        objectValuesToString({...initQueryParams, ...params, ...hiddenParams})
    );
    return `${__API__}/${route}?${finalParams.toString()}`;
}