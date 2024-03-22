import cls from "./JobVacancyResponseList.module.css";
import {JVResponseCard} from "entities/JVResponse/ui/JVResponseCard/JVResponseCard";
import {JVResponseSchema} from "entities/JVResponse";
import {classNames} from "shared/lib/classNames/classNames";
import {CountrySchema} from "entities/Country/model/types/CountrySchema";

interface JobVacancyResponseBlockListProps {
    isLoading: boolean;
    list: JVResponseSchema[];
    className?: string;
    changeStatus?: (id: number, status:number)=>Promise<ResponsesStructure<null>>;
    updateCard?: (state:JVResponseSchema)=>Promise<ResponsesStructure<null>>;
    user?: User;
    countries?: CountrySchema[];
}
export const JobVacancyResponseList = (props: JobVacancyResponseBlockListProps) => {
    const {
        isLoading,
        list,
        className,
        changeStatus,
        updateCard,
        user,
        countries
    } = props;
    return (
        <div className={classNames(cls.list, {}, [className])}>
            {isLoading
                ? <h3 className={cls.list}>Загрузка...</h3>
                : list.length
                    ? list.map((elem) => (
                        <JVResponseCard
                            key={elem.id}
                            response={elem}
                            changeStatus={changeStatus}
                            user={user}
                            updateCard={updateCard}
                            countries={countries}
                        />
                    ))
                    : "Данные отсутствуют"

            }

        </div>
    );
};