import {Disclosure, Transition} from "@headlessui/react";
import {ReactNode, useCallback} from "react";
import {Card} from "shared/ui/Card/Card";
import cls from "./DropdownCard.module.css";
import {classNames} from "shared/lib/classNames/classNames";

type DropdownCardButtonPosition = "start" | "center" | "end" | "full";

const mapGrid: Record<DropdownCardButtonPosition, string> = {
    "start": cls.area_end,
    "center": cls.area_up,
    "end": cls.area_start,
    "full": cls.area_up
};

interface DropdownCardProps{
    button?: "card" | "underContent" | "none"
    children?: ReactNode;
    hideContent?: ReactNode;
    defaultOpen?: boolean;
    buttonPosition?: DropdownCardButtonPosition
    className?:string;
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
        className
    } = props;
    const renderPanel = useCallback((hideContent: ReactNode)=> {
        if(hideContent){
            return (
                <Transition
                    enter="transition duration-100 ease-out"
                    leave="transition duration-100 ease-out"
                    enterFrom="transform scale-95"
                    enterTo="transform scale-100"
                    leaveFrom="transform scale-100"
                    leaveTo="transform scale-95"
                >
                    <Disclosure.Panel>{hideContent}</Disclosure.Panel>
                </Transition>
            );
        }
    }, []);
    if (button === "underContent") {
        return (
            <Disclosure defaultOpen={defaultOpen}>
                <Card className={classNames(cls.dd_card, {}, [mapGrid[buttonPosition],className])}>
                    <div className={cls.content}>
                        {children}
                    </div>
                    {buttonBlock && (
                        <div className={cls.blockBtn}>{buttonBlock}</div>
                    )}
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