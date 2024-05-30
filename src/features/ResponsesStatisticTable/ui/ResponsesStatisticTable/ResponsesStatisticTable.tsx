import {useInitialEffect} from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import {useCallback, useState} from "react";
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


interface ResponsesStatisticTableProps {
    user?:User;
}
export const ResponsesStatisticTable = (props:ResponsesStatisticTableProps) => {
    const {
        user,
    } = props;
    const [statisticListHR, setStatisticHR] = useState<ResponsesStatisticHRSchema[]>();
    const [statisticListIdentifier, setStatisticIdentifier] = useState<ResponsesStatisticIdentifiersSchema[]>();
    const [isLoading, setIsLoading] = useState(false);

    const loadStatistic = useCallback(async () => {
        setIsLoading(true);
        const res = await getAllStatistic();
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


    if(isLoading) {
        return  <div>Loading ...</div>;
    }
    return (
        <div className={cls.table}>
            <ResponsesStatisticHRTable response={statisticListHR} />
            <ResponsesStatisticIdentifierTable response={statisticListIdentifier} />
        </div>

    );
};