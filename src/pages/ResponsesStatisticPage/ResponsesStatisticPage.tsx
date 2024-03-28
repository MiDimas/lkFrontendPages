import {haveRole} from "shared/lib/localStorage/roles";
import {ResponsesStatisticTable} from "features/ResponsesStatisticTable";

export const ResponsesStatisticPage = () => {
    if(typeof __PHPDATA__ !== "undefined"){
        return (
            <>
                { haveRole(["10"])
                    ? <ResponsesStatisticTable user={__PHPDATA__} />
                    : <div>У вас недостаточно прав</div>
                }
            </>
        );
    }
    else if (__DEV__) {
        return (
            <>
                { haveRole(["10"])
                    ? <ResponsesStatisticTable user={{id: 555, firstName:"Димас"}} />
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