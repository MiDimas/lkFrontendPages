export function objectValuesToString(params:Record<string, string|number|undefined|null|boolean>) {
    return Object.fromEntries(
        Object.entries(params).map(([key, value])=> [key, String(value)])
    );
}