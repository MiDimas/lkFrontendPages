import {classNames} from "shared/lib/classNames/classNames";
import cls from "./Reflection.module.css";
import {CSSProperties} from "react";

interface ReflectionProps {
    className?: string;
    speed?: number;
    radius?: string|number;
    color?: CSSProperties["backgroundColor"];
}
export const Reflection = (props: ReflectionProps) => {
    const {
        className,
        speed,
        radius,
        color= "#fff"
    } = props;
    const initialStyles:CSSProperties = {
        borderRadius: radius,
        animationDuration: speed ? `${speed}s` : undefined,

    };
    const beforeStyles: CSSProperties = {
        background: `linear-gradient(to right, transparent 0%, ${color} 50%, transparent 100%)`
    };
    return <div className={classNames(cls.reflection, {}, [className] ) }
        style={initialStyles}
    >
        <div className={cls.before} style={beforeStyles}/>
    </div>;
};