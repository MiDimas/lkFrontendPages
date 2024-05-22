import {ReactNode} from "react";
import {PopUpMessageProvider} from "app/providers/PopUpMessageProvider/PopUpMessageProvider";

export const App = ({children}: {children:ReactNode})  => {
    return (
        <>
            <PopUpMessageProvider initialValue={2000} >
                {children}
            </PopUpMessageProvider>
        </>
    );
};