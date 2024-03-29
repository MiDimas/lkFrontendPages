import {Row, Table} from "shared/ui/Table/Table";
import {useInitialEffect} from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import {useCallback, useMemo, useState} from "react";
import {ResponsesStatisticSchema} from "../../model/types/ResponsesStatisticSchema";
import {getAllStatistic} from "../../api/getAllStatistic/getAllStatistic";
import cls from"./ResponsesStatisticTable.module.css";

interface ResponsesStatisticTableProps {
    user?:User;
}
export const ResponsesStatisticTable = (props:ResponsesStatisticTableProps) => {
    const {
        user,
    } = props;
    const [statisticList, setStatistic] = useState<ResponsesStatisticSchema[]>();
    const [isLoading, setIsLoading] = useState(false);
    const [newResponses, setNewResponses] =useState<number>(0);

    const loadStatistic = useCallback(async () => {
        setIsLoading(true);
        const res = await getAllStatistic();
        if(res.result){
            setStatistic(res.data);
            console.log(res.data);
        }
        setIsLoading(false);
    }, [setStatistic]);

    useInitialEffect(
        () => {
            loadStatistic();
        }
    );
    const rowsList = useMemo<Row<"0" | "2" | "3" | "4" | "5" | "6" | "10" >[] | undefined>(() => {
        const rows:Row<"0" | "2" | "3" | "4" | "5" | "6" | "10" >[] = [];
        statisticList?.map(({firstname, statistic}) => {
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
                "10": Object.values(statisticParse).reduce((prev =0, cur=0) => (prev + cur))
            }});
            return;
        });
        return rows;
    }, [statisticList]);

    if(isLoading) {
        return  <div>Loading ...</div>;
    }
    return (
        <div className={cls.table}>
            <Table
                cols={[
                    {id:"0", name:"Сотрудник"},
                    {id:"2", name:"В работе"},
                    {id:"3", name:"Не дозвон"},
                    {id:"4", name:"Подумает"},
                    {id:"5", name:"Отказ"},
                    {id:"6", name:"Трудоустройство"},
                    {id:"10", name:"Всего"},
                ]}
                columnClassNames={{
                    "0": cls.worker,
                    "2": cls.inWork,
                    "3": cls.notAvailable,
                    "4": cls.thinking,
                    "5": cls.reject,
                    "6": cls.success,
                    "10": cls.total,
                }}
               
                rows={rowsList}
                total
                diffRow
            />
            <div>Новых откликов: {newResponses}</div>
        </div>

    );
};