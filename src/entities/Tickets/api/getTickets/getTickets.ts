import {DEFAULT_RESPONSE} from "shared/lib/consts/response";
import {GetTicketsParams} from "../../model/types/GetTicketsSchema";
import {TicketInfoSchema, TicketSchema} from "../../model/types/TicketSchema";
import axios from "axios";
import {dateFormatter} from "shared/lib/helpers/dateFormatter/dateFormatter";

export async function getTickets(props:  GetTicketsParams):Promise<ResponsesStructure<
    TicketSchema[], TicketInfoSchema>> {
    try{
        const response =  await axios.get<ResponsesStructure<TicketSchema[], TicketInfoSchema>>(
            `${__API__}/api/tickets`,
            {
                params: {
                    ...props,
                    limit:10
                }
            }
        );
        if(response.data.result === 1){
            response.data.data?.forEach(({
                ticket_date,
                date_update,
                boarding_update,
                boarding_upload
            },  index)=> {
                if (response.data.data){
                    response.data.data[index].ticket_date = dateFormatter(ticket_date, false);
                    response.data.data[index].date_update = dateFormatter(date_update, false);
                    if(boarding_update){
                        response.data.data[index].boarding_update = dateFormatter(boarding_update, false);
                    }
                    if(boarding_upload){
                        response.data.data[index].boarding_upload = dateFormatter(boarding_upload, false);
                    }
                }
            });
        }
        return response.data;

    }catch(error) {
        return DEFAULT_RESPONSE;
    }
}