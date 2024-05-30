import {haveRole} from "shared/lib/localStorage/roles";
import {ResponsesStatisticTable} from "features/ResponsesStatisticTable";
import {Page} from "widgets/Page";
import {DateSelector} from "entities/Date";

export const ResponsesStatisticPage = () => {
    if(typeof __PHPDATA__ !== "undefined"){
        return (
            <Page>
                { haveRole(["10"])
                    ? <ResponsesStatisticTable user={__PHPDATA__} />
                    : <div>У вас недостаточно прав</div>
                }
            </Page>
        );
    }
    else if (__DEV__) {
        return (
            <Page>
                { haveRole(["10"])
                    ? <ResponsesStatisticTable user={{id: 555, firstName:"Димас"}} />
                    : <div>У вас недостаточно прав</div>
                }

            </Page>
        );
    }

    return (
        <div>
            Not Authorized
        </div>
    );
};