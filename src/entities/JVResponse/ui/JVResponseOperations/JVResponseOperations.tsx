import {useState} from "react";
import {useInitialEffect} from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import {getHistoryResponse} from "../../api/getHistoryResponse/getHistoryResponse";
import {JVResponseHistorySchema} from "../../model/types/JVResponseHistorySchema";
interface JVResponseOperationsProps {
    className?: string;
    responseId: number;
}
export const JVResponseOperations = (props: JVResponseOperationsProps) => {
    const {
        responseId,
        className
    } = props;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [historyResponse, setHistoryResponse] = useState<JVResponseHistorySchema[]>();

    useInitialEffect(async () => {
        const response = await getHistoryResponse({id:responseId});
        console.log(response);
        setIsLoading(false);
    });
    if(isLoading){
        return <div>Loading...</div>;
    }
    return (
        <div>
            {responseId}
        </div>
    );
};