import {memo, useCallback, useState} from "react";
import cls from "../JVResponseCard/JVResponseCard.module.css";
import {Dropdown} from "shared/ui/Dropdown/Dropdown";
import {classNames} from "shared/lib/classNames/classNames";
import {useModalState} from "shared/lib/hooks/useModalState/useModalState";
import {Modal} from "shared/ui/Modal/Modal";
import {JVResponseCommentForm} from "../JVResponseCommentForm/JVResponseCommentForm";

interface JVResponseActionButtonProps {
    id: number;
    status: number;
    change: (id:number, response: number, comment?: string|null) => void;
    className?: string;
    owner?:boolean;
}
export const JVResponseActionButton = memo((props: JVResponseActionButtonProps) => {
    const {
        id,
        status,
        change,
        className,
        owner
    } = props;
    const {isOpen: isOpenModal,
        onOpen: onOpenModal,
        onClose: onCloseModal
    } = useModalState(false);
    const [newStatus, setNewStatus] = useState<number>(status);

    const changeStatus = useCallback((status:number) => {
        onOpenModal();
        setNewStatus(status);
    }, [onOpenModal]);

    if(status === 1) {
        return (<button
            className={cls.buttonToWork}
            onClick={() => change(id, 2)}
        >
            В работу
        </button>);
    }

    else if((status===2 ||  status===3 || status===4) && owner ) {
        return (
            <>
                <Dropdown
                    className={classNames(cls.buttonToWork, {}, [className])}
                    items={[
                        {
                            name: "Не дозвон",
                            callBack: ()=> {changeStatus(3);}
                        },
                        {
                            name: "Подумает",
                            callBack: ()=> {changeStatus(4);}
                        },
                        {
                            name: "Отказ",
                            callBack: ()=> {changeStatus(5);}
                        },
                        {
                            name: "Трудоустройство",
                            callBack: ()=> {changeStatus(6);}
                        }
                    ]}
                >
                    Результат
                </Dropdown>
                {isOpenModal &&
                <Modal onClose={onCloseModal} isOpen={isOpenModal}>
                    <JVResponseCommentForm
                        onClose={onCloseModal}
                        onSend={(comment)=> (
                            change(id, newStatus, comment)
                        )} />
                </Modal>
                }
            </>


        );
    }
});
JVResponseActionButton.displayName = "JVResponseActionButton";