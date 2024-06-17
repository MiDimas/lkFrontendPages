export function fioValidator (fio: string):boolean {
    return !!fio.match(/^([а-яА-Я]+ ){1,4}([а-яА-Я]+)$/);
}