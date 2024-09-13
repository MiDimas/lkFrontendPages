import {useCallback} from "react";


interface UseRequestHandlerProps<
    P extends object,
    D extends object|null,
    I extends ResponsesInfoStructure,
> {
    setData?: (data: D) => void;
    setInfo?: (info: I) => void;
    setError?: (error: string) => void;
    setIsLoading?: (isLoading: boolean) => void;
    onSuccess?: (params?: P) => void;
    onError?: (params?: P)=>void;
    request?: (param: P) => Promise<ResponsesStructure<D,I>>
}

export function useRequest<
    P extends object,
    D extends object|null,
    I extends ResponsesInfoStructure,
>(
    props: UseRequestHandlerProps<P, D, I>) {
    const {
        request,
        setData,
        setInfo,
        setError,
        setIsLoading,
        onError,
        onSuccess
    } = props;
    console.log("init");
    const myTicketsHandler = useCallback(async(params: P)=>  {
        setIsLoading?.(true);
        const data = await request?.(params);
        setIsLoading?.(false);
        if(!data) return;
        if(data.result){
            if(data.data){
                setData?.(data.data);
            }
            onSuccess?.(params);
        }
        else if (data.result === 0) {
            setError?.(data.desc);
            onError?.(params);
        }
        if(data.info){
            setInfo?.(data.info);
        }
    }, [request, setData, setInfo, setError, setIsLoading, onError, onSuccess]);
    return myTicketsHandler;
}