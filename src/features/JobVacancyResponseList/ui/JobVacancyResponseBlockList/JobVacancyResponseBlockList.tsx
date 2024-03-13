import cls from "../JobVacancyResponseList/JobVacancyResponsList.module.css";
import {JVResponseCard} from "entities/JVResponse/ui/JVResponseCard/JVResponseCard";
import {JVResponseSchema} from "entities/JVResponse";

interface JobVacancyResponseBlockListProps {
    isLoading: boolean;
    list: JVResponseSchema[];
}
export const JobVacancyResponseBlockList = (props: JobVacancyResponseBlockListProps) => {
    const {
        isLoading,
        list
    } = props;
    return (
        <div className={cls.list}>
            {isLoading
                ? <h3 className={cls.list}>Загрузка...</h3>
                : list.length
                    ? list.map((elem) => <JVResponseCard key={elem.id} response={elem}/>)
                    : "Данные отсутствуют"

            }

        </div>
    );
};