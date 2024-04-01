import {haveRole} from "shared/lib/localStorage/roles";
import {AddResponseManually} from "widgets/AddResponseManually";
import {Page} from "widgets/Page";


export const AddResponseManuallyPage = () => {
    if(typeof __PHPDATA__ !== "undefined"){
        return (
            <Page>
                { haveRole(["1", "8"])
                    ? <AddResponseManually user={__PHPDATA__} />
                    : <div>У вас недостаточно прав</div>
                }
            </Page>
        );
    }
    else if (__DEV__) {
        return (
            <Page>
                { haveRole(["1", "8"])
                    ? <AddResponseManually user={{id: 555, firstName:"Димас"}} />
                    : <div>У вас недостаточно прав</div>
                }

            </Page>
        );
    }

    return (
        <Page>
            <div>Not Authorized</div>
        </Page>
    );
};