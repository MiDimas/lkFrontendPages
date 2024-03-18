import {JVResponseSchema} from "../../model/types/JVResponseSchema";
import cls from "./JVResponseCard.module.css";
import {useCallback, useEffect, useState} from "react";

interface JVResponseCardProps {
    response: JVResponseSchema
    toWorkCallback?: (id: number) => Promise<ResponsesStructure<null>>
}
export const JVResponseCard = (props: JVResponseCardProps) => {
    const {
        response,
        toWorkCallback
    } = props;

    const [resp, setResp] = useState<ResponsesStructure<null>>();
    const toWorkHandler = useCallback(async(id:number) => {
        if(toWorkCallback) {
            const res = await toWorkCallback(id);
            setResp(res);
        }
    }, [toWorkCallback]);

    useEffect(() => {
        console.log(resp);
    }, [resp]);


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
                    <button onClick={() => toWorkHandler(response.id)}>В работу</button>
                </div>
            </div>
        </div>
    );
};