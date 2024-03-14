import {JobVacancyResponseList} from "features/JobVacancyResponseList";


export const JobVacancyResponsePage = () => {
    if(typeof __PHPDATA__ !== "undefined"){
        return (
            <div>
                <JobVacancyResponseList user={__PHPDATA__} />
            </div>
        );
    }
    else if (__DEV__) {
        return (
            <div>
                <JobVacancyResponseList user={{id: 555, firstName:"Димас"}} />
            </div>
        );
    }

    return (
        <div>
            Not Authorized
        </div>
    );
};