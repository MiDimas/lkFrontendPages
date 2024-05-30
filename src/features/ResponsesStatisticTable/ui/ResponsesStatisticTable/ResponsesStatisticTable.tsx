import {useInitialEffect} from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import {useCallback, useEffect, useState} from "react";
import {
    ResponsesStatisticHRSchema,
    ResponsesStatisticIdentifiersSchema,
} from "../../model/types/ResponsesStatisticSchema";
import {getAllStatistic} from "../../api/getAllStatistic/getAllStatistic";
import cls from "./ResponsesStatisticTable.module.css";
import {
    ResponsesStatisticHRTable
} from "../ResponsesStatisticHRTable/ResponsesStatisticHRTable";
import {
    ResponsesStatisticIdentifierTable
} from "../ResponsesStatisticIdentifierTable/ResponsesStatisticIdentifierTable";
import {DateSelector} from "entities/Date";
import {DateSchema} from "entities/Date/model/types/DateSchema";
import {RequestStatisticParams} from "../../model/types/requestStatisticParams";
import {Toggle} from "shared/ui/Toggle/Toggle";


interface ResponsesStatisticTableProps {
    user?:User;
}
export const ResponsesStatisticTable = (props:ResponsesStatisticTableProps) => {
    const {
        user,
    } = props;
    const [statisticListHR, setStatisticHR] = useState<ResponsesStatisticHRSchema[]>();
    const [statisticListIdentifier, setStatisticIdentifier] = useState<ResponsesStatisticIdentifiersSchema[]>();
    const [date, setDate] = useState<DateSchema>();
    const [isFiltered, setIsFiltered] = useState<boolean>();
    const [isLoading, setIsLoading] = useState(true);

    const loadStatistic = useCallback(async (params:RequestStatisticParams ={}) => {
        setIsLoading(true);
        const res = await getAllStatistic(params);
        if(res.result){
            if (res.data?.hr?.result) {
                setStatisticHR(res.data.hr.data);
            }
            if (res.data?.identifiers?.result) {
                setStatisticIdentifier(res.data.identifiers.data);
            }
        }
        setIsLoading(false);
    }, [setStatisticHR]);

    useInitialEffect(
        () => {
            loadStatistic();
        }
    );
    useEffect(() => {
        if(isFiltered){
            loadStatistic({startDate: date});
        }
    }, [date, loadStatistic, isFiltered]);


    return (
        <div className={cls.table}>
            <div className={cls.filters}>
                <DateSelector onChange={setDate} values={date}/>
                <label className={cls.label}>
                    <span>Включить фильтр по месяцам</span>
                    <Toggle onChange={setIsFiltered} value={isFiltered}/>
                </label>
            </div>
            {
                !isLoading
                    ? <>
                        <ResponsesStatisticHRTable response={statisticListHR} />
                        <ResponsesStatisticIdentifierTable response={statisticListIdentifier} />
                    </>
                    :<div>Loading...</div>
            }
        </div>

    );
};