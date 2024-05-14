import {useCallback, useState} from "react";
import {SearchInput} from "shared/ui/SearchInput/SearchInput";
import {useDebounce} from "shared/lib/hooks/useDebounce/useDebounce";
import {getUser} from "../../api/getUser";
import {UserSchema} from "../../model/types/UserSchema";

interface SearchUserProps {
    className?: string;
}
export const SearchUser = (props: SearchUserProps) => {
    const {
        className
    } = props;
    const [query, setQuery] = useState("");
    const [data, setData] = useState<ResponsesStructure<UserSchema[]>>();
    const searchDeb = useDebounce<[search:string]>((search:string) => {
        getUser(search).then(data => setData(data));
    }, {delay:1000});

    const searchQuery = useCallback((search:string)=> {
        setQuery(search);
        searchDeb(search);
    }, [searchDeb]);

    console.log(data);
    return (
        <SearchInput onChange={searchQuery} query={query}/>
    );
};