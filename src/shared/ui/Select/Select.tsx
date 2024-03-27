import {ChangeEventHandler, DetailedHTMLProps, SelectHTMLAttributes, useCallback, useMemo} from "react";
import cls from "./Select.module.css";
import {classNames, Mods} from "shared/lib/classNames/classNames";
export interface SelectOption<T extends string|number> {
    value: T;
    content: string;
    disabled?: boolean;
}
interface SelectProps<T extends string|number> extends Omit<DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>, "onChange">{
    value?: T;
    options?: SelectOption<T>[];
    label?: string;
    className?: string;
    readonly?: boolean;
    onChange?: (value: T) => void;
    defaultValue?:string;

}
export const Select = <T extends string|number>(props: SelectProps<T>) => {
    const {
        value,
        options,
        label,
        className,
        readonly,
        onChange,
        defaultValue,
        ...otherValue
    } = props;

    const changeHandler: ChangeEventHandler<HTMLSelectElement> = useCallback(
        (e) => {
            onChange?.(e.target.value as T);
        },
        [onChange],
    );

    const optionsList = useMemo(() => {
        const list = [];
        if(defaultValue) {
            list.push(
                <option
                    key={defaultValue}
                    value={0 as T}
                    disabled
                >{defaultValue}</option>);
        }
        options?.map(
            ({value, content, disabled}) => {
                list.push(<option
                    key={value}
                    value={value}
                    className={cls.option}
                    disabled={disabled}
                >
                    {content}
                </option>);
            }
        );
        return list;
    }, [options, defaultValue] );

    const mods:Mods = {
        [cls.readonly]: readonly
    };

    if(label) {
        return (
            <label className={classNames(cls.mainBlock, mods, [className])}>
                <span className={cls.label}>{label}</span>
                <select value={value} className={cls.select} onChange={changeHandler} {...otherValue}>
                    {optionsList}
                </select>
            </label>
        );
    }
    return (
        <select
            className={classNames(cls.mainBlock, {}, [className, cls.select])}
            onChange={changeHandler}
            value={value}
            {...otherValue}
        >
            {optionsList}
        </select>
    );
};