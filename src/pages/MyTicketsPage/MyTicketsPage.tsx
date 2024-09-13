import {MyTicketsFrame} from "features/MyTickets";
import {haveRole} from "shared/lib/localStorage/roles";
import {Page} from "widgets/Page";

export const MyTicketsPage = () => {
    if(typeof __PHPDATA__ !== "undefined"){
        return (
            <Page>
                { haveRole(["18", "16", "1"])
                    ? <MyTicketsFrame user={__PHPDATA__}/>
                    : <div>У вас недостаточно прав</div>
                }
            </Page>
        );
    }
    // else if (__DEV__) {
    //     return (
    //         <Page>
    //             <MyTicketsFrame user={{id: 427, firstName:"Димас"}}/>
    //         </Page>
    //     );
    // }

    return (
        <div>
            Not Authorized
        </div>
    );
};