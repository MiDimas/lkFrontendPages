export const  validateFio = (fio:string): boolean => {
    return fio.trim().length > 5;
};