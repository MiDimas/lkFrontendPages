import {Menu} from "@headlessui/react";
import {ReactNode} from "react";
import {classNames} from "shared/lib/classNames/classNames";
import cls from "./Dropdown.module.css";
export interface DropdownItem {
    href?: string;
    name: string;
    callBack?: ()=> void;
}

type Directions = "bottom right" | "top right" | "bottom left" | "top left";

const mapDirectionClasses: Record<Directions, string> = {
    "bottom right": cls.optionBottomRight,
    "top right": cls.optionTopRight,
    "bottom left": cls.optionBottomLeft,
    "top left": cls.optionTopLeft,
};
interface DropdownProps {
    children?:ReactNode;
    className?: string;
    items?: DropdownItem[];
    direction?: Directions;
}
export const Dropdown = (props: DropdownProps) => {
    const {
        children,
        items,
        className,
        direction= "bottom left"
    } = props;



    return (
        <Menu as={"div"} className={cls.dropdown}>
            <Menu.Button className={classNames(cls.button, {}, [className])} >{children}</Menu.Button>
            <Menu.Items className={classNames(cls.itemsBlock, {}, [mapDirectionClasses[direction]])}>
                {items?.map(({name, href, callBack}) => {
                    return (<Menu.Item key={name}>
                        {({active, disabled}) => (
                            href ? <a className={classNames(cls.item, {
                                [cls["active"]]: active,
                                [cls["disabled"]]: disabled
                            })} href={href}>{name}</a>
                                : <span className={classNames(cls.item, {
                                    [cls.active]: active,
                                    [cls.disable]: disabled
                                }, [])} onClick={callBack}>{name}</span>

                        )}
                    </Menu.Item>);
                })}

            </Menu.Items>
        </Menu>
    );
};