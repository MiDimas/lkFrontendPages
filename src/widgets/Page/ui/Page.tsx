import {DetailedHTMLProps, HTMLAttributes} from "react";
import {classNames} from "shared/lib/classNames/classNames";
import cls from "./Page.module.css";
interface PageProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {

}
export const Page = (props: PageProps) => {
    const {
        children,
        className,
        ...otherProps
    } = props;
    return (
        <div
            className={classNames(cls.page, {}, [className])} {...otherProps}
            id="page"
        >
            {children}
        </div>
    );
};