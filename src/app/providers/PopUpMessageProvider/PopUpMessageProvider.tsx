import {PopUpMessageContext} from "shared/lib/context/PopUpMessageContext";
import {ReactNode} from "react";
import {usePopUpMsg} from "shared/lib/hooks/usePopUpMsg/usePopUpMsg";

interface PopUpMessageProviderProps {
    initialValue: number;
    children: ReactNode;
}
export const PopUpMessageProvider = (props: PopUpMessageProviderProps) =>  {
    const {
        children,
        initialValue = 2000
    } = props;
    const {Component, setMessage} = usePopUpMsg(initialValue);
    return <PopUpMessageContext.Provider value={{setMessage}}>
        {children}
        <Component/>
    </PopUpMessageContext.Provider>;
};