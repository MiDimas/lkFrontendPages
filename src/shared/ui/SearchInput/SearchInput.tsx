import {Combobox} from "@headlessui/react";
import {ChangeEvent, Fragment, ReactNode, useCallback} from "react";
import cls from "./SearchInput.module.css";
import {classNames} from "shared/lib/classNames/classNames";

export interface SearchValueOption {
    node: ReactNode;
    id: string;
    value: string;
}
interface SearchInputProps<E extends object|string>{
    className?:string;
    onChange?: (value:string)=>void;
    selected?: E;
    displaySelected?: (value:E)=>string;
    onSelect?: (value:string) => void;
    listOptions?: SearchValueOption[];
    notFound?: string;
}
export const SearchInput = <E extends object|string>(props: SearchInputProps<E>) => {
    const {
        className,
        onChange,
        onSelect,
        selected= "",
        displaySelected,
        listOptions = [],
        notFound = "Ничего не найдено введите имя или код 1с сотрудника",
    } = props;
    const changeHandler = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            onChange?.(event.target.value);
        },
        [onChange],
    );
    const selectHandler = useCallback((value:string) => {
        onSelect?.(value);
    }, [onSelect]);

    return (
        <div className={cls.search}>
            <Combobox value={selected} onChange={selectHandler}>
                <Combobox.Input
                    onChange={changeHandler}
                    displayValue={displaySelected}
                    className={classNames(cls.input, {}, [className])}
                />
                <Combobox.Options className={cls.options}>
                    {listOptions.length>0 ? listOptions.map((option:SearchValueOption) => (
                        <Combobox.Option key={option.id} value={option.value} as={Fragment} >
                            {
                                ({active, selected}) => (
                                    <div className={classNames(cls.option, {
                                        [cls.activeOption]: active,
                                        [cls.selectedOption]: selected
                                    })}>
                                        {option.node}
                                    </div>
                                )
                            }
                        </Combobox.Option>
                    ))
                        : <div className={cls.option}>{notFound}</div>
                    }

                </Combobox.Options>
            </Combobox>
        </div>

    );
};