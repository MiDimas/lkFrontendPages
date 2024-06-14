import {ReactElement, useCallback, useMemo, useState} from "react";
import cls from "./Table.module.css";
import {classNames} from "shared/lib/classNames/classNames";

interface Column<T extends string | number> {
    id?: T;
    name?: string;
    className?: string;
}
type ColumnClasses<T extends string | number> = OptionalRecord<T, string>
export interface Row<T extends string|number> {
    cells?: OptionalRecord<T, string|number|ReactElement>;
}
interface TableProps<T extends string | number> {
    className?: string;
    cols?: Column<T>[];
    rows?: Row<T>[];
    total?: boolean;
    columnClassNames?: ColumnClasses<T>;
    cellsClassNames?:string;
    placeholder?: string;
    diffRow?: boolean;
    diffCol?: boolean;
}
export const Table = <T extends string | number>(props:TableProps<T>) => {
    const {
        className,
        cols,
        rows,
        total,
        columnClassNames,
        cellsClassNames,
        placeholder = "---",
        diffRow,
        diffCol
    } = props;
    const [totalCount, setTotalCount] = useState<OptionalRecord<T,number>>();
    const createHead = useMemo(() => {
        const head: JSX.Element[] = [];
        const listIndex: T[] = [];
        if(cols){
            cols.map(({id, name}, index) => {
                if(typeof id !== "undefined") {
                    head.push(<th
                        key={id} scope="col"
                        id={String(id)}
                        className={classNames(cls.cell, {
                            [cls.diff]: diffCol && Boolean(index%2)
                        }, [cellsClassNames, columnClassNames? columnClassNames[id]:""])}
                    >{name}</th>);
                    listIndex.push(id);
                    if(total){
                        setTotalCount((prevState) => (
                            {...prevState, [id]: 0}
                        ));

                    }
                }
            });
        }
        return {head, colIndexList: listIndex};
    }, [cols, total, columnClassNames, cellsClassNames, diffCol]);


    const createRow = useCallback(({cells}:Row<T>, key:number) => {
        const res = createHead.colIndexList.map((value, index) => {
            if (cells){
                if(total){
                    if(typeof cells[value] === "number") {
                        setTotalCount((prevState = {}) => {
                            const prevVal = prevState[value]??0 ;
                            return {
                                ...prevState,
                                [value]: Number(cells[value]) + prevVal
                            };
                        });
                    }
                }
                return (
                    <td
                        key={`${key}${cells[value]}${value}`}
                        id={String(value)}
                        className={classNames(cls.cell,
                            {[cls.diff]: diffCol && Boolean(index%2)},
                            [cellsClassNames, columnClassNames? columnClassNames[value]:""])}
                    >
                        {
                            cells[value] || placeholder
                        }
                    </td>
                );
            }
            else {
                return <></>;
            }

        });
        return (
            <tr
                className={classNames(cls.row, {[cls.diffRow]: diffRow && Boolean(key%2)}, [])}
                key={`table${key}`}
            >
                {res}
            </tr>
        );


    }, [createHead, total, columnClassNames, placeholder,  diffRow, diffCol, cellsClassNames]);

    const createRows = useMemo(() => {
        return rows?.map((row, index) => createRow(row, index));
    }, [rows, createRow]);

    return (
        <table className={classNames(cls.table, {}, [className])}>
            <thead className={cls.head}>
                <tr>
                    {createHead.head}
                </tr>
            </thead>
            <tbody>
                {createRows}
            </tbody>
            { total && totalCount &&
                (
                    <tfoot className={cls.foot}>
                        <tr>
                            {
                                createHead.colIndexList.map((value, index) => (
                                    <td
                                        key={`footer${totalCount[value]}${value}`}
                                        id={String(value)}
                                        className={classNames(cls.cell,
                                            {[cls.diff]: diffCol && Boolean(index%2)},
                                            [cellsClassNames, columnClassNames? columnClassNames[value]:""])}
                                    >
                                        {index !== 0
                                            ? totalCount[value] || placeholder
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