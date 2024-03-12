import {useCallback, useEffect, useState} from "react";
import {GetJVResponsesParams} from "../../model/types/JVResponsesSchema";
import {getJVResponses} from "../../model/services/getJVResponses/getJVResponses";
import {loadJVQueryParams} from "../../model/services/loadJVQueryParams/loadJVQueryParams";
import {JVResponseSchema} from "entities/JVResponse";
import {JVResponseCard} from "entities/JVResponse/ui/JVResponseCard/JVResponseCard";

export const JobVacancyResponseList = () => {
    const [respList, setRespList] = useState<JVResponseSchema[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [params, setParams] = useState<GetJVResponsesParams>(
        loadJVQueryParams(new URLSearchParams(window.location.search))
    );



    const getData = useCallback(
        async () => {
            const response = await getJVResponses(params);
            setIsLoading(false);
            if(response.result){
                setRespList(response.data ?? []);
            }
        },
        [params],
    );


    useEffect( () => {
        getData();
    }, [getData]);


    if(isLoading){
        return <h3>Загрузка...</h3>;
    }
    return (
        <div>
            {respList.length
                ? respList.map((elem) => <JVResponseCard key={elem.id} response={elem}/>)
                : "Данные отсутствуют"
            }
        </div>
    );
};
