import {Input} from "shared/ui/Input/Input";
import {classNames} from "shared/lib/classNames/classNames";
import cls from "./AddResponseManuallyForm.module.css";
import {useCallback, useMemo, useState} from "react";
import {addResponse} from "../../api/addResponse/addResponse";
import {AddResponseSchema, IdentifiersSchema} from "../../model/types/AddResponseSchema";
import {useInitialEffect} from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import {getIdentifiers} from "../../api/getIdentifiers/getIdentifiers";
import {Select, SelectOption} from "shared/ui/Select/Select";
import {addIdentifier} from "../../api/addIdentifier/addIdentifier";
interface AddResponseManuallyFormProps {
    className?: string;
}
export const AddResponseManuallyForm = (props: AddResponseManuallyFormProps) => {
    const {
        className
    } = props;

    const [response, setResponse] = useState<AddResponseSchema>();
    const [isLoading, setIsLoading] = useState(false);
    const [identifiersList, setIdentifiersList] = useState<IdentifiersSchema[]>();
    const [newIdentifier, setNewIdentifier] = useState<string>("");

    const sendHandler = useCallback(async (params?: AddResponseSchema) => {
        setIsLoading(true);
        const res = await addResponse(
            params || {}
        );
        if(res.result===1){
            setResponse({});
        }
        setIsLoading(false);
    }, [setIsLoading]);


    const loadIdentifiers = useCallback(
        async () => {
            setIsLoading(true);
            const res = await getIdentifiers();
            if(res.data){
                setIdentifiersList(res.data);
            }
            setIsLoading(false);
        },
        [setIsLoading, setIdentifiersList],
    );


    const changeFio = useCallback(
        (value?: string) => {
            setResponse((prevState) => ({...prevState, fio:value}));
        },
        [setResponse],
    );
    const changeJobTitle = useCallback(
        (value?: string) => {
            setResponse((prevState) => ({...prevState, jobTitle:value}));
        },
        [setResponse],
    );
    const changePhone = useCallback(
        (value?: string) => {
            setResponse((prevState) => ({...prevState, phone:value}));
        },
        [setResponse],
    );
    const changeEmail = useCallback(
        (value?: string) => {
            setResponse((prevState) => ({...prevState, email:value}));
        },
        [setResponse],
    );

    const changeIdentifier = useCallback(
        (value: number|string =0) => {
            value = Number(value);
            if(!isNaN(value)){
                setResponse((prevState) => ({
                    ...prevState,
                    identifier: value
                }));
            }
            
        },
        [setResponse],
    );

    const changeNewIdentifier =useCallback(
        (value: string="") => {
            setNewIdentifier(value);
        }, [setNewIdentifier]
    );
    const addIdentifierHandler = useCallback(
        async (value?:string) => {
            if(value) {
                const res = await addIdentifier(value);
                if(res.result){
                    loadIdentifiers();
                }
                setNewIdentifier("");
            }
        }, [loadIdentifiers, setNewIdentifier]
    );

    useInitialEffect(() => {
        loadIdentifiers();
    });

    const optionsIdentifiers = useMemo<SelectOption<number>[]>(() => {
        if(identifiersList && identifiersList.length) {
            return identifiersList.map( ({id, name}) => ({
                value: id,
                content: name
            }));
        }
        return [];
    }, [identifiersList]);

    if(isLoading) {
        return <div>Loading ...</div>;
    }
    return (
        <div className={classNames(cls.form, {}, [className])}>
            <Input
                className={cls.input}
                label="ФИО"
                onChange={changeFio}
                value={response?.fio || ""}
            />
            <Input
                className={cls.input}
                label="Должность"
                onChange={changeJobTitle}
                value={response?.jobTitle || ""}
            />
            <Input
                className={cls.input}
                label="Телефон"
                onChange={changePhone}
                value={response?.phone || ""}
            />
            <Input
                className={cls.input}
                label="Email"
                onChange={changeEmail}
                value={response?.email || ""}
            />
            <Select label="Идентификатор"
                value={response?.identifier}
                options={optionsIdentifiers}
                onChange={changeIdentifier}
                defaultValue={"Нет информации"}
            />
            <button
                className={cls.button}
                onClick={() => {
                    sendHandler(response);
                }}>
                Записать отклик
            </button>

            <Input
                label={"Добавить идентификатор"}
                className={cls.input}
                value={newIdentifier}
                onChange={changeNewIdentifier}
            />
            <button
                className={cls.button}
                onClick={() => addIdentifierHandler(newIdentifier)}>
                Добавить новый идентификатор
            </button>
        </div>
    );
};