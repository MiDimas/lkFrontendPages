import {JobVacancyResponsesFrame} from "features/JobVacancyResponseList";
import {haveRole} from "shared/lib/localStorage/roles";
import {Page} from "widgets/Page";
import {PopUpMessage} from "shared/ui/PopUpMessage/PopUpMessage";
import {Modal} from "shared/ui/Modal/Modal";

export const JobVacancyResponsePage = () => {
    if(typeof __PHPDATA__ !== "undefined"){
        return (
            <Page>
                { haveRole(["9", "10"])
                    ? <JobVacancyResponsesFrame user={__PHPDATA__} head={haveRole(10)}/>
                    : <div>У вас недостаточно прав</div>
                }
            </Page>
        );
    }
    else if (__DEV__) {
        return (
            <Page>
                { haveRole(["9", "10"])
                    ? <JobVacancyResponsesFrame user={{id: 555, firstName:"Димас"}} head={haveRole(10)}/>
                    : <div>У вас недостаточно прав</div>
                }
                <Modal>Hello</Modal>
            </Page>
        );
    }

    return (
        <div>
            Not Authorized
        </div>
    );
};