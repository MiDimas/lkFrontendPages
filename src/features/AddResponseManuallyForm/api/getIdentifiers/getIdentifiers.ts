import {IdentifiersSchema} from "../../model/types/AddResponseSchema";
import axios from "axios";

export async function getIdentifiers (): Promise<ResponsesStructure<IdentifiersSchema[] | null>> {
    try {
        const res = await axios.get<
            ResponsesStructure<IdentifiersSchema[]|null>>(
                `${__API__}/api/job-vacancy-identifier`,
            );
        return res.data;
    }
    catch (e) {
        return {
            result: 0,
            data: null,
            info: {count:0},
            desc: "Ошибка клиента"
        };
    }
}