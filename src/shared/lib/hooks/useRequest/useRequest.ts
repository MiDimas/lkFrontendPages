import {useCallback} from "react";


interface UseRequestHandlerProps<
    P extends object,
    D extends object,
    I extends ResponsesInfoStructure,
> {
    setData?: (data: D) => void;
    setInfo?: (info: I) => void;
    setError?: (error: string) => void;
    setIsLoading?: (isLoading: boolean) => void;
    request?: (param: P) => Promise<ResponsesStructure<D,I>>
}

export function useRequest<
    P extends object,
    D extends object,
    I extends ResponsesInfoStructure,
>(
    props: UseRequestHandlerProps<P, D, I>) {
    const {
        request,
        setData,
        setInfo,
        setError,
        setIsLoading
    } = props;
    console.log("init");
    const myTicketsHandler = useCallback(async(params: P)=>  {
        setIsLoading?.(true);
        const data = await request?.(params);
        setIsLoading?.(false);
        if(!data) return;
        if(data.result && data.data){
            setData?.(data.data);
        }
        else if (data.result === 0) {
            setError?.(data.desc);
        }
        if(data.info){
            setInfo?.(data.info);
        }
    }, [request, setData, setInfo, setError, setIsLoading]);
    return myTicketsHandler;
}