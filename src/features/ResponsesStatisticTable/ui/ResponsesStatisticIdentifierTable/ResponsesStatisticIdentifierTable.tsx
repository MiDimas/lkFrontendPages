import cls from "./ResponsesStatisticIdentifierTable.module.css";
import {Row, Table} from "shared/ui/Table/Table";
import {
    ResponsesStatisticIdentifiersSchema
} from "../../model/types/ResponsesStatisticSchema";
import {useMemo} from "react";
import {classNames} from "shared/lib/classNames/classNames";

interface  ResponsesStatisticIdentifierTableProps{
    className?: string;
    response?: ResponsesStatisticIdentifiersSchema[];
}
type RowsTablesStatistic = Row<"0" | "2" | "3" | "4" | "5" | "6" | "1" | "7" |  "10">[];
export const ResponsesStatisticIdentifierTable = (props: ResponsesStatisticIdentifierTableProps) => {
    const {
        className,
        response
    } = props;

    const rowsListIdentifier = useMemo<RowsTablesStatistic | undefined>(() => {
        const rows:RowsTablesStatistic = [];
        response?.map(({iName, statistic}) => {
            if(!statistic) {
                rows.push({cells: {"0": iName}});
                return;
            }
            const statisticParse: OptionalRecord<string, number> = JSON.parse(statistic);
            rows.push({cells: {"0":iName, ...statisticParse,
                "10": Object.values(statisticParse).reduce((prev =0, cur=0) => (prev + cur))
            }});
            return;
        });
        return rows;
    }, [response]);

    return (
        <div className={classNames(cls.main, {}, [className])}>
            <div className={cls.head}>Отклики по идентификаторам</div>
            <Table
                cols={[
                    {id:"0", name:"Идентификатор"},
                    {id:"10", name:"Всего"},
                    {id:"1", name:"Новые"},
                    {id:"2", name:"В работе"},
                    {id:"3", name:"Не дозвон"},
                    {id:"7", name:"Сообщение"},
                    {id:"4", name:"Подумает"},
                    {id:"5", name:"Отказ"},
                    {id:"6", name:"Трудоустройство"},
                ]}
                columnClassNames={{
                    "0": cls.identifier,
                    "10": cls.total,
                    "1": cls.new,
                    "2": cls.inWork,
                    "3": cls.notAvailable,
                    "7": cls.message,
                    "4": cls.thinking,
                    "5": cls.reject,
                    "6": cls.success,
                }}
                className={cls.identifierTable}
                rows={rowsListIdentifier}
                diffRow
                total

            />
        </div>
    );
};