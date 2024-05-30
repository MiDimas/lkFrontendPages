import {Switch} from "@headlessui/react";
import {classNames} from "shared/lib/classNames/classNames";
import cls from "./Toggle.module.css";
import {Select} from "shared/ui/Select/Select";

interface ToggleProps {
    className?: string;
    value?: boolean;
    onChange?: (value:boolean)=>void;
}
type Petux = "petux" | "nepetux";
export const Toggle =(props: ToggleProps) => {
    const {
        className,
        value,
        onChange
    } = props;

    return (
        <Switch
            checked={value}
            onChange={onChange}
            className={classNames(cls.toggle, {[cls.on]: value}, [className])}
        >
        </Switch>
    );
};