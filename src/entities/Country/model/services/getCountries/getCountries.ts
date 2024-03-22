import {CountrySchema} from "../../types/CountrySchema";
import axios from "axios";


export async function getCountries ():Promise<ResponsesStructure<CountrySchema[]>> {
    try {
        const response = await axios.get<ResponsesStructure<CountrySchema[]>>(
            `${__API__}/api/countries`,
        );
        return response.data;
    }
    catch (e) {
        return {
            result:0,
            desc: "Ошибка на стороне клиента",
            data: [],
            info: {count:0}
        };
    }
}