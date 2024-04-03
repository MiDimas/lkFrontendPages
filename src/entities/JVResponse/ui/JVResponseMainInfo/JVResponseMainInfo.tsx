import cls from "./JVResponseMainInfo.module.css";
import {Dispatch, memo, SetStateAction, useCallback, useEffect, useState} from "react";
import {JVResponseSchema} from "../../";
import {Input} from "shared/ui/Input/Input";
import {classNames} from "shared/lib/classNames/classNames";
import {phoneMask} from "shared/lib/helpers/masks/phoneMask";
import {emailMask} from "shared/lib/helpers/masks/emailMask";
import {emailValidator} from "shared/lib/helpers/validators/emailValidator";
import {phoneValidator} from "shared/lib/helpers/validators/phoneValidator";
interface JVRCardMainInfo {
    fio: string;
    jobTitle: string;
    email?: string;
    phone?: string;
    categoryName?: string;
    statusName?: string;
}
interface JVResponseMainInfoProps {
    canEdit?: boolean;
    className?: string;
    state: JVRCardMainInfo;
    setState?: Dispatch<SetStateAction<JVResponseSchema>>;
}
const initialValid = {
    fio: true,
    jobTitle: true,
    email: true,
    phone: true,
};
export const JVResponseMainInfo = memo((props: JVResponseMainInfoProps) => {
    const {
        state,
        canEdit,
        className,
        setState
    } = props;

    const {
        fio,
        jobTitle,
        email,
        phone,
        categoryName,
        statusName
    } = state;

    const [valid, setValid] = useState(initialValid);

    const fioEdit = useCallback(
        (fio:string = "") => {
            setState?.((prevState) => ({...prevState, fio}));
            setValid((prev) => ({
                ...prev,
                fio: fio.trim().length > 5
            }));
        },
        [setState],
    );
    const jobTitleEdit = useCallback(
        (jobTitle: string) => {
            setState?.((prev) => ({...prev, jobTitle}));
            setValid((prev) => ({
                ...prev,
                jobTitle: jobTitle.trim().length > 4
            }));
        }, [setState]
    );
    const emailEdit = useCallback(
        (email:string = "") => {
            email = emailMask(email);
            setState?.((prevState) => ({...prevState, email}));
            setValid((prev) =>({
                ...prev,
                email: email ? emailValidator(email) : (!!state.phone?.length)
            }));
        },
        [setState, state.phone],
    );
    const phoneEdit = useCallback(
        (phone: string) => {
            phone=phoneMask(phone);
            setState?.((prev) => ({...prev, phone}));
            setValid((prev) =>({
                ...prev,
                phone: phone ? phoneValidator(phone) : (!!state.email?.length)
            }));
        }, [setState, state.email]
    );

    useEffect(() => {
        if(!canEdit) {
            setValid(initialValid);
        }

    }, [canEdit]);
    return (
        <div className={classNames(cls.mainCont, {}, [className])}>
            <div className={cls.fio}>
                {canEdit
                    ? (
                        <Input
                            value={fio}
                            onChange={fioEdit}
                            className={classNames(cls.input, {[cls.warn]: !valid.fio}, [])}
                            placeholder="ФИО"
                        />)
                    :<div>{fio}</div>
                }
            </div>
            <div className={cls.status}>
                <div>{statusName}</div>
            </div>
            <div className={cls.jobTitle}>
                {canEdit
                    ? (
                        <Input
                            value={jobTitle}
                            onChange={jobTitleEdit}
                            className={classNames(cls.input, {[cls.warn]: !valid.jobTitle}, [])}
                            placeholder="Должность"
                        />)
                    : <div>{jobTitle}</div>
                }
            </div>
            <div className={cls.category}>
                <div>{categoryName || "Неизвестно"}</div>
            </div>
            <div className={cls.bottom}>
                <div className={cls.email}>
                    <span>Почта:</span>
                    {canEdit
                        ? (
                            <Input
                                className={classNames("", {[cls.warn]: !valid.email}, [])}
                                value={email || ""}
                                onChange={emailEdit}
                            />)
                        :<span>{email || "нет данных" }</span>
                    }
                </div>
                <div className={cls.phone}>
                    <span>Телефон:</span>
                    {canEdit
                        ? (
                            <Input
                                value={phone || ""}
                                className={classNames("", {[cls.warn]: !valid.phone}, [])}
                                onChange={phoneEdit}
                            />)
                        : <span>{phone || "нет данных" }</span>
                    }
                </div>
            </div>
        </div>
    );
});
JVResponseMainInfo.displayName = "JVResponseMainInfo";