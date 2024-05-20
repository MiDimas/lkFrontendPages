import {JobTitleSchema} from "../model/types/JobTitleSchema";
import axios from "axios";
import {DEFAULT_RESPONSE} from "shared/lib/consts/response";

export async function getJobTitle(name:string): Promise<ResponsesStructure<JobTitleSchema[]>> {
    try {
        const response = await axios.post<ResponsesStructure<JobTitleSchema[]>>(
            `${__API__}/api/get-job-title`,
            {
                name,
                archive: 0
            }
        );
        return response.data;
    }
    catch (e) {
        return DEFAULT_RESPONSE;
    }
}