import {Modal} from "shared/ui/Modal/Modal";
import cls from "./TicketBPLoadModal.module.css";
import {FileLoader} from "shared/ui/FileLoader/FileLoader";
import {TicketSchema} from "../../model/types/TicketSchema";
import {SendTicketBPParams} from "../../model/types/SendTicketBPSchema";
import {useCallback, useEffect, useState} from "react";
import {Button} from "shared/ui/Button/Button";
import {Skeleton} from "shared/ui/Skeleton/Skeleton";

interface TicketBPLoadModalProps {
    ticketId?: number;
    isOpen?: boolean;
    onClose?: ()=>void;
    ticketInfo?: TicketSchema;
    onSend?: (params: SendTicketBPParams) => void;
    userId?: number;
    isLoading?: boolean;
}

export const TicketBPLoadModal = (props: TicketBPLoadModalProps) => {
    const {
        ticketId,
        isOpen,
        onClose,
        ticketInfo,
        onSend,
        userId,
        isLoading
    } = props;
    const [file, setFile] = useState<File>();
    const ticketTo = ticketInfo?.city_name || ticketInfo?.region_name;
    const ticketDate  = ticketInfo?.ticket_date;
    const ticketPrice = ticketInfo?.price;
    const onSendHandler = useCallback((file:File) => {
        if (ticketId && userId){
            if(file){
                onSend?.({ticket: ticketId, picture: file, userId: userId});
            }
        }
    }, [onSend, ticketId, userId]);

    useEffect(() => {
        if(!ticketId){
            setFile(undefined);
        }
    }, [ticketId]);


    if(!ticketId || !userId){
        return null;
    }
    return (
        <Modal
            onClose={onClose}
            isOpen={isOpen}
            className={cls.modal}
        >
            <div className={cls.form} >
                <h4 className={cls.title}>Загрузка посадочного</h4>
                <div className={cls.info}>
                    <span>Для билета: {ticketTo}</span>
                    <span>От: {ticketDate}</span>
                    <span>Ценность: {ticketPrice}</span>
                </div>

                {isLoading
                    ? <Skeleton width={"100%"}/>
                    :<><FileLoader setFile={setFile}/>
                        {file &&
                        <Button onClick={()=> onSendHandler(file)}>send it
                        </Button>}
                    </>
                }
            </div>
        </Modal>
    );
};

