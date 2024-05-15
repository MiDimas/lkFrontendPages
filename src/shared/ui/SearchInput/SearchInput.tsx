import {Combobox} from "@headlessui/react";
import {ChangeEvent, ReactNode, useCallback} from "react";

export interface SearchValueOption {
    node: ReactNode;
    id: string;
    value: string;
}
interface SearchInputProps<E extends object|string>{
    className?:string;
    onChange?: (value:string)=>void;
    query?: string;
    selected?: E;
    displaySelected?: (value:E)=>string;
    onSelect?: (value:string) => void;
    listOptions?: SearchValueOption[];
}
export const SearchInput = <E extends object|string>(props: SearchInputProps<E>) => {
    const {
        className,
        onChange,
        onSelect,
        query = "",
        selected= "",
        displaySelected,
        listOptions = []
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
        <Combobox value={selected} onChange={selectHandler}>
            <Combobox.Input onChange={changeHandler} displayValue={displaySelected} />
            <Combobox.Options>
                {listOptions.length>0 && listOptions.map((option:SearchValueOption) => (
                    <Combobox.Option key={option.id} value={option.value} >
                        {option.node}
                    </Combobox.Option>
                ))}
            </Combobox.Options>
        </Combobox>
    );
};