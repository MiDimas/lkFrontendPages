export function dateMask (date: string): string {
    const lastChar = date.length? date[date.length-1] : "";
    console.log(lastChar);
    date = date.replace(/\D/g, "").substring(0,8);
    const day = date.substring(0,2);
    const month = date.substring(2,4);
    const year = date.substring(4 ,8);
    const addPoint = lastChar==="." || lastChar==="/" || lastChar==="-";
    if(date.length>4){
        return day + "." + month + "." + year;
    }
    else if (date.length > 2){
        if(addPoint && month.length === 2){
            return day + "." + month + ".";
        }
        return  day + "." + month ;
    }
    else {
        if(addPoint && day.length === 2){
            return day + ".";
        }
        return day ;
    }

}