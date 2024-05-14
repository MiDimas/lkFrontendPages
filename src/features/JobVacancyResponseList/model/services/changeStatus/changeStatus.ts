import axios from "axios";
import {ChangeStatusParams} from "entities/JVResponse";

export async function changeStatus (
    params: ChangeStatusParams
): Promise<ResponsesStructure<null>> {
    try {
        const {
            id,
            status,
            additionalParams
        } = params;
        const {
            comment=null
        } = additionalParams;
        const response = await axios.patch<ResponsesStructure<null>>(
            `${__API__}/api/job-vacancy-response`,
            {
                id,
                status: status,
                comment: comment
            }
        );
        console.log(response.data);
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