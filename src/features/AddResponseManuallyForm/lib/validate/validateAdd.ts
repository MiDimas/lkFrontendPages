import {AddResponseSchema} from "../../model/types/AddResponseSchema";
import {validateFio} from "./validateFio";
import {validateJobTitle} from "./validateJobTitle";
import {validateEmail} from "./validateEmail";
import {validatePhone} from "./validatePhone";

export const validateAdd = (state: AddResponseSchema) => {
    const validFio = validateFio(state.fio ?? "");
    const validJobTitle = validateJobTitle(state.jobTitle ?? "");
    const validEmail = validateEmail(state.email, state.phone);
    const validPhone = validatePhone(state.phone, state.phone);

    return validFio && validJobTitle && validPhone && validEmail;
};