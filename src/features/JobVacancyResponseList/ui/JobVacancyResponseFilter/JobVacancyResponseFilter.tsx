import {TabItem, Tabs} from "shared/ui/Tabs/Tabs";
import {GetJVResponsesParams, JVSortSchema} from "../../model/types/JVResponsesSchema";
import {Dispatch, SetStateAction, useCallback} from "react";

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
    const sortTabs: TabItem<JVSortSchema>[] = [
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
    ];
    const sortValue = params.sort;
    const changeSort = useCallback(
        (tab: TabItem<JVSortSchema>) => {
            setParams((prevState) => (
                {...prevState, sort: tab.value}
            ));
        },
        [setParams],
    );


    return (
        <div>
            <div>
                <span>Сортировать по:</span>
                <Tabs
                    tabs={sortTabs}
                    value={sortValue || ""}
                    onTabClick={changeSort}
                />
            </div>

        </div>
    );
};
