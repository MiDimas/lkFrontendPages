import {Dispatch, memo, SetStateAction, useCallback} from "react";
import {JVResponseSchema} from "../../";

interface JVResponseEditButtonProps {
    isEdit: boolean;
    setIsEdit: Dispatch<SetStateAction<boolean>>;
    undoChange?: () => void;
    saveChange?: (state: JVResponseSchema) => void;
    state?: JVResponseSchema;
}
export const JVResponseEditButton = memo(
    (props: JVResponseEditButtonProps)=> {
        const {
            isEdit,
            setIsEdit,
            undoChange,
            state,
            saveChange
        } = props;

        const undoHandler = useCallback(() => {
            if(undoChange) {
                undoChange();
            }
            setIsEdit(false);
        }, [undoChange, setIsEdit]);
        const saveHandler = useCallback((state?:JVResponseSchema) => {
            if(saveChange && state) {
                saveChange(state);
            }
            setIsEdit(false);
        }, [saveChange, setIsEdit]);
        if(!isEdit) {
            return(
                <button
                    onClick={() => {setIsEdit(true);}}
                >
                    Редактировать
                </button>
            );
        }
        return (
            <>
                <button
                    onClick={() => {
                        saveHandler(state);
                    }}
                >Сохранить</button>
                <button onClick={undoHandler}>Отменить</button>
            </>
        );
    });
JVResponseEditButton.displayName = "JVResponseEditButton";