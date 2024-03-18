import {GetJVResponsesParams} from "../../types/JVResponsesSchema";
import axios from "axios";
import {addQueryParams} from "shared/lib/url/addQueryParams/addQueryParams";
import {JVResponseSchema} from "entities/JVResponse";


export async function getJVResponses (props:GetJVResponsesParams): Promise<ResponsesStructure<JVResponseSchema[]>> {

    try {
        addQueryParams<GetJVResponsesParams>(props);
        const response = await axios.get<ResponsesStructure<JVResponseSchema[]>>(
            `${__API__}/api/job-vacancy-response`,
            {
                params: {
                    ...props
                }
            }
        );
        return response.data;
    }
    catch(e) {
        return new Promise((resolve) => resolve({
            result:0,
            desc: "Ошибка на стороне клиента",
            data: [],
            info: {count:0}
        }));
    }
}