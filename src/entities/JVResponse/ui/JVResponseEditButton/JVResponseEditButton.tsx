import {Dispatch, memo, SetStateAction, useCallback} from "react";
import {JVResponseSchema} from "../../model/types/JVResponseSchema";
import cls from "./JVResponseEditButton.module.css";
import {classNames} from "shared/lib/classNames/classNames";

interface JVResponseEditButtonProps {
    isEdit: boolean;
    setIsEdit: Dispatch<SetStateAction<boolean>>;
    undoChange?: () => void;
    saveChange?: (state: JVResponseSchema) => void;
    state?: JVResponseSchema;
    className?: string;
}
export const JVResponseEditButton = memo(
    (props: JVResponseEditButtonProps)=> {
        const {
            isEdit,
            setIsEdit,
            undoChange,
            state,
            saveChange,
            className
        } = props;

        const undoHandler = useCallback(() => {
            if(undoChange) {
                undoChange();
            }
        }, [undoChange]);
        const saveHandler = useCallback((state?:JVResponseSchema) => {
            if(saveChange && state) {
                saveChange(state);
            }
        }, [saveChange]);
        if(!isEdit) {
            return(
                <button
                    className={cls.btns}
                    onClick={() => {setIsEdit(true);}}
                >
                    Редактировать
                </button>
            );
        }
        return (
            <>
                <button
                    className={classNames(cls.btns, {}, [className])}
                    onClick={() => {
                        saveHandler(state);
                    }}
                >Сохранить</button>
                <button className={classNames(cls.btns, {}, [className])}
                    onClick={undoHandler}>Отменить</button>
            </>
        );
    });
JVResponseEditButton.displayName = "JVResponseEditButton";