import {useState} from "react";
import {PaginationMenu} from "shared/ui/PaginationMenu/PaginationMenu";
import {MyTicketHiddenBlock} from "../MyTicketHiddenBlock/MyTicketHiddenBlock";
import {loadQueryParams} from "../../model/services/queryParams/loadQueryParams";
import {GetMyTicketsParams} from "../../model/types/MyTicketsSchema";

interface MyTicketsProps {
    user?: User;
}
export function MyTicketsFrame(props: MyTicketsProps) {
    const [params, setParams] = useState<GetMyTicketsParams>(
        loadQueryParams(new URLSearchParams(window.location.search))
    );

    return (
        <div>
            <MyTicketHiddenBlock params={params} setParams={setParams}/>
            <div>
                here will be a window with tickets
            </div>
            <PaginationMenu lastPage={10} selectedPage={2}/>
        </div>
    );
}