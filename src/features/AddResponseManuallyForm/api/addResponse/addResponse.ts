import axios from "axios";
import {AddResponseSchema} from "../../model/types/AddResponseSchema";

export async function addResponse (params: AddResponseSchema): Promise<ResponsesStructure<null>> {
    try {
        const res = await axios.post<ResponsesStructure<null>>(
            `${__API__}/api/job-vacancy-response`,
            {...params, category: 3}
        );
        return res.data;
    }
    catch (e) {
        return {
            result: 0,
            data: null,
            info: {count:0},
            desc: "Ошибка клиента"
        };
    }
}