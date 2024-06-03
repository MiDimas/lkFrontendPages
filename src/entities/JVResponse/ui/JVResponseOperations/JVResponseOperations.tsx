import {useState} from "react";
import {useInitialEffect} from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import {getHistoryResponse} from "../../api/getHistoryResponse/getHistoryResponse";
import {JVResponseHistorySchema} from "../../model/types/JVResponseHistorySchema";
import cls from"./JVResponseOperations.module.css";
interface JVResponseOperationsProps {
    className?: string;
    responseId: number;
}
export const JVResponseOperations = (props: JVResponseOperationsProps) => {
    const {
        responseId,
        className
    } = props;
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [historyResponse, setHistoryResponse] = useState<JVResponseHistorySchema[]>();

    useInitialEffect(async () => {
        const response = await getHistoryResponse({id:responseId});
        console.log(response);
        setIsLoading(false);
        if(response.result){
            setHistoryResponse(response.data);
        }
    });
    if(isLoading){
        return <div>Loading...</div>;
    }
    return (
        <div className={cls.main}>
            <h3>История операций:</h3>
            <div className={cls.list}>
                {historyResponse && historyResponse.map((story) => (
                    <div key={story.created} className={cls.item}>
                        <div className={cls.operation}>{story.operation}</div>
                        <div className={cls.worker}>{story.worker}</div>
                        { story.final &&
                            <div className={cls.res}>Результат: {story.final}</div>
                        }
                        <div className={cls.comment}>Комментарий: {story.comment || "-"}</div>
                        <div className={cls.date}>{story.created}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};