import {ReactElement, useMemo, useState} from "react";
import {ResponsesStatisticHRSchema} from "../../model/types/ResponsesStatisticSchema";
import {Row, Table} from "shared/ui/Table/Table";
import cls from "./ResponsesStatisticHRTable.module.css";
import {classNames} from "shared/lib/classNames/classNames";

interface ResponsesStatisticHRTableProps {
    className?: string;
    response?: ResponsesStatisticHRSchema[];
}
type RowsTablesStatistic = Row<"0" | "2" | "3" | "4" | "5" | "6" | "1" | "7">[];
export const ResponsesStatisticHRTable = (props: ResponsesStatisticHRTableProps) => {
    const {
        className,
        response
    } = props;
    const [newResponses, setNewResponses] =useState<number>(0);

    console.log(response);
    const rowsListHR = useMemo<RowsTablesStatistic | undefined>(() => {
        const rows:RowsTablesStatistic = [];
        response?.map(({firstname, statistic, hr}) => {
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
            const statisticWithLink: OptionalRecord<string, ReactElement> = Object.fromEntries(
                Object.entries(statisticParse)
                    .map((value) => {
                        const newValue: [string, ReactElement] = [
                            value[0],
                            <a key={value[0]} href={`${__API__}/job-vacancy-response?status=${value[0]}&worker=${hr}`}>
                                {value[1]}
                            </a>
                        ];

                        return newValue;
                    })
            );
            const linkDefault = (content:string|number|undefined)=>(
                <a href={`${__API__}/job-vacancy-response?status=0&worker=${hr}`}>{content || "---"}</a>
            );
            rows.push({cells: {"0":linkDefault(firstname), ...statisticWithLink,
                "1": linkDefault(
                    Object.values(statisticParse).reduce((prev =0, cur=0) => (prev + cur))
                )
            }});

            return;
        });
        return rows;
    }, [response]);
    return (
        <div className={classNames(cls.main, {}, [className])}>
            <div className={cls.new}>
                <a href={`${__API__}/job-vacancy-response`}>Новых откликов: {newResponses}</a>
            </div>
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
                className={cls.hrTable}
                diffRow
                rows={rowsListHR}
                total
            />
        </div>
    );
};