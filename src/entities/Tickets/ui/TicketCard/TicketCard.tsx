import {TicketSchema} from "../../model/types/TicketSchema";
import cls from "./TicketCard.module.css";
import {DropdownCard} from "shared/ui/DropdownCard/DropdownCard";
import {TicketMainInfo} from "../TicketMainInfo/TicketMainInfo";
import {useContext} from "react";
import {BPContext} from "../../model/services/BPContext";
import {Button} from "shared/ui/Button/Button";
import {AppImage} from "shared/ui/Image/AppImage";
import {Modal} from "shared/ui/Modal/Modal";
import {IViewerOld} from "widgets/IViewerOld/IViewerOld.jsx";
import {useModalState} from "shared/lib/hooks/useModalState/useModalState";

interface TicketCardProps{
    ticket: TicketSchema;
    className?: string;
}

export function TicketCard(props: TicketCardProps){
    const { ticket, className } = props;
    const { setTicketId } = useContext(BPContext);
    const {isOpen, onOpen, onClose} = useModalState();

    const boardingInfo = (<div className={cls.boarding_info}>
        <AppImage className={cls.image} src={__API__+ticket.boarding_pass} onClick={onOpen} />
        
        <div className={cls.boarding_dates}>
            <div>Посадочный загружен: {ticket.boarding_upload}</div>
            <div>Посадочный обновлен: {ticket.boarding_update}</div>
        </div>
    </div>);

    return (
        <>
            <DropdownCard className={cls.card}
                hideContent={
                    ticket.boarding_id
                        ? boardingInfo
                        : null
                }
                buttonPosition={"end"}
                buttonBlock={
                    ticket.status===1 
                        ? (<Button onClick={() => setTicketId?.(ticket.id)}>
                            Пиркрепить посадочный
                        </Button>)
                        : null
                }
                classNameButtonBlock={cls.button_block}
            >
                <TicketMainInfo
                    {...ticket}
                />
            </DropdownCard>
            {isOpen && <Modal isOpen={isOpen} onClose={onClose} className={cls.modalImage}>
                <IViewerOld srcs={[__API__+ticket.boarding_pass]} />
            </Modal>
            }
        </>
    );
}