import {ResponsesStatisticSchema} from "../../model/types/ResponsesStatisticSchema";
import axios from "axios";
import {DEFAULT_RESPONSE_OBJECT} from "shared/lib/consts/response";

export async function getAllStatistic ():Promise<ResponsesStructure<ResponsesStatisticSchema>> {
    try {
        const res = await axios.get<ResponsesStructure<ResponsesStatisticSchema>>(
            `${__API__}/api/job-vacancy-statistic`
        );

        return res.data;
    }
    catch (e) {
        return DEFAULT_RESPONSE_OBJECT;
    }
}