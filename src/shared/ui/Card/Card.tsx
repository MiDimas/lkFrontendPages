import {ReactNode} from "react";
import {classNames} from "shared/lib/classNames/classNames";
import cls from "./Card.module.css";

interface CardProps {
    children: ReactNode;
    className?: string;
}
export const Card = (props: CardProps) => {
    const {children,  className} = props;

    return (
        <div className={classNames(cls.Card, {}, [className])}>
            {children}
        </div>
    );
};