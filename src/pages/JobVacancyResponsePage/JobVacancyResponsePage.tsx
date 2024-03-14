import {JobVacancyResponsesFrame} from "features/JobVacancyResponseList";


export const JobVacancyResponsePage = () => {
    if(typeof __PHPDATA__ !== "undefined"){
        return (
            <div>
                <JobVacancyResponsesFrame user={__PHPDATA__} />
            </div>
        );
    }
    else if (__DEV__) {
        return (
            <div>
                <JobVacancyResponsesFrame user={{id: 555, firstName:"Димас"}} />
            </div>
        );
    }

    return (
        <div>
            Not Authorized
        </div>
    );
};