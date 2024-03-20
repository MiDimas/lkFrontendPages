import {JVResponseSchema} from "../../model/types/JVResponseSchema";
import cls from "./JVResponseCard.module.css";
import {useCallback, useEffect,  useState} from "react";
import {JVResponseMainInfo} from "../JVResponseMainInfo/JVResponseMainInfo";
import {JVResponseActionButton} from "../JVResponseActionButton/JVResponseActionButton";
import {JVResponseAdditionalInfo} from "../JVResponseAdditionalInfo/JVResponseAdditionalInfo";
import {JVResponseEditButton} from "../JVResponseEditButton/JVResponseEditButton";

interface JVResponseCardProps {
    response: JVResponseSchema;
    changeStatus?: (id: number, status:number) => Promise<ResponsesStructure<null>>;
    user?: User;
}
export const JVResponseCard = (props: JVResponseCardProps) => {
    const {
        response,
        changeStatus,
        user
    } = props;

    const [state, setState] = useState(response);
    const [resp, setResp] = useState<ResponsesStructure<null>>();
    const [addVisible, setAddVisible] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const changeStatusHandler = useCallback(async(id:number, status:number) => {
        if(changeStatus) {
            const res = await changeStatus(id, status);
            setResp(res);
        }
    }, [changeStatus]);

    useEffect(() => {
        console.log(resp);
    }, [resp]);

    return (
        <div className={cls.card}>
            <div className={cls.content}>
                <JVResponseMainInfo
                    fio={response.fio}
                    job_title={response.job_title}
                    email={response.email}
                    phone={response.phone}
                    category={response.category}
                    statusName={response.statusName}
                />
                <div  className={cls.buttonBlock}>
                    {user?.id && user.id===state.worker
                        ? (
                            <JVResponseEditButton
                                isEdit={isEdit}
                                setIsEdit={setIsEdit}
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
                        birth_date: state.birth_date,
                        countryName: state.countryName,
                        identifierName: state.identifierName,
                        createdDate: state.created_at,
                        updatedDate: state.updated_at,
                        comment: state.comment,
                    }}
                    setState={setState}
                />
            </div>
        </div>
    );
};