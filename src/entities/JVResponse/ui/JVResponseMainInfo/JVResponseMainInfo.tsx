import cls from "./JVResponseMainInfo.module.css";
import {Dispatch, memo, SetStateAction, useCallback} from "react";
import {JVResponseSchema} from "../../";
import {Input} from "shared/ui/Input/Input";
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

    const fioEdit = useCallback(
        (fio:string = "") => {
            setState?.((prevState) => ({...prevState, fio}));
        },
        [setState],
    );
    const jobTitleEdit = useCallback(
        (jobTitle: string) => {
            setState?.((prev) => ({...prev, jobTitle}));
        }, [setState]
    );
    const emailEdit = useCallback(
        (email:string = "") => {
            setState?.((prevState) => ({...prevState, email}));
        },
        [setState],
    );
    const phoneEdit = useCallback(
        (phone: string) => {
            setState?.((prev) => ({...prev, phone}));
        }, [setState]
    );


    return (
        <div className={cls.mainCont}>
            <div className={cls.fio}>
                {canEdit
                    ? <Input value={fio} onChange={fioEdit} className={cls.input}/>
                    :<div>{fio}</div>
                }
            </div>
            <div className={cls.status}>
                <div>{statusName}</div>
            </div>
            <div className={cls.jobTitle}>
                {canEdit
                    ? <Input value={jobTitle} onChange={jobTitleEdit} className={cls.input}/>
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
                        ? <Input value={email || ""} onChange={emailEdit} />
                        :<span>{email || "нет данных" }</span>
                    }
                </div>
                <div className={cls.phone}>
                    <span>Телефон:</span>
                    {canEdit
                        ? <Input value={phone || ""} onChange={phoneEdit} />
                        : <span>{phone || "нет данных" }</span>
                    }
                </div>
            </div>
        </div>
    );
});
JVResponseMainInfo.displayName = "JVResponseMainInfo";