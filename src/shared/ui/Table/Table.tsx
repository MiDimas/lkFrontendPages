import {useCallback, useMemo, useState} from "react";

interface Column<T extends string | number> {
    id?: T;
    name?: string;
}

export interface Row<T extends string|number> {
    cells?: OptionalRecord<T, string|number>;
}
interface TableProps<T extends string | number> {
    className?: string;
    cols?: Column<T>[];
    rows?: Row<T>[];
    total?: boolean
}
export const Table = <T extends string | number>(props:TableProps<T>) => {
    const {
        className,
        cols,
        rows,
        total
    } = props;
    const [totalCount, setTotalCount] = useState<OptionalRecord<T,number>>();
    const [isFirst, setIsFirst] = useState(true);
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


    const createRow = useCallback(({cells}:Row<T>, key:number, isCount=total) => {
        const res = createHead.colIndexList.map((value) => {
            if(isFirst && total) {
                setTotalCount(prevState => ({...prevState, [value]: 0}));
            }
            if (cells){
                if(total && isCount){
                    if(typeof cells[value] === "number") {

                        setTotalCount((prevState:OptionalRecord<T, number> = {}) => {
                            return {
                                ...prevState,
                                [value]: cells[value]
                            };
                        });
                    }
                }
                return (
                    <td key={`${key}${cells[value]}${value}`} id={String(value)}>
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
        setIsFirst(false);
        return (
            <tr key={`table${key}`}>
                {res}
            </tr>
        );


    }, [createHead, total, isFirst]);

    const createRows = useMemo(() => {
        console.log(rows);
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
            { total && totalCount &&
                (
                    <tfoot>
                        <tr>
                            {
                                createHead.colIndexList.map((value, index) => (
                                    <td key={`footer${totalCount[value]}${value}`} id={String(value)}>
                                        {index !== 0
                                            ? totalCount[value] || "---"
                                            : "Всего"
                                        }
                                    </td>
                                ))
                            }
                        </tr>
                    </tfoot>
                )
            }
        </table>
    );
};