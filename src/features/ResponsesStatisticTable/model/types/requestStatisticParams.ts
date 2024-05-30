import {DateSchema} from "entities/Date/model/types/DateSchema";

export interface RequestStatisticParams {
    startDate?: DateSchema;
    finalDate?: DateSchema;
}