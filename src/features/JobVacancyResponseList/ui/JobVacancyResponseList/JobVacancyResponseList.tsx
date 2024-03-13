import {useCallback, useEffect, useState} from "react";
import {GetJVResponsesParams} from "../../model/types/JVResponsesSchema";
import {getJVResponses} from "../../model/services/getJVResponses/getJVResponses";
import {loadJVQueryParams} from "../../model/services/loadJVQueryParams/loadJVQueryParams";
import {JVResponseSchema} from "entities/JVResponse";

import cls from "./JobVacancyResponsList.module.css";
import {
    JobVacancyResponseBlockList
} from "../JobVacancyResponseBlockList/JobVacancyResponseBlockList";
import {
    JobVacancyResponseFilter
} from "../JobVacancyResponseFilter/JobVacancyResponseFilter";

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
            console.log(response);
        },
        [params],
    );


    useEffect( () => {
        setIsLoading(true);
        getData();
    }, [getData]);


    return (
        <div className={cls.main}>
            <JobVacancyResponseFilter
                params={params}
                setParams={setParams}
                user={user}
            />
            <JobVacancyResponseBlockList isLoading={isLoading} list={respList} />
        </div>
    );
};
