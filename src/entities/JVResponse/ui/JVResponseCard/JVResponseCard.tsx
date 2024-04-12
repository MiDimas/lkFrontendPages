import {JVResponseSchema} from "../../model/types/JVResponseSchema";
import cls from "./JVResponseCard.module.css";
import {memo, useCallback, useState} from "react";
import {JVResponseMainInfo} from "../JVResponseMainInfo/JVResponseMainInfo";
import {JVResponseActionButton} from "../JVResponseActionButton/JVResponseActionButton";
import {JVResponseAdditionalInfo} from "../JVResponseAdditionalInfo/JVResponseAdditionalInfo";
import {JVResponseEditButton} from "../JVResponseEditButton/JVResponseEditButton";
import {CountrySchema} from "entities/Country/model/types/CountrySchema";
import {validateUpdate} from "../../lib/validate/validateUpdate";
import {usePopUpMsg} from "shared/lib/hooks/usePopUpMsg/usePopUpMsg";

interface JVResponseCardProps {
    response: JVResponseSchema;
    changeStatus?: (id: number, status:number) => Promise<ResponsesStructure<null>>;
    user?: User;
    updateCard?: (state:JVResponseSchema)=>Promise<ResponsesStructure<null>>;
    countries?: CountrySchema[];
    removeWorker?: (id: number) => Promise<ResponsesStructure<null>>;
}
export const JVResponseCard = memo ((props: JVResponseCardProps) => {
    const {
        response,
        changeStatus,
        user,
        updateCard,
        countries,
        removeWorker
    } = props;

    const [state, setState] = useState(response);
    const [addVisible, setAddVisible] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const {Component, setMessage} = usePopUpMsg(2000);

    const changeStatusHandler = useCallback(async(id:number, status:number) => {
        if(changeStatus) {
            await changeStatus(id, status);
        }
    }, [changeStatus]);
    const undoChangesHandler = useCallback( () => {
        setState(response);
        setIsEdit(false);
    }, [response, setState, setIsEdit] );
    const saveChangesHandler = useCallback(
        async (state: JVResponseSchema) => {
            if(updateCard) {
                if(JSON.stringify(response) !== JSON.stringify(state)){
                    if(!validateUpdate(state)){
                        setMessage({
                            text: "Не заполнены или неправильно, заполнены обязательные поля!",
                            severity: "warning"
                        });
                        return;
                    }
                    const res = await updateCard(state);
                    console.log(res);
                    if(!res.result) {
                        setMessage({
                            text: res.desc,
                            severity: "error"
                        });
                        undoChangesHandler();
                        return;
                    }
                    setMessage({
                        text: res.desc,
                        severity: "success"
                    });
                    setIsEdit(false);
                    return;
                }
                setMessage({
                    text: "Не обнаружено никаких изменений", severity: "warning"
                });

            }
        },
        [updateCard, undoChangesHandler, response, setIsEdit, setMessage],
    );


    return (
        <div className={cls.card}>
            <Component />
            <div className={cls.content}>
                <JVResponseMainInfo
                    state={{
                        fio: state.fio,
                        jobTitle: state.jobTitle,
                        email: state.email,
                        phone: state.phone,
                        categoryName: state.categoryName,
                        statusName: state.statusName
                    }}
                    canEdit={isEdit}
                    setState={setState}
                />
                <div  className={cls.buttonBlock}>
                    {user?.id && user.id===state.worker && response.status < 5
                        ? (
                            <JVResponseEditButton
                                isEdit={isEdit}
                                setIsEdit={setIsEdit}
                                undoChange={undoChangesHandler}
                                saveChange={saveChangesHandler}
                                state={state}
                            />
                        )
                        : ""
                    }
                    <button
                        className={cls.buttonToWork}
                        onClick={()=>{
                            setAddVisible((prevState)=> !prevState);
                        }}
                    >
                        Подробнее
                    </button>
                    <JVResponseActionButton
                        id={response.id}
                        status={response.status}
                        owner={user && user.id===state.worker}
                        change={changeStatusHandler} />
                    {response.status !== 1 && removeWorker
                        ? (
                            <button
                                className={cls.buttonToWork}
                                onClick={()=> {
                                    removeWorker(response.id);
                                }}>
                                Сброс
                            </button>
                        )
                        : ""
                    }
                </div>
                <JVResponseAdditionalInfo
                    visible={addVisible}
                    canEdit={isEdit}
                    state={{
                        workerName: state.workerName,
                        birthDate: state.birthDate,
                        country: state.country,
                        countryName: state.countryName,
                        identifierName: state.identifierName,
                        createdDate: state.createdAt,
                        updatedDate: state.updatedAt,
                        comment: state.comment,
                        category:state.category,
                        referenceName:state.referenceName,
                        lastComment:state.lastComment,
                    }}
                    setState={setState}
                    countries={countries}
                />
            </div>
        </div>
    );
});
JVResponseCard.displayName = "JVResponseCard";