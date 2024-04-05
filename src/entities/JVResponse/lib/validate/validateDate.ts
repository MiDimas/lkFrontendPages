import {dateValidator} from "shared/lib/helpers/validators/dateValidator";

export const validateDate = (date?: string) => {
    return !date || dateValidator(date);
};