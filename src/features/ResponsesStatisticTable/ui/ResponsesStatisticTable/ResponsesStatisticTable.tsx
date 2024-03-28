import {Table} from "shared/ui/Table/Table";

interface ResponsesStatisticTableProps {
    user?:User;
}
export const ResponsesStatisticTable = (props:ResponsesStatisticTableProps) => {
    return (
        <Table
            cols={[
                {id:0, name:"Сотрудник"},
                {id:2, name:"В работе"},
                {id:3, name:"Не дозвон"},
                {id:4, name:"Подумает"},
                {id:5, name:"Отказ"},
                {id:6, name:"Трудоустройство"},
            ]}
               
            rows={[
                {cells: {0: "Misha"}},
                {cells: {0: "Grisha"}},
                {cells: {0: "Masha"}},
            ]}
        />
    );
};