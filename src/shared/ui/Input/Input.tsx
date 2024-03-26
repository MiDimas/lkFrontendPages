import {ChangeEventHandler, DetailedHTMLProps, InputHTMLAttributes, useCallback} from "react";
import cls from "./Input.module.css";
import {classNames} from "shared/lib/classNames/classNames";
interface InputProps extends Omit<DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "onChange"
>{
    readonly?:boolean;
    value?: string | number;
    onChange?: (value: string) => void;
    label?: string;
}
export const Input = (props: InputProps) => {
    const {
        readonly,
        value,
        onChange,
        className,
        label,
        ...otherProps
    } = props;
    const changeHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
        (event) => {
            if(onChange) {
                onChange(event.target.value);
            }
        }, [onChange]);
    if(label){
        return (
            <label>
                <span>{label}</span>
                <input
                    className={classNames(cls.input, {}, [className])}
                    readOnly={readonly}
                    onChange={changeHandler}
                    value={value}
                    {...otherProps}
                />
            </label>
        );
    }
    return (
        <input
            className={classNames(cls.input, {}, [className])}
            readOnly={readonly}
            onChange={changeHandler}
            value={value}
            {...otherProps}
        />
    );
};