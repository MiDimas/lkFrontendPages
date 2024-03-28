import {Row, Table} from "shared/ui/Table/Table";
import {useInitialEffect} from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import {useCallback, useMemo, useState} from "react";
import {ResponsesStatisticSchema} from "../../model/types/ResponsesStatisticSchema";
import {getAllStatistic} from "../../api/getAllStatistic/getAllStatistic";

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
    const rowsList = useMemo<Row<"0" | "2" | "3" | "4" | "5" | "6" >[] | undefined>(() => {
        const rows:Row<"0" | "2" | "3" | "4" | "5" | "6" >[] = [];
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
            rows.push({cells: {"0":firstname, ...statisticParse}});
            return;
        });
        return rows;
    }, [statisticList]);

    if(isLoading) {
        return  <div>Loading ...</div>;
    }
    return (
        <div>
            <Table
                cols={[
                    {id:"0", name:"Сотрудник"},
                    {id:"2", name:"В работе"},
                    {id:"3", name:"Не дозвон"},
                    {id:"4", name:"Подумает"},
                    {id:"5", name:"Отказ"},
                    {id:"6", name:"Трудоустройство"},
                ]}
               
                rows={rowsList}
            />
            <div>Новых откликов: {newResponses}</div>
        </div>

    );
};