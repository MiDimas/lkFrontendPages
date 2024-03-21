import {JVResponseSchema} from "entities/JVResponse";
import axios from "axios";

export async function changeData (state: JVResponseSchema): Promise<ResponsesStructure<null>> {
    try {
        const response = await axios.put<ResponsesStructure<null>>(
            `${__API__}/api/job-vacancy-response`,
            {...state}
        );
        return response.data;
    }
    catch (e) {
        return {
            result:0,
            desc: "Ошибка на стороне клиента",
            data: null,
            info: {count:0}
        };
    }
}