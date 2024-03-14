import cls from "./JobVacancyResponseList.module.css";
import {JVResponseCard} from "entities/JVResponse/ui/JVResponseCard/JVResponseCard";
import {JVResponseSchema} from "entities/JVResponse";
import {classNames} from "shared/lib/classNames/classNames";

interface JobVacancyResponseBlockListProps {
    isLoading: boolean;
    list: JVResponseSchema[];
    className?: string;
}
export const JobVacancyResponseList = (props: JobVacancyResponseBlockListProps) => {
    const {
        isLoading,
        list,
        className
    } = props;
    return (
        <div className={classNames(cls.list, {}, [className])}>
            {isLoading
                ? <h3 className={cls.list}>Загрузка...</h3>
                : list.length
                    ? list.map((elem) => <JVResponseCard key={elem.id} response={elem}/>)
                    : "Данные отсутствуют"

            }

        </div>
    );
};