import {haveRole} from "shared/lib/localStorage/roles";
import {AddResponseManually} from "widgets/AddResponseManually";
import cls from "./AddResponseManuallyPage.module.css";


export const AddResponseManuallyPage = () => {
    if(typeof __PHPDATA__ !== "undefined"){
        return (
            <>
                { haveRole(["9", "10"])
                    ? <div className={cls.page}>
                        <AddResponseManually user={__PHPDATA__} />

                    </div>
                    : <div>У вас недостаточно прав</div>
                }
            </>
        );
    }
    else if (__DEV__) {
        return (
            <>
                { haveRole(["9", "10"])
                    ? (
                        <div className={cls.page}>
                            <AddResponseManually user={{id: 555, firstName:"Димас"}} />
                        </div>
                    )
                    : <div>У вас недостаточно прав</div>
                }

            </>
        );
    }

    return (
        <div className={cls.page}>
            Not Authorized
        </div>
    );
};