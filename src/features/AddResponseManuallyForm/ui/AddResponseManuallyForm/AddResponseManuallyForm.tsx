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
import {validateAdd} from "../../lib/validate/validateAdd";
import {validateFio} from "../../lib/validate/validateFio";
import {validateJobTitle} from "../../lib/validate/validateJobTitle";
import {phoneMask} from "shared/lib/helpers/masks/phoneMask";
import {validatePhone} from "../../lib/validate/validatePhone";
import {emailMask} from "shared/lib/helpers/masks/emailMask";
import {validateEmail} from "../../lib/validate/validateEmail";
interface AddResponseManuallyFormProps {
    className?: string;
}
const initialValid = {
    fio: false,
    jobTitle: false,
    email: true,
    phone: false,
};
export const AddResponseManuallyForm = (props: AddResponseManuallyFormProps) => {
    const {
        className
    } = props;

    const [response, setResponse] = useState<AddResponseSchema>();
    const [isLoading, setIsLoading] = useState(false);
    const [identifiersList, setIdentifiersList] = useState<IdentifiersSchema[]>();
    const [newIdentifier, setNewIdentifier] = useState<string>("");
    const [valid, setValid] = useState(initialValid);

    const sendHandler = useCallback(async (params?: AddResponseSchema) => {
        if(!params){
            return;
        }
        validateAdd(params);
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
        (value: string="") => {
            value = value.replace(/[\\'"<>&]/gm, "");
            setResponse((prevState) => ({
                ...prevState,
                fio:value
            }));
            setValid((prev) => ({
                ...prev,
                fio: validateFio(value)
            }));
        },
        [setResponse],
    );
    const changeJobTitle = useCallback(
        (value: string="") => {
            value = value.replace(/[\\'"<>&]/gm, "");
            setResponse((prevState) => ({
                ...prevState,
                jobTitle:value,
            }));
            setValid((prev) => ({
                ...prev,
                jobTitle: validateJobTitle(value)
            }));
        },
        [setResponse],
    );
    const changePhone = useCallback(
        (value: string = "") => {
            value = phoneMask(value);
            setResponse((prevState) => ({...prevState, phone:value}));
            setValid((prev) => ({
                ...prev,
                phone: validatePhone(value, response?.email),
            }));
        },
        [setResponse, response?.email],
    );
    const changeEmail = useCallback(
        (value: string= "") => {
            value = emailMask(value);
            setResponse((prevState) => ({...prevState, email:value}));
            setValid((prev) => (
                {...prev, email: validateEmail(value, response?.phone)}
            ));
        },
        [setResponse, response?.phone],
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
                className={classNames(cls.input, {[cls.err]: !valid.fio})}
                label="ФИО"
                onChange={changeFio}
                value={response?.fio || ""}
            />
            <Input
                className={classNames(cls.input, {[cls.err]: !valid.jobTitle})}
                label="Должность"
                onChange={changeJobTitle}
                value={response?.jobTitle || ""}
            />
            <Input
                className={classNames(cls.input, {[cls.err]: !valid.phone})}
                label="Телефон"
                onChange={changePhone}
                value={response?.phone || ""}
            />
            <Input
                className={classNames(cls.input, {[cls.err]: !valid.email})}
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