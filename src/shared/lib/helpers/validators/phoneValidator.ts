export function phoneValidator (phone: string): boolean {
    if(phone.trim().length<11){
        return false;
    }
    return true;
}