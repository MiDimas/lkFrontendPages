import {AddResponseManuallyForm} from "features/AddResponseManuallyForm";

interface AddResponseManuallyProps {
    user: User;
}
export const AddResponseManually = (props: AddResponseManuallyProps) => {
    const {
        user
    } = props;

    return (
        <>
            <AddResponseManuallyForm userData={user}/>
        </>
    );
};