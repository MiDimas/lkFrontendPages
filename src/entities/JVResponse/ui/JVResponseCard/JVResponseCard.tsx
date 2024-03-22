import {JVResponseSchema} from "../../model/types/JVResponseSchema";
import cls from "./JVResponseCard.module.css";
import {memo, useCallback, useState} from "react";
import {JVResponseMainInfo} from "../JVResponseMainInfo/JVResponseMainInfo";
import {JVResponseActionButton} from "../JVResponseActionButton/JVResponseActionButton";
import {JVResponseAdditionalInfo} from "../JVResponseAdditionalInfo/JVResponseAdditionalInfo";
import {JVResponseEditButton} from "../JVResponseEditButton/JVResponseEditButton";
import {CountrySchema} from "entities/Country/model/types/CountrySchema";

interface JVResponseCardProps {
    response: JVResponseSchema;
    changeStatus?: (id: number, status:number) => Promise<ResponsesStructure<null>>;
    user?: User;
    updateCard?: (state:JVResponseSchema)=>Promise<ResponsesStructure<null>>;
    countries?: CountrySchema[];
}
export const JVResponseCard = memo ((props: JVResponseCardProps) => {
    const {
        response,
        changeStatus,
        user,
        updateCard,
        countries
    } = props;

    const [state, setState] = useState(response);
    const [addVisible, setAddVisible] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const changeStatusHandler = useCallback(async(id:number, status:number) => {
        if(changeStatus) {
            await changeStatus(id, status);
        }
    }, [changeStatus]);
    const undoChangesHandler = useCallback( () => {
        setState(response);
    }, [response, setState] );
    const saveChangesHandler = useCallback(
        async (state: JVResponseSchema) => {
            if(updateCard) {
                if(JSON.stringify(response) !== JSON.stringify(state)){
                    const res = await updateCard(state);
                    console.log(res);
                    if(!res.result) {
                        undoChangesHandler();
                    }
                }

            }
        },
        [updateCard, undoChangesHandler, response],
    );


    return (
        <div className={cls.card}>
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
                        change={changeStatusHandler} />
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
                    }}
                    setState={setState}
                    countries={countries}
                />
            </div>
        </div>
    );
});
JVResponseCard.displayName = "JVResponseCard";