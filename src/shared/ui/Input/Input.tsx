import {
    ChangeEventHandler,
    DetailedHTMLProps,
    forwardRef,
    InputHTMLAttributes,
    memo,
    useCallback,
} from "react";
import cls from "./Input.module.css";
import {classNames} from "shared/lib/classNames/classNames";
interface InputProps extends Omit<DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "onChange"
>{
    readonly?:boolean;
    value?: string | number;
    onChange?: (
        value: string,
        target?: EventTarget & HTMLInputElement
    ) => void;
    label?: string;
}
export const Input = memo(forwardRef<HTMLInputElement, InputProps>(
    (props, ref) => {
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
                    onChange(event.target.value, event.target);
                }
            }, [onChange]);
        if(label){
            return (
                <label>
                    <span className={cls.label}>{label}</span>
                    <input
                        className={classNames(cls.input, {}, [className])}
                        readOnly={readonly}
                        ref={ref}
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
                ref={ref}
                {...otherProps}
            />
        );
    }));

Input.displayName="Input";