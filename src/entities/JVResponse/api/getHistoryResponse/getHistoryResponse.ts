import {JVResponseHistorySchema} from "../../model/types/JVResponseHistorySchema";
import {DEFAULT_RESPONSE} from "shared/lib/consts/response";
import axios from "axios";
import {dateFormatter} from "shared/lib/helpers/dateFormatter/dateFormatter";

interface GetHistoryResponseParams {
    id: number;
}
export async function getHistoryResponse(params:GetHistoryResponseParams):Promise<
    ResponsesStructure<JVResponseHistorySchema[]>> {
    try{
        const res = await axios.get<ResponsesStructure<JVResponseHistorySchema[]>>(
            `${__API__}/api/get-history-response`,
            {params}
        );

        if(res.data.result === 1 ){
            res.data.data?.forEach((item, index) => {
                if(res.data.data){
                    res.data.data[index].created = dateFormatter(item.created, false);
                }
            });
        }
        return res.data;
    }
    catch(e){
        return DEFAULT_RESPONSE;
    }
}