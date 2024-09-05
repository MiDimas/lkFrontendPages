import {Disclosure} from "@headlessui/react";
import {ReactNode, useCallback} from "react";
import {Card} from "shared/ui/Card/Card";
import cls from "./DropdownCard.module.css";
import {classNames} from "shared/lib/classNames/classNames";

type DropdownCardButtonPosition = "left" | "center" | "right" | "full";

interface DropdownCardProps{
    button?: "card" | "underContent" | "none"
    children?: ReactNode;
    hideContent?: ReactNode;
    defaultOpen?: boolean;
    buttonPosition?: DropdownCardButtonPosition
}
export const DropdownCard = (props: DropdownCardProps) => {
    const {
        children,
        button = "underContent",
        hideContent,
        defaultOpen,
        buttonPosition= "full",
    } = props;
    const positionCls = `button_${buttonPosition}`;
    console.log(buttonPosition);
    console.log([cls[buttonPosition]]);
    console.log(cls[positionCls]);
    const renderPanel = useCallback((hideContent: ReactNode)=> {
        if(hideContent){
            return (
                <div className={cls.hide_content}>
                    <Disclosure.Panel>{hideContent}</Disclosure.Panel>
                </div>
            );
        }
    }, []);
    if (button === "underContent") {
        return (
            <Disclosure defaultOpen={defaultOpen}>
                <Card className={classNames(cls.dd_card, {}, [cls[positionCls]])}>
                    <div className={cls.content}>
                        {children}
                    </div>
                    {hideContent ?
                        <Disclosure.Button className={
                            classNames(cls.button, {}, [cls[buttonPosition]])}>
                            more
                        </Disclosure.Button>
                        : null
                    }
                    {renderPanel(hideContent)}
                </Card>
            </Disclosure>
        );
    }
    else if (button === "card") {
        return (
            <Disclosure>
                <Card className={classNames(cls.dd_card, {}, [])}>
                    <Disclosure.Button as={"div"} className={cls.content}>
                        {children}
                    </Disclosure.Button>
                    {renderPanel(hideContent)}
                </Card>
            </Disclosure>
        );
    }
    else {
        return (
            <Disclosure>
                <Card>
                    <div className={cls.content}>{children}</div>
                    {renderPanel(hideContent)}
                </Card>
            </Disclosure>
        );
    }
};