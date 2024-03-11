import path from "path";
const entryPoints: Record<string, string> = {
    firstPage: 'firstPage.tsx',
    secondPage: 'secondPage.tsx'

}

export const entriesList = (src: string, page?: string): Record<string, string> => {
    const resolveJSFiles = (...segments: string[]) => path.resolve(src, 'entryPoints', ...segments);
    const entry: Record<string, string> = {};
    if(page){
        if(Object.keys(entryPoints).includes(page)){
            return {
                [page]: resolveJSFiles(page, entryPoints[page])
            }
        }
    }
    Object.entries(entryPoints).map(([key, value]) => {
        entry[key]= resolveJSFiles(key, value)
    })
    return entry

}