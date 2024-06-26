import axios from "axios";

export async function removeWorker (
    id: number,
    comment: string|null = null
): Promise<ResponsesStructure<null>> {
    try {
        const res  = await axios.patch(`${__API__}/api/job-vacancy-response`,
            {id, status: 1, comment: comment});
        return res.data;
    }
    catch (e) {
        return {
            result:0,
            desc: "Произошла ошибка на клиенте",
            info: {count:0},
            data: null
        };
    }
}