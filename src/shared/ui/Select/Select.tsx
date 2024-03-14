import {ChangeEventHandler, DetailedHTMLProps, SelectHTMLAttributes, useCallback, useMemo} from "react";
import cls from "./Select.module.css";
import {classNames, Mods} from "shared/lib/classNames/classNames";
export interface SelectOption<T extends string> {
    value: T;
    content: string;
}
interface SelectProps<T extends string> extends Omit<DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>, "onChange">{
    value?: T;
    options?: SelectOption<T>[];
    label?: string;
    className?: string;
    readonly?: boolean;
    onChange?: (value: T) => void;

}
export const Select = <T extends string>(props: SelectProps<T>) => {
    const {
        value,
        options,
        label,
        className,
        readonly,
        onChange
    } = props;

    const changeHandler: ChangeEventHandler<HTMLSelectElement> = useCallback(
        (e) => {
            onChange?.(e.target.value as T);
        },
        [onChange],
    );

    const optionsList = useMemo(() => options?.map(
        ({value, content}) =>  (
            <option
                key={value}
                value={value}
                className={cls.option}
            >
                {content}
            </option>
        )
    ), [options] );

    const mods:Mods = {
        [cls.readonly]: readonly
    };

    if(label) {
        return (
            <label className={classNames(cls.mainBlock, mods, [className])}>
                <span className={cls.label}>{label}</span>
                <select value={value} className={cls.select} onChange={changeHandler}>
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
        >
            {optionsList}
        </select>
    );
};