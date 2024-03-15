import {TabItem, Tabs} from "shared/ui/Tabs/Tabs";
import {GetJVResponsesParams, JVOrderSchema, JVRStatusSchema, JVSortSchema} from "../../model/types/JVResponsesSchema";
import {Dispatch, SetStateAction, useCallback, useMemo, useState} from "react";
import cls from "./JobVacancyResponseFilter.module.css";
import {Select, SelectOption} from "shared/ui/Select/Select";
import {classNames} from "shared/lib/classNames/classNames";

interface JobVacancyResponseFilterProps {
    params: GetJVResponsesParams;
    setParams: Dispatch<SetStateAction<GetJVResponsesParams>>;
    user: User;
    className: string;
    statuses?: JVRStatusSchema[];
}

export const JobVacancyResponseFilter =(props:JobVacancyResponseFilterProps) => {
    const {
        params,
        setParams,
        user,
        className,
        statuses
    } = props;

    const [isHidden, setIsHidden] = useState(true);

    const workerTabs: TabItem<number>[] = useMemo(() => ([
        {
            value: 0,
            content: "Все отклики"
        },
        {
            value: user.id,
            content: "Мои отклики"
        }
    ]), [user]);
    const workerValue = params.worker;
    const changeWorker = useCallback(
        (tab: TabItem<number>) => {
            setParams((prevState) => {
                if(prevState.worker !== tab.value) {
                    return {...prevState, worker:tab.value};
                }
                return prevState;
            });
        }, [setParams]);
    const statusTabs: TabItem<number>[] = useMemo(() => {
        const returned = [
            {
                value: 0,
                content: "Все"
            }
        ];
        if(statuses && statuses.length){
            statuses.map(statusObj => {
                returned.push({
                    value: statusObj.id,
                    content: statusObj.name
                });
            });
        }
        return returned;
    }, [statuses]);
    const statusValue = params.status;
    const changeStatus = useCallback(
        (tab: TabItem<number>) => {
            setParams((prevState) => {
                if(prevState.status !== tab.value) {
                    return {...prevState, status:tab.value};
                }
                return prevState;
            });
        }, [setParams]);

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
        <div className={classNames(cls.filter, {}, [className])}>
            <div className={cls.tabBlock}>
                <Tabs
                    tabs={workerTabs}
                    value={workerValue}
                    onTabClick={changeWorker}
                />
            </div>
            <button
                className={classNames(cls.visionBtn , {
                    [cls.visionBtnActive]: !isHidden,
                }, [])}
                onClick={() => setIsHidden((p) => !p)}
            >{">"}</button>

            <div className={classNames(cls.additional, {
                [cls.hidden]: isHidden
            }, [])}>
                <div className={cls.tabBlock}>
                    <span className={cls.titleTab}>Статус:</span>
                    <Tabs
                        tabs={statusTabs}
                        value={statusValue}
                        onTabClick={changeStatus}
                    />
                </div>
                <div className={cls.tabBlock}>
                    <span className={cls.titleTab}>Сортировать по:</span>
                    <Tabs
                        tabs={sortTabs}
                        value={sortValue}
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


        </div>
    );
};
