export function getQueryParams<T extends object>(params: Record<string, string|undefined> | T) {
    const searchParams = new URLSearchParams(window.location.search);
    Object.entries(params).forEach(([name, value])=> {
        if(value !== undefined) {
            if(typeof value === "number"){
                value = String(value);
            }
            searchParams.set(name,value);
        }
    });
    return `?${searchParams.toString()}`;
}

export function addQueryParams<T extends object>(params: Record<string, string|undefined> | T) {
    window.history.pushState(null, "", getQueryParams<T>(params));
}