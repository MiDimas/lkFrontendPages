export interface ChangeStatusParams {
    id: number,
    status: number,
    additionalParams: ChangeStatusAdditionalParams
}

interface ChangeStatusAdditionalParams {
    comment?: string | null;
    responsible?: string;
    responsibleSec?: string| null;
}