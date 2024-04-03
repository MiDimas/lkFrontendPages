export function phoneMask (phone: string): string {
    const firstChar = phone.length ? phone[0] : "";
    phone = phone.replace(/\D/g, "");
    if(firstChar === "+"){
        phone= firstChar+phone;
    }
    return phone;
}