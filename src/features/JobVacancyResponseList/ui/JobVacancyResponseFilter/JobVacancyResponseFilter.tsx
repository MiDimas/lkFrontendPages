import {TabItem, Tabs} from "shared/ui/Tabs/Tabs";
import {GetJVResponsesParams, JVOrderSchema, JVSortSchema} from "../../model/types/JVResponsesSchema";
import {Dispatch, memo, SetStateAction, useCallback, useMemo} from "react";
import cls from "./JobVacancyResponseFilter.module.css";
import {Select, SelectOption} from "shared/ui/Select/Select";

interface JobVacancyResponseFilterProps {
    params: GetJVResponsesParams;
    setParams: Dispatch<SetStateAction<GetJVResponsesParams>>;
    user: User;
}

export const JobVacancyResponseFilter =(props:JobVacancyResponseFilterProps) => {
    const {
        params,
        setParams
    } = props;
    const sortTabs: TabItem<JVSortSchema>[] = useMemo(() => ([
        {
            value: "created",
            content: "Дата создания"
        },
        {
            value: "fio",
            content: "Фамилия"
        },
        {
            value: "updated",
            content: "Дата обновления"
        }
    ]), []);
    const sortValue = params.sort;
    const changeSort = useCallback(
        (tab: TabItem<JVSortSchema>) => {
            setParams((prevState) => {
                if(prevState.sort !== tab.value) {
                    return (
                        {...prevState, sort: tab.value}
                    );
                }
                return prevState;
            });
        },
        [setParams],
    );

    const orderOptions: SelectOption<JVOrderSchema>[] = useMemo(()=> ([
        {
            value: "DESC",
            content: "По убыванию"
        },
        {
            value: "ASC",
            content: "По возрастанию"
        }
    ]), []);
    const orderValue = params.order;
    const changeOrder = useCallback(
        (select: JVOrderSchema) => {
            setParams((prevState) => {
                if(prevState.order !== select) {
                    return (
                        {...prevState, order: select}
                    );
                }
                return prevState;
            });
        },
        [setParams],
    );


    return (
        <div className={cls.filter}>
            <div className={cls.tabBlock}>
                <span className={cls.titleTab}>Сортировать по:</span>
                <Tabs
                    tabs={sortTabs}
                    value={sortValue || ""}
                    onTabClick={changeSort}
                />
            </div>
            <div className={cls.tabBlock}>
                <Select
                    options={orderOptions}
                    value={orderValue}
                    onChange={changeOrder}
                />
            </div>

        </div>
    );
};
