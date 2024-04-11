import {GetJVResponsesParams} from "../../types/JVResponsesSchema";
import axios from "axios";
import {addQueryParams} from "shared/lib/url/addQueryParams/addQueryParams";
import {JVResponseInfoSchema, JVResponseSchema} from "entities/JVResponse";
import {dateFormatter} from "shared/lib/helpers/dateFormatter/dateFormatter";


export async function getJVResponses (props:GetJVResponsesParams): Promise<ResponsesStructure<
        JVResponseSchema[],
    JVResponseInfoSchema
>> {

    try {
        addQueryParams<GetJVResponsesParams>(props);
        const response = await axios.get<ResponsesStructure<JVResponseSchema[]>>(
            `${__API__}/api/job-vacancy-response`,
            {
                params: {
                    ...props,
                    limit:10
                }
            }
        );
        if(response.data.result === 1){
            response.data.data?.forEach(({birthDate, createdAt, updatedAt}, index) => {
                if (response.data.data){
                    response.data.data[index].birthDate = dateFormatter(birthDate);
                    response.data.data[index].createdAt = dateFormatter(createdAt, false);
                    response.data.data[index].updatedAt = dateFormatter(updatedAt, false);
                }
            });
        }
        return response.data;
    }
    catch(e) {
        return {
            result:0,
            desc: "Ошибка на стороне клиента",
            data: [],
            info: {count:0}
        };
    }
}