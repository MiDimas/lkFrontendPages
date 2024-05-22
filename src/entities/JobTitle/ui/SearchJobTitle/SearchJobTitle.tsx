import {JobTitleSchema} from "../../model/types/JobTitleSchema";
import {useCallback, useMemo, useState} from "react";
import {useDebounce} from "shared/lib/hooks/useDebounce/useDebounce";
import {getJobTitle} from "../../api/getJobTitle";
import {SearchInput, SearchValueOption} from "shared/ui/SearchInput/SearchInput";
import {classNames} from "shared/lib/classNames/classNames";
import cls from "./SearchJobTitle.module.css";

interface SearchJobTitleProps {
    className?: string;
    classNameInput?: string;
    select?: JobTitleSchema;
    setSelect?:(value?:JobTitleSchema)=>void;
    label?: string;
}


export const SearchJobTitle = (props: SearchJobTitleProps) => {
    const {
        className,
        classNameInput,
        select,
        setSelect,
        label
    } = props;
    const [data, setData] = useState<ResponsesStructure<JobTitleSchema[]>>();
    const searchDeb = useDebounce<[name:string]>((name:string) => {
        getJobTitle(name).then(data => setData(data));
    }, {delay:400});

    const searchQuery = useCallback((name:string)=> {
        searchDeb(name);
    }, [searchDeb]);

    const selectHandler = useCallback((value:string) => {
        if(data?.data && setSelect){
            setSelect(data.data.find((elem) => elem.code === value));
        }
    },
    [data, setSelect]);


    const results = useMemo<SearchValueOption[]>(() => {
        if(data?.data){
            return data?.data?.map((job) => ({
                node: <div>
                    <span>{job.name}</span>
                </div>,
                value: job.code,
                id: job.code
            }));
        }
        else {
            return [];
        }
    }, [data]);

    const inputElement = <SearchInput<JobTitleSchema>
        onChange={searchQuery}
        listOptions={results}
        displaySelected={(value:JobTitleSchema)=>value && `${value.name}`}
        selected={select}
        onSelect={selectHandler}
        notFound={"Должностей не найдено, попробуйте другое название"}
        className={classNames(cls.input, {}, [classNameInput])}
    />;
    return (
        <div className={classNames(cls.searchUser, {}, [className])}>
            {label ?

                (
                    <label className={cls.label}>
                        <span>{label}:</span>
                        {inputElement}
                    </label>
                )
                : inputElement
            }
        </div>

    );
};