import axios from "axios";

export async function addIdentifier (name: string): Promise<ResponsesStructure<null>> {
    try {
        const res = await axios.post(
            `${__API__}/api/job-vacancy-identifier`,
            {name}
        );
        return res.data;
    }
    catch (e) {
        return {
            result: 0,
            data: null,
            info: {count:0},
            desc: "Ошибка на уровне клиента"
        };
    }
}