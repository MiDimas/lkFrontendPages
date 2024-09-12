import cls from "./Skeleton.module.css";
import {Reflection} from "shared/ui/Reflection/Reflection";
import {CSSProperties} from "react";
import {classNames}  from "shared/lib/classNames/classNames";

type ColorSkeleton = "white" | "silver" | "lightSilver";

interface SkeletonProps {
    className?: string;
    height?: CSSProperties["height"];
    width?: CSSProperties["width"];
    radius?: CSSProperties["borderRadius"];
    color?: ColorSkeleton;
}

const mappedColorsReflections:Record<ColorSkeleton, CSSProperties["backgroundColor"]> = {
    white: "gray",
    silver: "whitesmoke",
    lightSilver: "white"
};
const mappedColorsSkeleton:Record<ColorSkeleton, CSSProperties["backgroundColor"]> = {
    white: "white",
    silver: "silver",
    lightSilver: "#d9d9d9"
};

export const Skeleton = (props: SkeletonProps) => {
    const {
        className,
        height=30,
        width=100,
        radius =10,
        color= "silver"
    } = props;
    const styles: CSSProperties = {
        height: height,
        width: width,
        borderRadius: radius,
        backgroundColor: mappedColorsSkeleton[color]
    };
    return <div className={classNames(cls.Skeleton, {}, [className])} style={styles}>
        <Reflection color={mappedColorsReflections[color]} />
    </div>;
};