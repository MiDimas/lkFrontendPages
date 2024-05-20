import {JVResponseSchema} from "entities/JVResponse";
import axios from "axios";

export async function changeData (
    state: JVResponseSchema,
    comment: string|null = null
): Promise<ResponsesStructure<null>> {
    try {
        console.log(state);

        const response = await axios.put<ResponsesStructure<null>>(
            `${__API__}/api/job-vacancy-response`,
            {
                id: state.id,
                fio: state.fio,
                email: state.email,
                phone: state.phone,
                birthDate: state.birthDate,
                country: state.country,
                jobTitle: state.jobTitle,
                jobTitleCode: state.jobTitleCode,
                comment: comment
            }
        );
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