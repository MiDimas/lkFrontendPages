import {UserSchema} from "../model/types/UserSchema";
import axios from "axios";
import {dateFormatter} from "shared/lib/helpers/dateFormatter/dateFormatter";
import {DEFAULT_RESPONSE} from "shared/lib/consts/response";

export async function getUser(search:string): Promise<ResponsesStructure<UserSchema[]>> {
    try {
        const response = await axios.post<ResponsesStructure<UserSchema[]>>(
            `${__API__}/api/get-user`,
            {
                search
            }
        );
        if(response.data.result===1){
            response.data.data?.forEach(({birthday}, index) =>  {
                if(response.data.data){
                    response.data.data[index].birthday = dateFormatter(birthday);
                }
            });
        }
        return response.data;
    }
    catch (e) {
        return DEFAULT_RESPONSE;
    }
}