import {Select, SelectOption} from "shared/ui/Select/Select";
import {CountrySchema} from "../../model/types/CountrySchema";
import {useCallback, useMemo} from "react";

interface CountryOptions extends CountrySchema{
    disabled?: boolean;
}
interface CountrySelectProps {
    value?:number;
    options?: CountryOptions[];
    className?: string;
    onChange?: (value:number)=> void;
}
export const CountrySelect = (props: CountrySelectProps) => {
    const {
        value,
        options,
        className,
        onChange,
    } = props;
    const changeCountryHandler = useCallback(
        (value: string|number = "") => {
            if(value) {
                value = Number(value);
                onChange?.(value);
            }

        }, [onChange]
    );
    const countryOptions = useMemo<SelectOption<number>[]|undefined>(() => {
        const list:SelectOption<number>[] = [{value: 0, content: "Не указана", disabled:true}];
        options?.map(({id, name, ...other}) => {
            list.push({
                value:id,
                content:name,
                ...other
            });
        });
        return list;
    }, [options]);

    return <Select
        value={value}
        onChange={changeCountryHandler}
        options={countryOptions}
        className={className}
    />;
};