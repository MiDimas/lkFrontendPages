import {Input} from "shared/ui/Input/Input";
import {classNames} from "shared/lib/classNames/classNames";
import cls from "./AddResponseManuallyForm.module.css";
interface AddResponseManuallyFormProps {
    className?: string;
}
export const AddResponseManuallyForm = (props: AddResponseManuallyFormProps) => {
    const {
        className
    } = props;
    return (
        <div className={classNames(cls.form, {}, [className])}>
            <Input label="ФИО" />
            <Input label="Должность" />
            <Input label="Телефон" />
            <Input label="Email" />
            <button>Записать отклик</button>
        </div>
    );
};