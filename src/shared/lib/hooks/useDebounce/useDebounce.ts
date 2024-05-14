import {useCallback, useRef} from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface DebounceConfig{
    delay?: number;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebounce<A extends any[]>(callback: (...args: A) => void, config:DebounceConfig ={}) {
    const {
        delay = 300
    } = config;
    const timerRef = useRef<NodeJS.Timeout>();

    return useCallback( (...args:A) => {
        if(timerRef.current){
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(()=>{callback(...args);}, delay);
    }, [callback, delay]);

}