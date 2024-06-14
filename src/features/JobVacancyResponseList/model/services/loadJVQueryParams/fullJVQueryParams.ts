import {GetJVResponsesParams} from "../../types/JVResponsesSchema";
import {initQueryJVRParams} from "./initQueryJVRParams";
import {objectValuesToString} from "shared/lib/helpers/typeCorrection/objectValuesToString";

export function fullJVQueryParamsString (params: GetJVResponsesParams, route:string = "job-vacancy-response"):string {
    const finalParams = new URLSearchParams(
        objectValuesToString({...initQueryJVRParams, ...params})
    );
    return `${__API__}/${route}?${finalParams.toString()}`;
}