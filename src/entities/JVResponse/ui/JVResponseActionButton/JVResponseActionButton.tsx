import {memo} from "react";
import cls from "../JVResponseCard/JVResponseCard.module.css";
import {Dropdown} from "shared/ui/Dropdown/Dropdown";
import {classNames} from "shared/lib/classNames/classNames";

interface JVResponseActionButtonProps {
    id: number;
    status: number;
    change: (id:number, response: number) => void;
    className?: string;
    owner?:boolean;
}
export const JVResponseActionButton = memo((props: JVResponseActionButtonProps) => {
    const {
        id,
        status,
        change,
        className,
        owner
    } = props;
    if(status === 1) {
        return (<button
            className={cls.buttonToWork}
            onClick={() => change(id, 2)}
        >
            В работу
        </button>);
    }
    else if((status===2 ||  status===3 || status===4) && owner ) {
        return (
            <Dropdown
                className={classNames(cls.buttonToWork, {}, [className])}
                items={[
                    {
                        name: "Не дозвон",
                        callBack: ()=> {change(id, 3);}
                    },
                    {
                        name: "Подумает",
                        callBack: ()=> {change(id, 4);}
                    },
                    {
                        name: "Отказ",
                        callBack: ()=> {change(id, 5);}
                    },
                    {
                        name: "Трудоустройство",
                        callBack: ()=> {change(id, 6);}
                    }
                ]}
            >
                Результат
            </Dropdown>
        );
    }
});
JVResponseActionButton.displayName = "JVResponseActionButton";