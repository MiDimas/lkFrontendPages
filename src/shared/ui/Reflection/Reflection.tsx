import {classNames} from "shared/lib/classNames/classNames";
import cls from "./Reflection.module.css";
import {CSSProperties} from "react";

interface ReflectionProps {
    className?: string;
    speed?: number;
    radius?: string|number;
}
export const Reflection = (props: ReflectionProps) => {
    const {
        className,
        speed,
        radius
    } = props;
    const initialStyles:CSSProperties = {
        borderRadius: radius,
        animationDuration: speed ? `${speed}s` : undefined
    };
    return <div className={classNames(cls.reflection, {}, [className] )}
        style={initialStyles}
    />;
};