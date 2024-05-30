import {classNames} from "shared/lib/classNames/classNames";
import {Dispatch, memo, SetStateAction, useCallback} from "react";
import {Select, SelectOption} from "shared/ui/Select/Select";
import {MONTHS_NAMES} from "shared/lib/consts/moths";
import {DateSchema} from "../../model/types/DateSchema";
import {useInitialEffect} from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import cls from "./DataSelector.module.css";
interface DateSelectorProps {
    className?: string;
    values?: DateSchema;
    onChange?: Dispatch<SetStateAction<DateSchema|undefined>>;
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
export const DateSelector = memo((props: DateSelectorProps) => {
    const {
        className,
        values,
        onChange } = props;
    useInitialEffect(
        () => {
            if(!values){
                onChange?.({month:endMonth, year:endYear});
            }
        }
    );

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
            <div className={classNames(cls.date, {}, [className])}>
                <Select options={years} value={values.year} className={cls.select}
                    onChange={(value)=> setYear(Number(value))}/>
                <Select options={months} value={values.month} className={cls.select}
                    onChange={(value) => setMonth(Number(value))}/>
            </div>
        );
    }
    return (
        <div className={classNames(cls.date, {}, [className])}>
            <Select className={cls.select} options={years} />
            <Select className={cls.select} options={months} />
        </div>
    );
});

DateSelector.displayName = "DataSelector";