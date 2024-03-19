import axios from "axios";


export async function takeToWork (id: number): Promise<ResponsesStructure<null>> {
    try {
        const response = await axios.patch<ResponsesStructure<null>>(
            `${__API__}/api/job-vacancy-response`,
            {
                id,
                status: 2
            }
        );
        console.log(response.data);
        return response.data;
    }
    catch (e) {
        return new Promise((resolve) => resolve({
            result:0,
            desc: "Ошибка на стороне клиента",
            data: null,
            info: {count:0}
        }));
    }
}