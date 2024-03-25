import {useCallback, useEffect, useState} from "react";
import {GetJVResponsesParams, JVRStatusSchema} from "../../model/types/JVResponsesSchema";
import {getJVResponses} from "../../model/services/getJVResponses/getJVResponses";
import {loadJVQueryParams} from "../../model/services/loadJVQueryParams/loadJVQueryParams";
import {JVResponseSchema} from "entities/JVResponse";

import cls from "./JobVacancyResponsesFrame.module.css";
import {
    JobVacancyResponseList
} from "entities/JVResponseList/ui/JobVacancyResponseList/JobVacancyResponseList";
import {
    JobVacancyResponseFilter
} from "../JobVacancyResponseFilter/JobVacancyResponseFilter";
import {getJVRStatuses} from "../../model/services/getJVRStatuses/getJVRStatuses";
import {useInitialEffect} from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import {changeStatus} from "../../model/services/changeStatus/changeStatus";
import {changeData} from "../../model/services/changeData/changeData";
import {getCountries} from "entities/Country/model/services/getCountries/getCountries";
import {CountrySchema} from "entities/Country/model/types/CountrySchema";
import {removeWorker} from "../../model/services/removeWorker/removeWorker";


interface JobVacancyResponseListProps {
    user?: User;
    head?: boolean;
}
export const JobVacancyResponsesFrame = (props: JobVacancyResponseListProps) => {
    const {
        user = {id: 0, firstName: "" },
        head
    } = props;
    const [respList, setRespList] = useState<JVResponseSchema[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [params, setParams] = useState<GetJVResponsesParams>(
        loadJVQueryParams(new URLSearchParams(window.location.search))
    );
    const [statuses, setStatuses] = useState<JVRStatusSchema[]>();
    const [countries, setCountries] = useState<CountrySchema[]>();
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
    const getStatuses = useCallback(async () => {
        const response = await getJVRStatuses();
        if(response.result) {
            setStatuses(response.data);
        }
    }, []);

    const getCountriesHandler = useCallback(
        async () => {
            const response = await getCountries();
            if(response.result) {
                setCountries(response.data);
            }
        },
        [],
    );

    const changeStatusHandler = useCallback(
        async (id: number, status: number) => {
            const res =  await changeStatus(id, status);
            setIsLoading(true);
            getData();
            return res;
        }, [getData]);

    const changeDataHandler = useCallback(
        async(state: JVResponseSchema) => {
            setIsLoading(true);
            const res = await changeData(state);
            setIsLoading(false);
            return res;
        }, []
    );

    const removeWorkerHandler = useCallback(
        async(id: number) => {
            const res = await removeWorker(id);
            if(res.result === 0) {
                return res;
            }
            setIsLoading(true);
            getData();
            return res;
        },
        [getData],
    );



    useInitialEffect(() => {
        getStatuses();
        getCountriesHandler();
    });


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
                className={cls.filter}
                statuses={statuses}
            />
            <JobVacancyResponseList
                isLoading={isLoading}
                list={respList}
                className={cls.list}
                changeStatus={changeStatusHandler}
                updateCard={changeDataHandler}
                user={user}
                countries={countries}
                removeWorker={head ? removeWorkerHandler : undefined}
            />
        </div>
    );
};
