import {ResponsesStatisticSchema} from "../../model/types/ResponsesStatisticSchema";
import axios from "axios";
import {DEFAULT_RESPONSE_OBJECT} from "shared/lib/consts/response";
import {RequestStatisticParams} from "../../model/types/requestStatisticParams";

export async function getAllStatistic (params: RequestStatisticParams):
    Promise<
        ResponsesStructure<
            ResponsesStatisticSchema
        >
    > {
    try {
        const res = await axios.get<ResponsesStructure<ResponsesStatisticSchema>>(
            `${__API__}/api/job-vacancy-statistic`,
            {
                params
            }
        );
        console.log(res.data);
        return res.data;
    }
    catch (e) {
        return DEFAULT_RESPONSE_OBJECT;
    }
}