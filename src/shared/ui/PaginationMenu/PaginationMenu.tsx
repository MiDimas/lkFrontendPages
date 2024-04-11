import {useCallback, useMemo} from "react";

interface PaginationMenu {
    lastPage?: number;
    onChangePage?: (page?: number)=> void;
    selectedPage?: number;
}
export function PaginationMenu (props: PaginationMenu) {
    const {
        lastPage,
        onChangePage,
        selectedPage
    } = props;
    const renderButton = useCallback(
        (num: number) => (<button key={`pagi${num}`} onClick={() => {
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
            const startVal = initStart +4 >lastPage ? lastPage-4 : initStart ;
            console.log({initStart, startVal});

            if(startVal >2) {
                res.push(renderButton(1));
                res.push(<span key={"pagiSplitter1"}>...</span>);
            }
            else if(startVal === 2) {
                res.push(renderButton(1));
            }
            let i;
            for (i=startVal; i<=startVal+4; i++){
                res.push(renderButton(i));
            }
            i--;
            if(i < lastPage-1) {
                res.push(<span key={"pagiSplitter2"}>...</span>);
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