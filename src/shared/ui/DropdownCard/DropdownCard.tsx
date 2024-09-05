import {Disclosure} from "@headlessui/react";
import {ReactNode, useCallback} from "react";
import {Card} from "shared/ui/Card/Card";

interface DropdownCardProps{
    button?: "card" | "underContent" | "none"
    children?: ReactNode;
    hideContent?: ReactNode;
    defaultOpen?: boolean;
}
export const DropdownCard = (props: DropdownCardProps) => {
    const {
        children,
        button = "underContent",
        hideContent,
        defaultOpen,
    } = props;

    const renderPanel = useCallback((hideContent: ReactNode)=> {
        if(hideContent){
            return (<Disclosure.Panel>{hideContent}</Disclosure.Panel>);
        }
    }, []);
    if (button === "underContent") {
        return (
            <Disclosure>
                <Card>
                    {children}
                    {hideContent ?
                        <Disclosure.Button>more</Disclosure.Button>
                        : null
                    }
                </Card>
                {renderPanel(hideContent)}
            </Disclosure>
        );
    }
    else if (button === "card") {
        return (
            <Disclosure>
                <Disclosure.Button as={"div"}>
                    <Card>{children}</Card>
                </Disclosure.Button>
                {renderPanel(hideContent)}
            </Disclosure>
        );
    }
    else {
        return (
            <Disclosure>
                <Card>{children}</Card>
                {renderPanel(hideContent)}
            </Disclosure>
        );
    }
};