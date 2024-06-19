import {useModalState} from "shared/lib/hooks/useModalState/useModalState";
import {IViewer} from "widgets/IViewer/IViewer";

export const ViewerWindowPage = () =>  {
    const {isOpen, onClose, onOpen} = useModalState(true);
    const image = "https://lk.sps38.pro/src/docs/forNotify/inviteFriend/info.png";
    return (
        <IViewer isOpen={isOpen} onClose={onClose} srcs={[image, image]} />
    );
};