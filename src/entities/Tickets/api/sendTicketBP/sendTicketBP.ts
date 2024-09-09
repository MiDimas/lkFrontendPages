import {SendTicketBPParams} from "../../model/types/SendTicketBPSchema";
import {DEFAULT_RESPONSE} from "shared/lib/consts/response";
import axios from "axios";

export async function sendTicketBP(params: SendTicketBPParams):Promise<ResponsesStructure<[]>>{
    try {
        const form  = new FormData();
        form.append("picture", params.picture);
        form.append("ticket", String(params.ticket));
        const response = await axios.post<ResponsesStructure<[]>>(
            `${__API__}/api/tickets-boarding-pass`,
            form
        );

        return response.data;
    }
    catch (error) {
        return DEFAULT_RESPONSE;
    }
}