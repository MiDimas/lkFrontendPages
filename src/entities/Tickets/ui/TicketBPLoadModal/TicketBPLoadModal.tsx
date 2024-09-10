import {Modal} from "shared/ui/Modal/Modal";
import cls from "./TicketBPLoadModal.module.css";
import {FileLoader} from "shared/ui/FileLoader/FileLoader";
import {TicketSchema} from "../../model/types/TicketSchema";
import {SendTicketBPParams} from "../../model/types/SendTicketBPSchema";
import {useCallback, useEffect, useState} from "react";

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
                <div className={cls.info}>
                    <span>Загрузить посадочный для билета: {ticketTo}</span>
                    <span>От: {ticketDate}</span>
                    <span>Ценность: {ticketPrice}</span>
                </div>
                {isLoading
                    ? <div>Loading...</div>
                    :<><FileLoader setFile={setFile}/>
                        {file &&
                        <button onClick={()=> onSendHandler(file)}>send it
                        </button>}
                    </>
                }
            </div>
        </Modal>
    );
};

