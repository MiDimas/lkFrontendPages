import path from "path";
import fs from "fs";
const entryPoints: Record<string, string> = {
    secondPage: "secondPage.tsx"
};

export const entriesList = (src: string, page?: string): Record<string, string> => {
    const resolveJSFiles = (...segments: string[]) => path.resolve(src, "entryPoints", ...segments);
    const entry: Record<string, string> = {};
    if(page){
        if(Object.keys(entryPoints).includes(page)){
            return {
                [page]: resolveJSFiles(page, entryPoints[page])
            };
        }
        else {
            const filePath = resolveJSFiles(page, `${page}.tsx`);
            if(fs.existsSync(resolveJSFiles(page)) && fs.existsSync(filePath)){
                return {
                    [page]: filePath
                };
            }
        }
    }
    Object.entries(entryPoints).map(([key, value]) => {
        entry[key]= resolveJSFiles(key, value);
    });
    return entry;

};