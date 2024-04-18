import {useCallback, useRef} from "react";
import {classNames} from "shared/lib/classNames/classNames";
import cls from "./JVResponseCommentForm.module.css";

interface JVResponseCommentFormProps {
    onSend?:(comment:string|null)=>void;
    onClose?:()=>void;
    className?: string
}
export const JVResponseCommentForm = (props: JVResponseCommentFormProps) => {
    const {
        onSend,
        className,
        onClose
    } = props;
    const commentRef = useRef<HTMLTextAreaElement>(null);
    const sendHandler = useCallback(async()=> {
        if(commentRef.current) {
            const comment = commentRef.current.value.replace(/[<>\\"']/gi , "");
            if(onSend) {
                await onSend(comment);
            }
        }
        else {
            if(onSend) {
                await onSend(null);
            }
        }
    }, [onSend, commentRef]);

    const closeHandler = useCallback(()=> {
        if(onClose) {
            onClose();
        }
    }, [onClose]);
    return (
        <div className={classNames(cls.form, )}>
            <span>Комментарий</span>
            <textarea ref={commentRef} className={cls.textArea}/>
            <div className={cls.buttonBlock}>
                <button className={cls.button} onClick={sendHandler}>Подтвердить</button>
                <button className={cls.button} onClick={closeHandler}>Отмена</button>
            </div>
        </div>
    );
};