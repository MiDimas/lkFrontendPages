import {Dispatch, memo, SetStateAction, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {classNames} from "shared/lib/classNames/classNames";
import cls from "./JVResponseAdditionalInfo.module.css";
import {Input} from "shared/ui/Input/Input";
import {JVResponseSchema} from "../../model/types/JVResponseSchema";
import {CountrySelect} from "entities/Country/ui/CountrySelect/CountrySelect";
import {CountrySchema} from "entities/Country/model/types/CountrySchema";
import {dateMask} from "shared/lib/helpers/masks/dateMask";
import {validateDate} from "../../lib/validate/validateDate";

interface JVRCardAdditionalInfo {
    birthDate?: string;
    country?: number;
    countryName?: string;
    workerName?: string;
    identifierName?: string;
    createdDate?:string;
    updatedDate?:string;
    comment?:string;
    category?: number;
    referenceName?: string;
    lastComment?: string;
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
        comment,
        category,
        referenceName,
        lastComment,
    } = state;
    const birthRef = useRef<HTMLInputElement>(null);
    const [bPos, setBPos] = useState(0);
    const [validBirth, setValidBirth] = useState(true);
    const normalizedCountry = useMemo<Record<number, string>>(() => {
        const obj:Record<number, string> = {0: ""};
        countries?.map(({id, name}) => {
            obj[id] = name;
        });
        return obj;
    }, [countries]);

    const birthEdit = useCallback(
        (birthDate:string = "", 
            target?: EventTarget & HTMLInputElement,
        ) => {
            const startPos = target?.selectionStart ?? null;
            const endPos = target?.selectionEnd ?? null;
            console.log({startPos, endPos});
            birthDate = dateMask(birthDate);
            setState?.(prevState => ({...prevState, birthDate}));

            if(birthRef.current){
                if(startPos === 2 || startPos === 5) {
                    setBPos(startPos+1);
                }
                else {
                    setBPos(startPos??0);
                }
            }
            const validDate = birthDate.length === 10 || birthDate.length ===0;
            if(validDate) {
                setValidBirth(validateDate(birthDate));
            }
            else {
                setValidBirth(false);
            }
        },
        [setState, setBPos, setValidBirth],
    );
    useEffect(() => {
        if(birthRef.current!==null) {
            birthRef.current.selectionStart = bPos;
            birthRef.current.selectionEnd = bPos;
        }
    }, [bPos]);

    useEffect(() => {
        if(canEdit) {
            setValidBirth(true);
        }
    }, [canEdit, setValidBirth]);
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
                { canEdit ? (
                    <Input
                        ref={birthRef}
                        value={birthDate || ""}
                        placeholder="ДД.ММ.ГГГГ"
                        onChange={birthEdit}
                        className={classNames(cls.input, {[cls.warn]: !validBirth}, [])}
                    />)
                    : <div>{birthDate || "Не указана"}</div>
                }
            </div>
            <div className={cls.comment}>
                <div>Комментарий к отклику: </div>
                <div className={cls.newline}>{comment || "Отсутствует"}</div>
            </div>
            <div className={cls.responser}>
                <div>Ответственный:</div>
                <div>{workerName || "-"}</div>
            </div>
            <div className={cls.identifier}>
                <div>Идентификатор:</div>
                <div>{identifierName || "Отсутствует"}</div>
            </div>
            <div className={cls.message}>
                <div>Последний комментарий по отклику:</div>
                <div className={cls.newline}>{lastComment}</div>
            </div>
            { category && category !== 1 &&
            (
                <div className={cls.recommend}>
                    <div>{category === 2 ? "Рекомендатель:" : "Внес:"}</div>
                    <div>{referenceName || "Не указано"}</div>
                </div>
            )
            }
            <div className={cls.date}>
                <div>Создано: {createdDate || "--.--.----"}</div>
                <div>Обновлено: {updatedDate || "--.--.----"}</div>
            </div>
        </div>
    );
});
JVResponseAdditionalInfo.displayName = "JVResponseAdditionalInfo";