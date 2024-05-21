import {classNames} from "shared/lib/classNames/classNames";
import cls from "./Reflection.module.css";

interface ReflectionProps {
    className?: string;
    speed?: number;
}
export const Reflection = (props: ReflectionProps) => {
    const {
        className,
        speed
    } = props;
    return <div className={classNames(cls.reflection, {}, [className] )}
        style={speed ? {animationDuration: `${speed}s`} : undefined}
    />;
};