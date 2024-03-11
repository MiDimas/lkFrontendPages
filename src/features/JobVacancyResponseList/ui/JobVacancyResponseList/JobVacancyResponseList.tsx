import {useEffect, useState} from "react";
import {JVResponses} from "features/JobVacancyResponseList/model/types/JVResponses";
import {getJVResponses} from "features/JobVacancyResponseList/model/services/getJVResponses/getJVResponses";

export const JobVacancyResponseList = () => {
    const [respList, setRespList] = useState<JVResponses[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect( () => {
        if(respList.length === 0){
            getJVResponses({}).then((response) =>{
                    setIsLoading(false);
                    if(response.result){
                        setRespList(response.data ?? [])
                    }
            })

        }
    }, [respList]);
    if(isLoading){
        return <h3>Загрузка...</h3>
    }
    return (
        <div>
            {respList.length
                ? respList.map((elem) => <div key={elem.id}>{elem.fio}</div>)
                : "Данные отсутствуют"
            }
        </div>
    );
}
