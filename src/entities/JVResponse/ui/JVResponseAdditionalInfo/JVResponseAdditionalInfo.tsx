import {Dispatch, memo, SetStateAction, useCallback, useMemo} from "react";
import {classNames} from "shared/lib/classNames/classNames";
import cls from "./JVResponseAdditionalInfo.module.css";
import {Input} from "shared/ui/Input/Input";
import {JVResponseSchema} from "../../model/types/JVResponseSchema";
import {CountrySelect} from "entities/Country/ui/CountrySelect/CountrySelect";
import {CountrySchema} from "entities/Country/model/types/CountrySchema";

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
    setState?: Dispatch<SetStateAction<JVResponseSchema>>;
    countries?: CountrySchema[];
}
export const JVResponseAdditionalInfo = memo((props: JVResponseAdditionalInfoProps) => {
    const {
        visible = true,
        className,
        state = {},
        canEdit,
        setState,
        countries
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

    const normalizedCountry = useMemo<Record<number, string>>(() => {
        const obj:Record<number, string> = {0: ""};
        countries?.map(({id, name}) => {
            obj[id] = name;
        });
        return obj;
    }, [countries]);

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
                    countryName: normalizedCountry[country]
                }))
            ;
        },
        [setState, normalizedCountry],
    );

    return (
        <div className={classNames(cls.additionalBlock, {
            [cls.visible]: visible
        }, [className])}>

            <div className={cls.country}>
                <div>Страна:</div>
                {canEdit
                    ? <CountrySelect value={country ?? 0} options={countries} onChange={countryEdit}/>
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