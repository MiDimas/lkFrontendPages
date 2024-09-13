export const DEFAULT_RESPONSE:ResponsesStructure<[]> = {
    result:0,
    desc: "Ошибка на стороне клиента",
    data: [],
    info: {count:0}
};
export const DEFAULT_RESPONSE_OBJECT:ResponsesStructure<object> = {
    result:0,
    desc: "Ошибка на стороне клиента",
    data: undefined,
    info: {count:0}
};
export const DEFAULT_RESPONSE_WITHOUT_DATA: ResponsesStructure<null> ={
    result:0,
    desc: "Ошибка на стороне клиента",
    data: null,
    info: {count:0}
};