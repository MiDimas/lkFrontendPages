import {useCallback, useEffect, useState} from "react";
import {GetJVResponsesParams} from "../../model/types/JVResponsesSchema";
import {getJVResponses} from "../../model/services/getJVResponses/getJVResponses";
import {loadJVQueryParams} from "../../model/services/loadJVQueryParams/loadJVQueryParams";
import {JVResponseSchema} from "entities/JVResponse";
import {JVResponseCard} from "entities/JVResponse/ui/JVResponseCard/JVResponseCard";
import cls from "./JobVacancyResponsList.module.css";

interface JobVacancyResponseListProps {
    user?: User;
}
export const JobVacancyResponseList = (props: JobVacancyResponseListProps) => {
    const {
        user = {id: 0, firstName: "" }
    } = props;
    const [respList, setRespList] = useState<JVResponseSchema[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [params, setParams] = useState<GetJVResponsesParams>(
        loadJVQueryParams(new URLSearchParams(window.location.search))
    );
    console.log(user);


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
        <div className={cls.list}>
            {respList.length
                ? respList.map((elem) => <JVResponseCard key={elem.id} response={elem}/>)
                : "Данные отсутствуют"
            }
        </div>
    );
};
