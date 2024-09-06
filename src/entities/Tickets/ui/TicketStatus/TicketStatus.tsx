import cls from "./TicketStatus.module.css";
import {ReactNode} from "react";
import {classNames} from "shared/lib/classNames/classNames";

const mappedTicketStatuses: Record<number, string> = {
    1: cls.red,
    2: cls.yellow,
    3: cls.green
};

interface TicketStatusProps {
    status: number;
    children?: ReactNode;
    className?: string;
}

export const TicketStatus = (props: TicketStatusProps) => {
    const {status, children, className} = props;

    return (
        <span className={classNames(cls.status, {},  [mappedTicketStatuses[status], className])}>
            {children}
        </span>
    );

};