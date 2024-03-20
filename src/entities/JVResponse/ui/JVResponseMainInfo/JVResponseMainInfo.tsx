import cls from "./JVResponseMainInfo.module.css";
import {memo} from "react";

interface JVResponseMainInfoProps {
    fio: string;
    job_title: string;
    email?: string;
    phone?: string;
    category?: number;
    statusName?: string;
}
export const JVResponseMainInfo = memo((props: JVResponseMainInfoProps) => {
    const {
        fio,
        job_title,
        email,
        phone,
        category,
        statusName
    } = props;

    return (
        <div className={cls.mainCont}>
            <div className={cls.top}>
                <div>{fio}</div>
                <div>{statusName}</div>
            </div>
            <div className={cls.middle}>
                <div>
                    {job_title}
                </div>
                <div>{category || "Неизвестно"}</div>
            </div>
            <div className={cls.bottom}>
                <div><span>Почта:</span><span>{email || "нет данных" }</span></div>
                <div><span>Телефон:</span><span>{phone || "нет данных" }</span></div>
            </div>
        </div>
    );
});
JVResponseMainInfo.displayName = "JVResponseMainInfo";