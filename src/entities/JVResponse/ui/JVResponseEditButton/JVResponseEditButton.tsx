import {Dispatch, memo, SetStateAction} from "react";

interface JVResponseEditButtonProps {
    isEdit: boolean;
    setIsEdit: Dispatch<SetStateAction<boolean>>;
}
export const JVResponseEditButton = memo(
    (props: JVResponseEditButtonProps)=> {
        const {
            isEdit,
            setIsEdit
        } = props;
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
                        setIsEdit(false);
                    }}
                >Сохранить</button>
                <button onClick={() => {
                    setIsEdit(false);
                }}>Отменить</button>
            </>
        );
    });
JVResponseEditButton.displayName = "JVResponseEditButton";