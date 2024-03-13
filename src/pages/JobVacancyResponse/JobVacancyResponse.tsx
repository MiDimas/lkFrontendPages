import {JobVacancyResponseList} from "features/JobVacancyResponseList";


export const JobVacancyResponse = () => {
    if(typeof __PHPDATA__ !== "undefined"){
        return (
            <div>
                <JobVacancyResponseList user={__PHPDATA__} />
            </div>
        );
    }

    return (
        <div>
            {/*Not Authorized*/}
            <JobVacancyResponseList />
        </div>
    );
};