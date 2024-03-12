import {JVResponses, GetJVResponsesParams, ResponsesStructure} from "../../types/JVResponses";
import axios, {AxiosResponse} from "axios";

const api = __API__;

export async function getJVResponses (props:GetJVResponsesParams): Promise<ResponsesStructure<JVResponses>> {
    console.log(api);
    const response = await axios.get<ResponsesStructure<JVResponses>,
        AxiosResponse<ResponsesStructure<JVResponses>>
    >(
        `${__API__}/api/job-vacancy-response`,
        {
            params: {
                ...props
            }
        }
    );
    console.log(response);
    return response.data;
}