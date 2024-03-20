import {ChangeEventHandler, DetailedHTMLProps, InputHTMLAttributes, useCallback} from "react";
import cls from "./Input.module.css";
interface InputProps extends Omit<DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "onChange"
>{
    readonly?:boolean;
    value?: string;
    onChange?: (value: string) => void;
}
export const Input = (props: InputProps) => {
    const {
        readonly,
        value,
        onChange,
        ...otherProps
    } = props;
    const changeHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
        (event) => {
            if(onChange) {
                onChange(event.target.value);
            }
        }, [onChange]);
    return <input
        className={cls.input}
        readOnly={readonly}
        onChange={changeHandler}
        value={value}
        {...otherProps}
    />;
};