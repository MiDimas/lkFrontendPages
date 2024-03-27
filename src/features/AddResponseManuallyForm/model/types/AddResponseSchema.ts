
export interface IdentifiersSchema {
    id: number,
    name: string
}
export interface AddResponseSchema {
    fio?: string;
    jobTitle?: string;
    phone?: string;
    email?: string;
    identifier?: number;
}