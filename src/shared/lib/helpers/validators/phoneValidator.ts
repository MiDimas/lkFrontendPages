export function phoneValidator (phone: string): boolean {
    if(phone.trim().length<5){
        return false;
    }
    return true;
}