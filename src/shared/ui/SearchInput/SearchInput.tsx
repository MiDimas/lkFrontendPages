import {Combobox} from "@headlessui/react";
import {ChangeEvent, ReactNode, useCallback} from "react";

interface SearchValueOption {
    node: ReactNode;
    id: string;
    value: string;
}
interface SearchInputProps {
    className?:string;
    onChange?: (value:string)=>void;
    query?: string;
    value?: string;
    onSelect?: (value:string) => void;
    listOptions?: SearchValueOption[];
}
export const SearchInput = (props: SearchInputProps) => {
    const {
        className,
        onChange,
        onSelect,
        query = "",
        value= "",
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
        <Combobox value={value} onChange={selectHandler}>
            <Combobox.Input onChange={changeHandler} value={query}/>
            <Combobox.Options>
                {listOptions.length>0 && listOptions.map((option:SearchValueOption) => (
                    <Combobox.Option key={option.id} value={option.value}>
                        {option.node}
                    </Combobox.Option>
                ))}
            </Combobox.Options>
        </Combobox>
    );
};