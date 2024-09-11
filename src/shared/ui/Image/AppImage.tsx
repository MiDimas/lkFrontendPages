import {DetailedHTMLProps, ImgHTMLAttributes, ReactElement, useLayoutEffect, useState} from "react";
import cls from "./AppImage.module.css";
import {classNames} from "shared/lib/classNames/classNames";

interface AppImageProps extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>{
    fallback?: ReactElement;
    errorFallback?: ReactElement;
}

export const AppImage = (props: AppImageProps) => {
    const {
        className,
        fallback,
        errorFallback,
        src,
        alt = "Image",
        ...other
    } = props;
    const [isLoading,  setIsLoading] = useState<boolean>(true);
    const [hasError, setHasError] =  useState<boolean>(false);

    useLayoutEffect(()=> {
        const img = new Image();
        img.src = src ?? "";
        img.onload = () => {
            setIsLoading(false);
        };
        img.onerror = () => {
            setIsLoading(false);
            setHasError(true);
        };
    }, [src]);

    if(isLoading && fallback) {
        return fallback;
    }
    if(hasError && errorFallback){
        return  errorFallback;
    }
    return (<img src={src} alt={alt} className={classNames(cls.image, {}, [className])} {...other}/>);
};