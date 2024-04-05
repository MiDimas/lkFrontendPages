import {JVResponseSchema} from "../../model/types/JVResponseSchema";
import {validateFio} from "./validateFio";
import {validateJobTitle} from "./validateJobTitle";
import {validateEmail} from "./validateEmail";
import {validatePhone} from "./validatePhone";

export const validateUpdate = (state: JVResponseSchema) => {
    const validFio = validateFio(state.fio);
    const validJobTitle = validateJobTitle(state.jobTitle);
    const validEmail = validateEmail(state.email, state.phone);
    const validPhone = validatePhone(state.phone, state.phone);

    return validFio && validJobTitle && validPhone && validEmail;
};