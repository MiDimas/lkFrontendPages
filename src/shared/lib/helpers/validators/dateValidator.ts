export function dateValidator (date: string) {
    const pattern =/^(0[1-9]|[12][0-9]|3[01])([.,-])(0[1-9]|1[012])([.,-])(19[0-9]{2}|2[0-9]{3})$/i;
    const result = date.match(pattern);

    if(!result || result.length!==6 || result[2] !== result[4]){
        return false;
    }
    return true;

}