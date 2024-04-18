import {useCallback, useState} from "react";

export function useModalState (initialState: boolean = false) {
    const [isOpen, setIsOpen] = useState(initialState);

    const onClose = useCallback(() => {
        setIsOpen(false);
    }, [setIsOpen]);

    const onOpen = useCallback(() => {
        setIsOpen(true);
    }, [setIsOpen]);

    const onToggle = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, [setIsOpen]);

    return {isOpen, onClose, onOpen, onToggle};
}