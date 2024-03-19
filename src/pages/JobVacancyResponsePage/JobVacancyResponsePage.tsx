import {JobVacancyResponsesFrame} from "features/JobVacancyResponseList";

export const JobVacancyResponsePage = () => {
    if(typeof __PHPDATA__ !== "undefined"){
        return (
            <>
                <JobVacancyResponsesFrame user={__PHPDATA__} />
            </>
        );
    }
    else if (__DEV__) {
        return (
            <>
                <JobVacancyResponsesFrame user={{id: 555, firstName:"Димас"}} />
            </>
        );
    }

    return (
        <div>
            Not Authorized
        </div>
    );
};