import {useCallback, useMemo} from "react";

interface Column<T extends string | number> {
    id?: T;
    name?: string;
}
type OptionalRecord<K extends string | number, T> = {
    [P in K]?: T;
} ;
interface Row<T extends string|number> {
    cells?: OptionalRecord<T, string|number>;
}
interface TableProps<T extends string | number> {
    className?: string;
    cols?: Column<T>[];
    rows?: Row<T>[];
    total?: T[]
}
export const Table = <T extends string | number>(props:TableProps<T>) => {
    const {
        className,
        cols,
        rows
    } = props;
    const createHead = useMemo(() => {
        const head: JSX.Element[] = [];
        const listIndex: T[] = [];
        if(cols){
            cols.map(({id, name}) => {
                if(typeof id !== "undefined") {
                    head.push(<th key={id} scope="col" id={String(id)}>{name}</th>);
                    listIndex.push(id);
                }
            });
        }
        return {head, colIndexList: listIndex};
    }, [cols]);


    const createRow = useCallback(({cells}:Row<T>, key:number) => {
        const res = createHead.colIndexList.map((value) => {
            if (cells){
                return (
                    <td key={`${cells[value]}${value}`} id={String(value)}>
                        {
                            cells[value] || "---"
                        }
                    </td>
                );
            }
            else {
                return <></>;
            }

        });
        return (
            <tr key={`table${key}`}>
                {res}
            </tr>
        );


    }, [createHead]);

    const createRows = useMemo(() => {
        return rows?.map((row, index) => createRow(row, index));
    }, [rows, createRow]);
    return (
        <table>
            <thead>
                <tr>
                    {createHead.head}
                </tr>
            </thead>
            <tbody>
                {createRows}
            </tbody>
        </table>
    );
};