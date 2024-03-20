import {memo} from "react";
import {classNames} from "shared/lib/classNames/classNames";
import cls from "./JVResponseAdditionalInfo.module.css";

interface JVResponseAdditionalInfoProps {
    visible?: boolean;
    className?: string;
    birth_date?: string;
    countryName?: string;
    workerName?: string;
    identifierName?: string;
    createdDate?:string;
    updatedDate?:string;
    comment?:string;
}
export const JVResponseAdditionalInfo = memo((props: JVResponseAdditionalInfoProps) => {
    const {
        visible = true,
        className,
        birth_date,
        countryName,
        workerName,
        identifierName,
        createdDate,
        updatedDate,
        comment
    } = props;
    return (
        <div className={classNames(cls.additionalBlock, {
            [cls.visible]: visible
        }, [className])}>

            <div className={cls.country}>
                <div>Страна:</div>
                <div>{countryName || "Не указана"}</div>
            </div>
            <div className={cls.birthDate}>
                <div>Дата рождения:</div>
                <div>{birth_date || "Не указана"}</div>
            </div>
            <div className={cls.comment}>
                <div>Комментарий к отклику: </div>
                <div>{comment || "Отсутствует"}</div>
            </div>
            <div className={cls.responser}>
                <div>Ответственный:</div>
                <div>{workerName || "-"}</div>
            </div>
            <div className={cls.identifier}>
                <div>Идентификатор:</div>
                <div>{identifierName || "Отсутствует"}</div>
            </div>

            <div className={cls.date}>
                <div>Создано: {createdDate || "--.--.----"}</div>
                <div>Обновлено: {updatedDate || "--.--.----"}</div>
            </div>
        </div>
    );
});
JVResponseAdditionalInfo.displayName = "JVResponseAdditionalInfo";