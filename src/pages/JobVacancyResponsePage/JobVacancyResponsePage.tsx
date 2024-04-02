import {JobVacancyResponsesFrame} from "features/JobVacancyResponseList";
import {haveRole} from "shared/lib/localStorage/roles";

export const JobVacancyResponsePage = () => {
    if(typeof __PHPDATA__ !== "undefined"){
        return (
            <>
                { haveRole(["9", "10"])
                    ? <JobVacancyResponsesFrame user={__PHPDATA__} head={haveRole(10)}/>
                    : <div>У вас недостаточно прав</div>
                }
            </>
        );
    }
    else if (__DEV__) {
        return (
            <>
                { haveRole(["9", "10"])
                    ? <JobVacancyResponsesFrame user={{id: 555, firstName:"Димас"}} head={haveRole(10)}/>
                    : <div>У вас недостаточно прав</div>
                }

            </>
        );
    }

    return (
        <div>
            Not Authorized
        </div>
    );
};