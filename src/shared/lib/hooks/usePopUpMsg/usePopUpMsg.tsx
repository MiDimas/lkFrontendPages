import {useState, useEffect, useRef, useCallback} from "react";
import {PopUpMessage, Severity} from "shared/ui/PopUpMessage/PopUpMessage";

export interface MessageStructure {
    text: string;
    severity?: Severity;
}
export function usePopUpMsg (time: number) {
    const [message, setMessage] = useState<MessageStructure>({
        text: "",
        severity: "success"
    });
    const timer = useRef<NodeJS.Timeout>();
    const [visible, setVisible] = useState(false);

    const Component = useCallback(
        () => (<>
            {visible
                ? <PopUpMessage text={message.text} severity={message.severity}/>
                : null
            }
        </>), [visible, message.text, message.severity]
    );
    useEffect(() => {
        if(timer.current) {
            clearTimeout(timer.current);
        }
        if(message.text){
            setVisible(true);
            timer.current = setTimeout(()=> {
                setVisible(false);
                setMessage(prevState => ({
                    ...prevState,
                    text: ""
                }));
            }, time);
        }

    }, [message.text, setVisible, time]);

    return {Component, setMessage};

}