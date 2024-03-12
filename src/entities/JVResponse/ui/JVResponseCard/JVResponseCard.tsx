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
            <div>{response.fio}</div>
        </div>
    );
};