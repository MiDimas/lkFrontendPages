import {JVResponseSchema} from "../../model/types/JVResponseSchema";
import {validateStrictFio} from "./validateFio";
import {validatePhone} from "./validatePhone";
import {validateEmail} from "./validateEmail";
import {validateDate} from "./validateDate";

export interface ValidateExportResponse {
    result: boolean;
    message?: string;
}
export function validateExport (state: JVResponseSchema): ValidateExportResponse {
    const {
        fio,
        phone,
        jobTitleCode,
        email,
        birthDate
    } = state;
    const defaultMsg = " Необходимо исправить перед экспортом.";
    if(!validateStrictFio(fio)){
        return {result: false,  message: "Некоректный формат Фамилии Имени и Отчества."+defaultMsg};
    }
    if (!validatePhone(phone)){
        return {result: false, message: "Некорректный номер телефона."+defaultMsg};
    }
    if(!validateEmail(email, phone)) {
        return {result: false, message: "Некоректный  email."+defaultMsg};
    }
    if(!validateDate(birthDate)) {
        return {result: false, message: "Некорректная дата рождения."+defaultMsg};
    }
    if(!jobTitleCode){
        return {result: false, message: "Некоррекная вакансия."+defaultMsg};
    }

    return {result: true, message: "Успех"};
}