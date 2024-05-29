export interface ResponsesStatisticSchema {
    hr?: ResponsesStructure<ResponsesStatisticHRSchema[]>;
    identifiers?: ResponsesStructure<ResponsesStatisticIdentifiersSchema[]>;
}
export interface ResponsesStatisticHRSchema {
    hr?: number;
    firstname?: string;
    statistic?: string;
    statisticParse?: OptionalRecord<string, number>
}
export interface ResponsesStatisticIdentifiersSchema {
    identifier?: number;
    category?: number;
    iName?: string;
    cName?: string;
    statistic?: string;
    statisticParse?: OptionalRecord<string, number>
}