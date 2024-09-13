import {SendTicketBPParams} from "../../model/types/SendTicketBPSchema";
import {DEFAULT_RESPONSE_WITHOUT_DATA} from "shared/lib/consts/response";
import axios from "axios";
import {TicketSchema} from "../../model/types/TicketSchema";

export async function sendTicketBP(params: SendTicketBPParams):Promise<ResponsesStructure<null|TicketSchema>>{
    try {
        const form  = new FormData();
        form.append("picture", params.picture);
        form.append("ticket", String(params.ticket));
        form.append("responseInfo", String(true));
        const response = await axios.post<ResponsesStructure<null|TicketSchema>>(
            `${__API__}/api/tickets-boarding-pass`,
            form
        );

        return response.data;
    }
    catch (error) {
        return DEFAULT_RESPONSE_WITHOUT_DATA;
    }
}