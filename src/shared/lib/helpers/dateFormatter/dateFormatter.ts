export function dateFormatter (dateFromDB?:string, short:boolean=true ):string{
    if(!dateFromDB || dateFromDB === "0000-00-00"){
        return "";
    }
    dateFromDB = dateFromDB.replace(" ", "T");
    const date = new Date(dateFromDB);

    if (short){
        return date.toLocaleDateString("ru-RU");
    }
    date.setHours(date.getHours() + 5);
    return  date.toLocaleString("ru-RU");
}