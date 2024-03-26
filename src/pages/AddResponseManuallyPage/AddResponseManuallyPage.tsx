import {haveRole} from "shared/lib/localStorage/roles";
import {AddResponseManually} from "widgets/AddResponseManually";



export const AddResponseManuallyPage = () => {
    if(typeof __PHPDATA__ !== "undefined"){
        return (
            <>
                { haveRole(["9", "10"])
                    ? <>
                        <AddResponseManually user={__PHPDATA__} />

                    </>
                    : <div>У вас недостаточно прав</div>
                }
            </>
        );
    }
    else if (__DEV__) {
        return (
            <>
                { haveRole(["9", "10"])
                    ? <AddResponseManually user={{id: 555, firstName:"Димас"}} />
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