import { TicketStatus } from "../TicketStatus/TicketStatus";
import cls from "./TicketMainInfo.module.css";
import {classNames} from "shared/lib/classNames/classNames";

interface TicketMainInfoProps {
    status: number;
    status_name: string;
    region?: string;
    region_name?: string;
    city?: string;
    city_name?: string;
    price?: number;
    ticket_date: string;
    date_update: string;
}

export const TicketMainInfo = (props: TicketMainInfoProps) => {
    const {
        status,
        status_name,
        region,
        region_name,
        city,
        city_name,
        price,
        ticket_date,
        date_update
    } = props;
    return (
        <div className={classNames(cls.main)}>
            <div className={cls.date_info}>
                <div className={cls.date}>
                    <span className={cls.title}>Дата билета: </span>
                    <span className={cls.value}>{ticket_date}</span>
                </div>
                <div className={cls.update}>
                    <span className={cls.title}>Последнее обновление: </span>
                    <span className={cls.value}>{date_update}</span>
                </div>
            </div>
            <div className={cls.region_info}>
                {city_name && (
                    <div>
                        <span className={cls.title}>Город: </span>
                        <span className={cls.value}>{city_name}</span>
                    </div>
                )}
                {region_name && (
                    <div>
                        <span className={cls.title}>Участок: </span>
                        <span className={cls.value}>{region_name}</span>
                    </div>
                )}
            </div>
            <div className={cls.status_info}>
                <TicketStatus status={status}>{status_name}</TicketStatus>
            </div>
        </div>
    );

};