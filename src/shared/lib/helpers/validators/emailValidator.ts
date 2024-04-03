export function emailValidator (email:string): boolean {
    if(!email.match(/^[A-Z0-9._%+-]+@([A-Z0-9-]+\.){1,3}[A-Z]{2,4}$/gi)){
        return false;
    }
    return true;
}