import {Row, Table} from "shared/ui/Table/Table";
import {useInitialEffect} from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import {useCallback, useMemo, useState} from "react";
import {
    ResponsesStatisticHRSchema,
    ResponsesStatisticIdentifiersSchema,
    ResponsesStatisticSchema
} from "../../model/types/ResponsesStatisticSchema";
import {getAllStatistic} from "../../api/getAllStatistic/getAllStatistic";
import cls from "./ResponsesStatisticTable.module.css";

type RowsTablesStatistic = Row<"0" | "2" | "3" | "4" | "5" | "6" | "1" | "7">[];
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
    const [newResponses, setNewResponses] =useState<number>(0);

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
    const rowsListHR = useMemo<RowsTablesStatistic | undefined>(() => {
        const rows:RowsTablesStatistic = [];
        statisticListHR?.map(({firstname, statistic}) => {
            if(firstname==="Новые отклики"){
                if(statistic){
                    const parseNew:{"1":number} = JSON.parse(statistic);
                    setNewResponses(parseNew["1"]);
                }
                return;
            }
            if(!statistic) {
                rows.push({cells: {"0": firstname}});
                return;
            }
            const statisticParse: OptionalRecord<string, number> = JSON.parse(statistic);
            rows.push({cells: {"0":firstname, ...statisticParse,
                "1": Object.values(statisticParse).reduce((prev =0, cur=0) => (prev + cur))
            }});
            return;
        });
        return rows;
    }, [statisticListHR]);

    const rowsListIdentifier = useMemo<RowsTablesStatistic | undefined>(() => {
        const rows:RowsTablesStatistic = [];
        statisticListIdentifier?.map(({iName, statistic}) => {
            if(!statistic) {
                rows.push({cells: {"0": iName}});
                return;
            }
            const statisticParse: OptionalRecord<string, number> = JSON.parse(statistic);
            rows.push({cells: {"0":iName, ...statisticParse,
                "1": Object.values(statisticParse).reduce((prev =0, cur=0) => (prev + cur))
            }});
            return;
        });
        return rows;
    }, [statisticListIdentifier]);

    if(isLoading) {
        return  <div>Loading ...</div>;
    }
    return (
        <div className={cls.table}>
            <div className={cls.blockTable}>
                <div className={cls.new}>Новых откликов: {newResponses}</div>
                <Table
                    cols={[
                        {id:"0", name:"Сотрудник"},
                        {id:"1", name:"Всего"},
                        {id:"2", name:"В работе"},
                        {id:"3", name:"Не дозвон"},
                        {id:"7", name:"Сообщение"},
                        {id:"4", name:"Подумает"},
                        {id:"5", name:"Отказ"},
                        {id:"6", name:"Трудоустройство"},
                    ]}
                    columnClassNames={{
                        "0": cls.worker,
                        "1": cls.total,
                        "2": cls.inWork,
                        "3": cls.notAvailable,
                        "7": cls.message,
                        "4": cls.thinking,
                        "5": cls.reject,
                        "6": cls.success,
                    }}
                    diffRow
                    rows={rowsListHR}
                    total
                />
            </div>
            <div className={cls.blockTable}>
                <div className={cls.new}>Отклики по идентификаторам</div>
                <Table
                    cols={[
                        {id:"0", name:"Идентификатор"},
                        {id:"1", name:"Всего"},
                        {id:"2", name:"В работе"},
                        {id:"3", name:"Не дозвон"},
                        {id:"7", name:"Сообщение"},
                        {id:"4", name:"Подумает"},
                        {id:"5", name:"Отказ"},
                        {id:"6", name:"Трудоустройство"},
                    ]}
                    columnClassNames={{
                        "0": cls.worker,
                        "1": cls.total,
                        "2": cls.inWork,
                        "3": cls.notAvailable,
                        "7": cls.message,
                        "4": cls.thinking,
                        "5": cls.reject,
                        "6": cls.success,
                    }}
                    rows={rowsListIdentifier}
                    diffRow
                    total

                />
            </div>
        </div>

    );
};