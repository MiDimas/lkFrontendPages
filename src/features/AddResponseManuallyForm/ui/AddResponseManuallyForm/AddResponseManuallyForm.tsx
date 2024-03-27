import {Input} from "shared/ui/Input/Input";
import {classNames} from "shared/lib/classNames/classNames";
import cls from "./AddResponseManuallyForm.module.css";
import {useCallback, useState} from "react";
import {addResponse} from "../../api/addResponse/addResponse";
import {AddResponseSchema} from "../../model/types/AddResponseSchema";
interface AddResponseManuallyFormProps {
    className?: string;
}
export const AddResponseManuallyForm = (props: AddResponseManuallyFormProps) => {
    const {
        className
    } = props;

    const [response, setResponse] = useState<AddResponseSchema>();
    const [isLoading, setIsLoading] = useState(false);
    const sendHandler = useCallback(async (params?: AddResponseSchema) => {
        setIsLoading(true);
        const res = await addResponse(
            params || {}
        );
        if(res.result===1){
            setResponse({});
        }
        setIsLoading(false);
    }, []);

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

    if(isLoading) {
        return <div>Loading ...</div>;
    }
    return (
        <div className={classNames(cls.form, {}, [className])}>
            <Input className={cls.input} label="ФИО" onChange={changeFio}/>
            <Input className={cls.input} label="Должность" onChange={changeJobTitle} />
            <Input className={cls.input} label="Телефон" onChange={changePhone} />
            <Input className={cls.input} label="Email" onChange={changeEmail} />

            <button onClick={() => {
                sendHandler(response);
            }}>
                Записать отклик
            </button>
        </div>
    );
};