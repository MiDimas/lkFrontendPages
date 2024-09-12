import cls from "./TicketMainInfoLoader.module.css";
import {Skeleton} from "shared/ui/Skeleton/Skeleton";
import {classNames} from "shared/lib/classNames/classNames";

export const TicketMainInfoLoader = () => {

    return (<div className={classNames(cls.main)}>
        <div className={cls.date_info}>
            <div className={cls.date}>
                <span className={cls.title}>Дата билета: </span>
                <Skeleton width={"95%"} />
            </div>
            <div className={cls.update}>
                <span className={cls.title}>Последнее обновление: </span>
                <Skeleton width={"95%"}/>
            </div>
        </div>
        <div className={cls.details}>
            <div className={cls.region_info}>
                <div>
                    <Skeleton className={cls.inline} width={100}/>
                    <Skeleton className={cls.inline} width={100}/>
                </div>
            </div>
            <div className={cls.status_info}>
                <Skeleton />
            </div>
            <div className={cls.price}>
                <span className={cls.title}>Ценность билета: </span>
                <Skeleton className={cls.inline}/>
            </div>
        </div>
    </div>);
};