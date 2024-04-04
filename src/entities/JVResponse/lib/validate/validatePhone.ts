import {phoneValidator} from "shared/lib/helpers/validators/phoneValidator";

export const validatePhone = (phone?:string, email?:string) => {
    return phone ? phoneValidator(phone) : (!!email?.length);
};