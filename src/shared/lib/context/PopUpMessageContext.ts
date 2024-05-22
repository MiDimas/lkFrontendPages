import {createContext} from "react";
import {MessageStructure} from "../hooks/usePopUpMsg/usePopUpMsg";

export interface PopUpMessageContextProps {
    setMessage?: (props: MessageStructure) => void;
}
export const PopUpMessageContext  = createContext<PopUpMessageContextProps>({});