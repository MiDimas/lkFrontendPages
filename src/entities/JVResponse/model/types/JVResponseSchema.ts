export interface JVResponseSchema {
    id: number;
    fio: string;
    email?: string;
    phone?: string;
    birthDate?: string;
    country?: number;
    jobTitle: string;
    status: number;
    worker?: number;
    comment?: string;
    category?: number;
    identifier?: number;
    createdAt: string;
    updatedAt: string;
    categoryName?: string;
    countryName?: string;
    identifierName?: string;
    statusName?: string;
    workerName?: string;
}
