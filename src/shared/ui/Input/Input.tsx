import {ChangeEventHandler, DetailedHTMLProps, InputHTMLAttributes, useCallback} from "react";
import cls from "./Input.module.css";
import {classNames} from "shared/lib/classNames/classNames";
interface InputProps extends Omit<DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "onChange"
>{
    readonly?:boolean;
    value?: string | number;
    onChange?: (value: string) => void;
}
export const Input = (props: InputProps) => {
    const {
        readonly,
        value,
        onChange,
        className,
        ...otherProps
    } = props;
    const changeHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
        (event) => {
            if(onChange) {
                onChange(event.target.value);
            }
        }, [onChange]);
    return <input
        className={classNames(cls.input, {}, [className])}
        readOnly={readonly}
        onChange={changeHandler}
        value={value}
        {...otherProps}
    />;
};