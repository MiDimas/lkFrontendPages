import {forwardRef, LegacyRef, ReactNode, useCallback} from "react";
import {Portal} from "shared/ui/Portal/Portal";
import cls from "./Modal.module.css";
import {classNames, Mods} from "shared/lib/classNames/classNames";

interface ModalProps {
    children?:ReactNode;
    className?: string;
    onClose?: ()=>void;
    isOpen?: boolean;
}
export const Modal = forwardRef( (props: ModalProps, ref:LegacyRef<HTMLDivElement>) => {
    const {
        children,
        className,
        onClose,
        isOpen,
    } = props;
    const closeHandler = useCallback(
        () => {
            if(onClose){
                onClose();
            }
        }, [onClose]
    );
    const mods: Mods = {
        [cls.open]: isOpen
    };
    return (
        <Portal >
            <div className={classNames(cls.modal, mods)}>
                <div className={cls.overlay} onClick={closeHandler}></div>
                <div className={classNames(cls.content, {}, [className])} ref={ref}>
                    {children}
                </div>
            </div>
        </Portal>
    );
});

Modal.displayName = "Modal";