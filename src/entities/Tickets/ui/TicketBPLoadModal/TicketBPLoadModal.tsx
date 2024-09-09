import {Modal} from "shared/ui/Modal/Modal";
import cls from "./TicketBPLoadModal.module.css";
import {FileLoader} from "shared/ui/FileLoader/FileLoader";

interface TicketBPLoadModalProps {
    ticketId?: number;
    isOpen?: boolean;
    onClose?: ()=>void;
    ticketDate?: string;
    ticketTo?: string;
    ticketPrice?: number;
    setFile?: (file: File | null) => void;
}

export const TicketBPLoadModal = (props: TicketBPLoadModalProps) => {
    const {
        ticketId,
        isOpen,
        onClose,
        ticketDate,
        ticketTo,
        ticketPrice,
        setFile
    } = props;


    if(!ticketId){
        return null;
    }
    return (
        <Modal
            onClose={onClose}
            isOpen={isOpen}
            className={cls.modal}
        >
            <form>
                <p>
                    Загрузить посадочный для билета: {ticketTo}
                    От: {ticketDate}
                    Ценность: {ticketPrice}
                </p>
                <FileLoader setFile={setFile} />
            </form>
        </Modal>
    );
};

