import {useCallback, useRef} from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface DebounceParams<A extends any[]> {
    callback: (...args: A) => void
    delay?: number;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebounce<A extends any[]>(params:DebounceParams<A>) {
    const {
        callback,
        delay = 300
    } = params;
    const timerRef = useRef<NodeJS.Timeout>();

    return useCallback( (...args:A) => {
        if(timerRef.current){
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(()=>{callback(...args);}, delay);
    }, [callback, delay]);

}