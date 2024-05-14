export interface JVResponseSchema {
    id: number;
    fio: string; //обязательное поле
    email?: string; // Нужно чтобы было хотя бы одно из двух
    phone?: string; //
    birthDate?: string; //если есть хоть что то валидировать
    country?: number; // если осуществлялось изменения то записывать
    jobTitle: string; //обязательное поле
    jobTitleCode?: string;
    status: number;
    worker?: number;
    comment?: string;
    category?: number;
    identifier?: number;
    reference?: number;
    createdAt: string;
    updatedAt: string;
    categoryName?: string;
    countryName?: string;
    identifierName?: string;
    statusName?: string;
    workerName?: string;
    lastComment?: string;
    referenceName?: string;
}
export interface JVResponseInfoSchema extends ResponsesInfoStructure{
    totalCount?: number;
    pagesCount?: number;
    hasNext?: boolean;
}