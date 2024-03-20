export interface JVResponseSchema {
    id: number;
    fio: string;
    email?: string;
    phone?: string;
    birth_date?: string;
    country?: number;
    job_title: string;
    status: number;
    worker?: number;
    comment?: string;
    category?: number;
    identifier?: number;
    created_at: string;
    updated_at: string;
    categoryName?: string;
    countryName?: string;
    identifierName?: string;
    statusName?: string;
    workerName?: string;
}
