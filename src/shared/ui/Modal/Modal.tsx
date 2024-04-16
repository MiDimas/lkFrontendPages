import {ReactNode} from "react";
import {Portal} from "shared/ui/Portal/Portal";
import cls from "./Modal.module.css";
import {classNames} from "shared/lib/classNames/classNames";

interface ModalProps {
    children?:ReactNode;
    className?: string
}
export function Modal (props: ModalProps) {
    const {
        children,
        className
    } = props;
    return (
        <Portal >
            <div className={cls.back}>
                <div className={classNames(cls.content, {}, [className])}>
                    {children}
                </div>
            </div>
        </Portal>
    );
}