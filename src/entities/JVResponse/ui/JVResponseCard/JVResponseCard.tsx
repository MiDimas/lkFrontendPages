import {JVResponseSchema} from "../../model/types/JVResponseSchema";
import cls from "./JVResponseCard.module.css";

interface JVResponseCardProps {
    response: JVResponseSchema
}
export const JVResponseCard = (props: JVResponseCardProps) => {
    const {
        response
    } = props;
    return (
        <div className={cls.card}>
            <div className={cls.content}>
                <div className={cls.top}>
                    <div>{response.fio}</div>
                    <div>{response.statusName}</div>
                </div>
                <div className={cls.middle}>
                    <div>
                        {response.job_title}
                    </div>
                    <div>{response.category || "Неизвестно"}</div>
                </div>
                <div className={cls.bottom}>
                    <div><span>Почта:</span><span>{response.email || "нет данных" }</span></div>
                    <div><span>Телефон:</span><span>{response.phone || "нет данных" }</span></div>
                </div>
                <div  className={cls.buttonBlock}>
                    <button>Подробнее</button>
                    <button>В работу</button>
                </div>
            </div>
        </div>
    );
};