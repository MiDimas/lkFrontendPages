import {JVResponseSchema} from "../../model/types/JVResponseSchema";
import cls from "./JVResponseCard.module.css";
import {useCallback, useEffect, useState} from "react";
import {Dropdown} from "shared/ui/Dropdown/Dropdown";

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

    const mainButton = (status: number) => {
        if(status === 1) {
            return (<button
                className={cls.buttonToWork}
                onClick={() => changeStatusHandler(response.id, 2)}
            >
                В работу
            </button>);
        }
        else if(status===2 ||  status===3 || status===4) {
            return (
                <Dropdown
                    className={cls.buttonToWork}
                    items={[
                        {name: "Подумает"}
                    ]}
                >
                    Результат
                </Dropdown>
            );
        }
    };

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
                    <button
                        className={cls.buttonToWork}
                    >
                        Подробнее
                    </button>
                    {
                        mainButton(response.status)
                    }
                </div>
            </div>
        </div>
    );
};