import {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import cls from "./Button.module.css";
import {classNames} from "shared/lib/classNames/classNames";

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {

}

export const Button = (props: ButtonProps) => {
    const {children, className, ...rest} = props;
    return <button className={classNames(cls.button, {}, [className])} {...rest}>{children}</button>;
};