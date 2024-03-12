import {useCallback, useEffect, useState} from "react";
import {GetJVResponsesParams, JVResponses} from "../../model/types/JVResponses";
import {getJVResponses} from "../../model/services/getJVResponses/getJVResponses";

export const JobVacancyResponseList = () => {
    const [respList, setRespList] = useState<JVResponses[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [params, setParams] = useState<GetJVResponsesParams>({});


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
                ? respList.map((elem) => <div key={elem.id}>{elem.fio}</div>)
                : "Данные отсутствуют"
            }
        </div>
    );
};
