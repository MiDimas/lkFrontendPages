import {useCallback, useState} from "react";

export function useModalState (initialState: boolean = false) {
    const [state, setState] = useState(initialState);

    const onClose = useCallback(() => {
        setState(false);
    }, [setState]);

    const onOpen = useCallback(() => {
        setState(true);
    }, [setState]);

    const onToggle = useCallback(() => {
        setState((prev) => !prev);
    }, [setState]);

    return {state, onClose, onOpen, onToggle};
}