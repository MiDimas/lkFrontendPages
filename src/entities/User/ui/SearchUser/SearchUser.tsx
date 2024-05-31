import {useCallback, useMemo, useState} from "react";
import {SearchInput, SearchValueOption} from "shared/ui/SearchInput/SearchInput";
import {useDebounce} from "shared/lib/hooks/useDebounce/useDebounce";
import {getUser} from "../../api/getUser";
import {UserSchema} from "../../model/types/UserSchema";
import cls from "./SearchUser.module.css";
import {classNames} from "shared/lib/classNames/classNames";

interface SearchUserProps {
    className?: string;
    select?: UserSchema;
    setSelect?:(value?:UserSchema)=>void;
    label?: string;
}
export const SearchUser = (props: SearchUserProps) => {
    const {
        className,
        select,
        setSelect,
        label = "Выберите сотрудника"
    } = props;
    const [data, setData] = useState<ResponsesStructure<UserSchema[]>>();
    const searchDeb = useDebounce<[search:string]>((search:string) => {
        getUser(search).then(data => setData(data));
    }, {delay:400});

    const searchQuery = useCallback((search:string)=> {
        searchDeb(search);
    }, [searchDeb]);

    const selectHandler = useCallback((value:string) => {
        if(data?.data && setSelect){
            setSelect(data.data.find((elem) => elem.code === value));
        }
    },
    [data, setSelect]);


    const results = useMemo<SearchValueOption[]>(() => {
        if(data?.data){
            return data?.data?.map((user) => ({
                node: <div className={cls.user}>
                    <span className={cls.name}>{user.name}</span>
                    <span className={cls.code}>{user.code}</span>
                    <span className={cls.birth}>{user.birthday}</span>
                    <span className={cls.job}>{user.jobTitle}</span>
                </div>,
                value: user.code,
                id: user.code
            }));
        }
        else {
            return [];
        }
    }, [data]);

    return (
        <div className={classNames(cls.searchUser, {}, [className])}>
            <label className={cls.label}>
                <span>{label}:</span>
                <SearchInput<UserSchema>
                    onChange={searchQuery}
                    listOptions={results}
                    displaySelected={(value:UserSchema)=>value && `${value.name}`}
                    selected={select}
                    onSelect={selectHandler}
                />
            </label>
        </div>

    );
};