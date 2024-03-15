import {JVRStatusSchema} from "../../types/JVResponsesSchema";
import axios, {AxiosResponse} from "axios";


export async function getJVRStatuses ():Promise<ResponsesStructure<JVRStatusSchema[]>> {
    try {
        const response = await axios.get<ResponsesStructure<JVRStatusSchema[]>>(
            `${__API__}/api/job-vacancy-statuses`
        );
        return response.data;
    }
    catch(e) {
        return new Promise((resolve) => resolve({
            result:0,
            desc: "Error",
            data: [],
            info: {count: 0}
        }));
    }
}