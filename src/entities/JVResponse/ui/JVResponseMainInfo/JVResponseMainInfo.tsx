import cls from "./JVResponseMainInfo.module.css";
import {Dispatch, memo, SetStateAction, useCallback, useEffect, useState} from "react";
import {JVResponseSchema} from "../../model/types/JVResponseSchema";
import {Input} from "shared/ui/Input/Input";
import {classNames} from "shared/lib/classNames/classNames";
import {phoneMask} from "shared/lib/helpers/masks/phoneMask";
import {emailMask} from "shared/lib/helpers/masks/emailMask";
import {validateFio} from "../../lib/validate/validateFio";
import {validateJobTitle} from "../../lib/validate/validateJobTitle";
import {validateEmail} from "../../lib/validate/validateEmail";
import {validatePhone} from "../../lib/validate/validatePhone";
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
                fio: validateFio(fio)
            }));
        },
        [setState],
    );
    const jobTitleEdit = useCallback(
        (jobTitle: string) => {
            setState?.((prev) => ({...prev, jobTitle}));
            setValid((prev) => ({
                ...prev,
                jobTitle: validateJobTitle(jobTitle),
            }));
        }, [setState]
    );
    const emailEdit = useCallback(
        (email:string = "") => {
            email = emailMask(email);
            setState?.((prevState) => ({...prevState, email}));
            setValid((prev) =>({
                ...prev,
                email: validateEmail(email, state.phone)
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
                phone: validatePhone(phone, state.email)
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
                    {canEdit
                        ? (
                            <Input
                                className={classNames("", {[cls.warn]: !valid.email}, [])}
                                value={email || ""}
                                onChange={emailEdit}
                                placeholder="Email"
                            />)
                        :<span>{email || "не указан email" }</span>
                    }
                </div>
                <div className={cls.phone}>
                    {canEdit
                        ? (
                            <Input
                                value={phone || ""}
                                className={classNames("", {[cls.warn]: !valid.phone}, [])}
                                onChange={phoneEdit}
                                placeholder="Телефон"
                            />)
                        : <span>{phone || "не указан телефон" }</span>
                    }
                </div>
            </div>
        </div>
    );
});
JVResponseMainInfo.displayName = "JVResponseMainInfo";