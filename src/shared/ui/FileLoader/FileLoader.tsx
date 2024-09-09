import {ChangeEvent} from "react";

interface FileLoaderProps {
    setFile?: (file:File|null) => void;

}
export const FileLoader = (props: FileLoaderProps) => {
    const {
        setFile
    } = props;

    const handleFile = (event:ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) setFile?.(null);
        else setFile?.(file);
    };


    return (
        <label>
            <input type="file" onChange={handleFile} />
        </label>
    );
};