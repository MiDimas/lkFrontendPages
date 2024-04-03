export function phoneMask (phone: string): string {
    const firstChar = phone.length ? phone[0] : "";
    phone = phone.replace(/\D/g, "").substring(0, 15);
    if(firstChar === "8") {
        phone = "+7"+phone.substring(1);
    }
    else if (firstChar === "+") {
        phone = "+"+phone;
    }
    else if (firstChar) {
        phone = "+" + phone;
    }
    return phone;
}