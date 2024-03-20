import {JVResponseSchema} from "../../model/types/JVResponseSchema";
import cls from "./JVResponseCard.module.css";
import {useCallback, useEffect,  useState} from "react";
import {JVResponseMainInfo} from "../JVResponseMainInfo/JVResponseMainInfo";
import {JVResponseActionButton} from "../JVResponseActionButton/JVResponseActionButton";

interface JVResponseCardProps {
    response: JVResponseSchema
    changeStatus?: (id: number, status:number) => Promise<ResponsesStructure<null>>
}
export const JVResponseCard = (props: JVResponseCardProps) => {
    const {
        response,
        changeStatus
    } = props;

    const [resp, setResp] = useState<ResponsesStructure<null>>();
    const changeStatusHandler = useCallback(async(id:number, status:number) => {
        if(changeStatus) {
            const res = await changeStatus(id, status);
            setResp(res);
        }
    }, [changeStatus]);

    useEffect(() => {
        console.log(resp);
    }, [resp]);

    return (
        <div className={cls.card}>
            <div className={cls.content}>
                <JVResponseMainInfo
                    fio={response.fio}
                    job_title={response.job_title}
                    email={response.email}
                    phone={response.phone}
                    category={response.category}
                    statusName={response.statusName}
                />
                <div  className={cls.buttonBlock}>
                    <button
                        className={cls.buttonToWork}
                    >
                        Подробнее
                    </button>
                    <JVResponseActionButton
                        id={response.id}
                        status={response.status}
                        change={changeStatusHandler} />
                </div>
            </div>
        </div>
    );
};