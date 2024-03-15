declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.webp";

declare module "*.css" {
    interface IClassNames {
        [className: string]: string
    }
    const classNames: IClassNames;
    export = classNames;
}

declare module "*.svg" {
    import React from "react";

    const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}

declare const __API__: string;
declare const __DEV__: boolean;
declare const __PHPDATA__: User | undefined;

interface  User {
    id: number;
    firstName: string;
}
interface ResponsesStructure<T> {
    result: number;
    desc:string;
    data?: T;
    info: {
        id?: number;
        count: number;
    }
}