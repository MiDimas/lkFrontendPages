import {Dispatch, memo, SetStateAction, useCallback} from "react";
import {classNames} from "shared/lib/classNames/classNames";
import cls from "./JVResponseAdditionalInfo.module.css";
import {Input} from "shared/ui/Input/Input";
import {JVResponseSchema} from "../../model/types/JVResponseSchema";
import {Select, SelectOption} from "shared/ui/Select/Select";

interface JVRCardAdditionalInfo {
    birthDate?: string;
    country?: number;
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
const countryList: SelectOption<number>[] =[
    {
        value: 0,
        content: "Не указана",
        disabled: true
    },
    {
        value: 1,
        content: "Россия"
    }
];
export const JVResponseAdditionalInfo = memo((props: JVResponseAdditionalInfoProps) => {
    const {
        visible = true,
        className,
        state = {},
        canEdit,
        setState
    } = props;
    const {
        birthDate = "",
        country,
        countryName,
        workerName,
        identifierName,
        createdDate,
        updatedDate,
        comment
    } = state;


    const birthEdit = useCallback(
        (birthDate:string = "") => {
            setState?.(prevState => ({...prevState, birthDate}));
        },
        [setState],
    );
    const countryEdit = useCallback(
        (country:string|number = 0) => {
            country = Number(country);
            setState?.((prevState) => (
                {
                    ...prevState,
                    country,
                    countryName: countryList[country]["content"]
                }))
            ;
        },
        [setState],
    );


    return (
        <div className={classNames(cls.additionalBlock, {
            [cls.visible]: visible
        }, [className])}>

            <div className={cls.country}>
                <div>Страна:</div>
                {canEdit
                    ? <Select value={country ?? 0} options={countryList} onChange={countryEdit}/>
                    : <div>{countryName || "Не указана"}</div>
                }

            </div>
            <div className={cls.birthDate}>
                <div>Дата рождения:</div>
                { canEdit ?
                    <Input value={birthDate || ""} onChange={birthEdit} className={cls.input} />
                    : <div>{birthDate ?? "Не указана"}</div>
                }
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