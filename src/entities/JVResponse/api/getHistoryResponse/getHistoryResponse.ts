import {JVResponseHistorySchema} from "../../model/types/JVResponseHistorySchema";
import {DEFAULT_RESPONSE} from "shared/lib/consts/response";
import axios from "axios";

interface GetHistoryResponseParams {
    id: number;
}
export async function getHistoryResponse(params:GetHistoryResponseParams):Promise<
    ResponsesStructure<JVResponseHistorySchema[]>> {
    try{
        const res = await axios.get<ResponsesStructure<JVResponseHistorySchema[]>>(
            `${__API__}/api/job-vacancy-identifier`,
            {params}
        );


        return res.data;
    }
    catch(e){
        return DEFAULT_RESPONSE;
    }
}