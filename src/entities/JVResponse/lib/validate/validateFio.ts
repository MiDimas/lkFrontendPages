import {fioValidator} from "shared/lib/helpers/validators/fioValidator";

export const  validateFio = (fio:string): boolean => {
    return fio.trim().length > 5;
};

export const  validateStrictFio = (fio: string): boolean => {
    return fio.trim().length > 5 && fioValidator(fio);
};