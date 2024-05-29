import {classNames} from "shared/lib/classNames/classNames";
import {Dispatch, SetStateAction, useCallback} from "react";
import {Select, SelectOption} from "shared/ui/Select/Select";
import {MONTHS_NAMES} from "shared/lib/consts/moths";
import {DateSchema} from "../../model/types/DateSchema";

interface DateSelectorProps {
    className?: string;
    values?: DateSchema;
    onChange?: Dispatch<SetStateAction<DateSchema>>;
}

const startYear = 2023;
const endYear = new Date().getFullYear();
const endMonth = new Date().getMonth()+1;
const years:SelectOption<number>[] = [...Array(endYear-startYear+1)].map((_,i)=> ({
    value: i+startYear,
    content: `${i+startYear}`
}));
const months:SelectOption<number>[] = [...Array(12)].map((_, i)=> ({
    value: i+1,
    content: MONTHS_NAMES[i]
}));
export const DateSelector = (props: DateSelectorProps) => {
    const {
        className,
        values,
        onChange } = props;
    if(values){
        onChange?.({month:endMonth, year:endYear});
    }
    const setYear = useCallback(
        (value:number) => {
            onChange?.((prev)=> ({...prev, year: value}));
        },
        [onChange],
    );
    const setMonth = useCallback(
        (value:number) => {
            onChange?.((prev)=> ({...prev, month: value}));
        },
        [onChange],
    );

    if(values) {

        return(
            <div className={classNames("", {}, [className])}>
                <Select options={years} value={values.year} onChange={(value)=> setYear(Number(value))}/>
                <Select options={months} value={values.month} onChange={(value) => setMonth(Number(value))}/>
            </div>
        );
    }
    return (
        <div className={classNames("", {}, [className])}>
            <Select options={years} />
            <Select options={months} />
        </div>
    );
};