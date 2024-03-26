import {Input} from "shared/ui/Input/Input";

interface AddResponseManuallyFormProps {
    className?: string;
}
export const AddResponseManuallyForm = (props: AddResponseManuallyFormProps) => {
    const {
        className
    } = props;
    return (
        <div>
            <Input label="ФИО" />
        </div>
    );
};