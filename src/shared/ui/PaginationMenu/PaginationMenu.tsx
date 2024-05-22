import {useCallback, useMemo} from "react";
import cls from "./PaginationMenu.module.css";
import {classNames} from "shared/lib/classNames/classNames";
interface PaginationMenuProps {
    lastPage?: number;
    onChangePage?: (page?: number)=> void;
    selectedPage?: number;
}
export function PaginationMenu (props: PaginationMenuProps) {
    const {
        lastPage,
        onChangePage,
        selectedPage
    } = props;
    const renderButton = useCallback(
        (num: number, selected:boolean=false) => (
            <button
                key={`pagi${num}`}
                className={classNames(cls.button, {[cls.active]: selected}, [])}
                onClick={() => {
                    onChangePage?.(num);
                }}>{num}</button>),
        [onChangePage]
    );

    const listBtns = useMemo(
        () => {
            const res = [];
            if(!lastPage || !selectedPage){
                return null;
            }
            const initStart = selectedPage - 2>1 ? selectedPage-2: 1;
            const maxValue = lastPage>5 ? 4 :lastPage-1;
            const startVal = initStart +4 >lastPage ? lastPage-maxValue : initStart ;

            if(startVal >2) {
                res.push(renderButton(1));
                res.push(<span key={"pagiSplitter1"} className={cls.unselect}>...</span>);
            }
            else if(startVal === 2) {
                res.push(renderButton(1));
            }
            let i;
            for (i=startVal; i<=startVal+maxValue; i++){
                res.push(renderButton(i, selectedPage===i));
            }
            i--;
            if(i < lastPage-1) {
                res.push(<span key={"pagiSplitter2"} className={cls.unselect}>...</span>);
                res.push(renderButton(lastPage));
            }
            else if (lastPage - 1 === i) {
                res.push(renderButton(lastPage));
            }
            return res;
        }, [lastPage, renderButton, selectedPage]
    );

    if(!lastPage || !selectedPage) {
        return null;
    }
    return (
        <div>
            {listBtns}
        </div>
    );
}