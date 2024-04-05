import {Portal} from "shared/ui/Portal/Portal";
import {classNames} from "shared/lib/classNames/classNames";
import cls from "./PopUpMessage.module.css";
export type Severity = "success"|"warning"|"error";
interface PopUpMessageProps {
    text?: string;
    severity?: Severity;
    parent?: HTMLElement;
}


export function PopUpMessage (props: PopUpMessageProps) {
    const {
        text,
        severity="success",
        parent
    } = props;
    return (
        <Portal parent={parent}>
            <div className={cls.background}>
                <div className={classNames(cls.card, {}, [cls[severity]])}>
                    <p className={cls.message}>{text}</p>
                </div>
            </div>
        </Portal>
    );
}