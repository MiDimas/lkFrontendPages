import {ResponsesStatisticSchema} from "../../model/types/ResponsesStatisticSchema";
import axios from "axios";

export async function getAllStatistic ():Promise<ResponsesStructure<ResponsesStatisticSchema[]>> {
    try {
        const res = await axios.get<ResponsesStructure<ResponsesStatisticSchema[]>>(
            `${__API__}/api/job-vacancy-statistic`
        );

        return res.data;
    }
    catch (e) {
        return {
            result: 0,
            data: undefined,
            desc: "Ошибка клиента",
            info: {count: 0}
        };
    }
}