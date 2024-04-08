import axios from "axios";


export async function changeStatus (
    id: number,
    status: number,
    comment: string|null = null
): Promise<ResponsesStructure<null>> {
    try {
        const response = await axios.patch<ResponsesStructure<null>>(
            `${__API__}/api/job-vacancy-response`,
            {
                id,
                status: status,
                comment: comment
            }
        );
        console.log(response.data);
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