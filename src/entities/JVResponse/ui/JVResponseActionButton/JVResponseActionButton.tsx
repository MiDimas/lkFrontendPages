import {memo, useCallback, useState} from "react";
import cls from "../JVResponseCard/JVResponseCard.module.css";
import {Dropdown} from "shared/ui/Dropdown/Dropdown";
import {classNames} from "shared/lib/classNames/classNames";
import {useModalState} from "shared/lib/hooks/useModalState/useModalState";
import {Modal} from "shared/ui/Modal/Modal";
import {JVResponseCommentForm} from "../JVResponseCommentForm/JVResponseCommentForm";
import {SearchUser} from "entities/User/ui/SearchUser/SearchUser";
import {UserSchema} from "entities/User";
import {Reflection} from "shared/ui/Reflection/Reflection";
import {ValidateExportResponse} from "../../lib/validate/validateExport";

interface JVResponseActionButtonProps {
    id: number;
    status: number;
    change: (id:number,
        response: number,
        comment?: string|null,
        responsible?: string|null,
        responsibleSec?: string|null) => void;
    className?: string;
    owner?:boolean;
    validExport?: (status: number) => boolean;
}
export const JVResponseActionButton = memo((props: JVResponseActionButtonProps) => {
    const {
        id,
        status,
        change,
        className,
        owner,
        validExport
    } = props;
    const {isOpen: isOpenModal,
        onOpen: onOpenModal,
        onClose: onCloseModal
    } = useModalState(false);
    const [newStatus, setNewStatus] = useState<number>(status);
    const [selected, setSelected] = useState<UserSchema>();
    const [selectedSec, setSelectedSec] = useState<UserSchema>();
    const [isLoading, setIsLoading] =useState<boolean>(false);
    const changeStatus = useCallback((status:number) => {
        if(!validExport?.(status)){
            return;
        }
        setNewStatus(status);
        onOpenModal();
    }, [onOpenModal, validExport]);

    const isExport = newStatus === 6;

    if(status === 1) {
        return (<button
            className={cls.buttonToWork}
            onClick={() => change(id, 2)}
        >
            В работу
        </button>);
    }
    else if((status===2 ||  status===3 || status===4 || status===7) && owner ) {
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
                        },
                        {
                            name: "Сообщение",
                            callBack: ()=> {changeStatus(7);}
                        }
                    ]}
                >
                    Результат
                </Dropdown>
                {isOpenModal &&
                <Modal onClose={onCloseModal} isOpen={isOpenModal} className={cls.modal}>
                    <>
                        { newStatus === 6 &&
                            <>
                                <h4>Экспорт кандидата в 1С</h4>
                                <SearchUser
                                    select={selected}
                                    setSelect={setSelected}
                                    label={"*Выберите ответственного"} />
                                <SearchUser
                                    select={selectedSec}
                                    setSelect={setSelectedSec}
                                    label={"Выберите доп. ответственного"} />
                            </>
                        }
                        <JVResponseCommentForm
                            onClose={onCloseModal}
                            onSend={async (comment) => {
                                setIsLoading(true);
                                if(isExport && !!selected) {
                                    await change(id, newStatus, comment, selected.code, selectedSec?.code);
                                }
                                else{
                                    await change(id, newStatus, comment);
                                }
                                setIsLoading(false);
                            }
                            }
                            approveDisabled={(isExport && !selected) || isLoading}
                        />
                        {isLoading &&
                            <Reflection radius={10}/>
                        }
                    </>
                </Modal>
                }
            </>


        );
    }
});
JVResponseActionButton.displayName = "JVResponseActionButton";