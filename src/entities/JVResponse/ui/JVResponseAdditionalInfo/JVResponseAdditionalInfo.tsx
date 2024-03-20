import {Dispatch, memo, SetStateAction, useCallback} from "react";
import {classNames} from "shared/lib/classNames/classNames";
import cls from "./JVResponseAdditionalInfo.module.css";
import {Input} from "shared/ui/Input/Input";
import {JVResponseSchema} from "../../model/types/JVResponseSchema";

interface JVRCardAdditionalInfo {
    birth_date?: string;
    countryName?: string;
    workerName?: string;
    identifierName?: string;
    createdDate?:string;
    updatedDate?:string;
    comment?:string;
}
interface JVResponseAdditionalInfoProps {
    visible?: boolean;
    canEdit?: boolean;
    className?: string;
    state?: JVRCardAdditionalInfo;
    setState?: Dispatch<SetStateAction<JVResponseSchema>>
}
export const JVResponseAdditionalInfo = memo((props: JVResponseAdditionalInfoProps) => {
    const {
        visible = true,
        className,
        state = {},
        canEdit,
        setState
    } = props;
    const {
        birth_date,
        countryName,
        workerName,
        identifierName,
        createdDate,
        updatedDate,
        comment
    } = state;


    const birthEdit = useCallback(
        (birth_date:string) => {
            setState?.(prevState => ({...prevState, birth_date}));
        },
        [setState],
    );


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
                <Input value={birth_date || "Не указана"} readOnly={!canEdit} onChange={birthEdit} />
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