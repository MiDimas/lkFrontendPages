import {emailValidator} from "shared/lib/helpers/validators/emailValidator";

export const validateEmail = (email?: string, phone?: string) => {
    return email ? emailValidator(email) : (!!phone?.length);
};