import {useCallback, useMemo, useState} from "react";
import {SearchInput, SearchValueOption} from "shared/ui/SearchInput/SearchInput";
import {useDebounce} from "shared/lib/hooks/useDebounce/useDebounce";
import {getUser} from "../../api/getUser";
import {UserSchema} from "../../model/types/UserSchema";

interface SearchUserProps {
    className?: string;
    select?: UserSchema;
    setSelect?:(value?:UserSchema)=>void;
}
export const SearchUser = (props: SearchUserProps) => {
    const {
        className,
        select,
        setSelect
    } = props;
    const [query, setQuery] = useState("");
    const [data, setData] = useState<ResponsesStructure<UserSchema[]>>();
    const searchDeb = useDebounce<[search:string]>((search:string) => {
        getUser(search).then(data => setData(data));
    }, {delay:400});

    const searchQuery = useCallback((search:string)=> {
        setQuery(search);
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
                node: <div><span>{user.name}</span> <p>{user.jobTitle}</p></div>,
                value: user.code,
                id: user.code
            }));
        }
        else {
            return [];
        }
    }, [data]);

    console.log(data);
    console.log(select);
    return (
        <div>
            <label>
                Выберете сотрудника
                <SearchInput<UserSchema>
                    onChange={searchQuery}
                    query={query}
                    listOptions={results}
                    displaySelected={(value:UserSchema)=>value.name}
                    selected={select}
                    onSelect={selectHandler}
                />
            </label>
        </div>

    );
};