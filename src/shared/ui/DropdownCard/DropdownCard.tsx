import {Disclosure, Transition} from "@headlessui/react";
import {ReactNode, useCallback} from "react";
import {Card} from "shared/ui/Card/Card";
import cls from "./DropdownCard.module.css";
import {classNames} from "shared/lib/classNames/classNames";

type DropdownCardButtonPosition = "start" | "center" | "end" | "full";


interface DropdownCardProps{
    button?: "card" | "underContent" | "none"
    children?: ReactNode;
    hideContent?: ReactNode;
    defaultOpen?: boolean;
    buttonPosition?: DropdownCardButtonPosition
    className?:string;
    classNameButtonBlock?:string;
    buttonBlock?: ReactNode;
}
export const DropdownCard = (props: DropdownCardProps) => {
    const {
        children,
        button = "underContent",
        hideContent,
        defaultOpen,
        buttonPosition= "full",
        buttonBlock,
        className,
        classNameButtonBlock
    } = props;
    const renderPanel = useCallback((hideContent: ReactNode)=> {
        if(hideContent){
            return (
                <Transition className={cls.hideContent}
                    enter={cls.enter}
                    leave={cls.leave}
                    enterFrom={cls.enterFrom}
                    enterTo={cls.enterTo}
                    leaveFrom={cls.leaveFrom}
                    leaveTo={cls.leaveTo}
                >
                    <Disclosure.Panel>{hideContent}</Disclosure.Panel>
                </Transition>
            );
        }
    }, []);
    if (button === "underContent") {
        return (
            <Disclosure defaultOpen={defaultOpen}>
                <Card className={classNames(cls.dd_card, {}, [className])}>
                    <div className={cls.content}>
                        {children}
                    </div>
                    <div className={classNames(cls.blockBtn, {},  [classNameButtonBlock])}>
                        {buttonBlock}
                        {hideContent ?
                            <Disclosure.Button className={
                                classNames(cls.button, {}, [cls[buttonPosition]])}>
                                Подробнее
                            </Disclosure.Button>
                            : null
                        }
                    </div>


                    {renderPanel(hideContent)}
                </Card>
            </Disclosure>
        );
    }
    else if (button === "card") {
        return (
            <Disclosure>
                <Card className={classNames(cls.dd_card, {}, [className])}>
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
                <Card className={classNames(cls.dd_card, {}, [className])}>
                    <div className={cls.content}>{children}</div>
                    {renderPanel(hideContent)}
                </Card>
            </Disclosure>
        );
    }
};