import {createRoot} from "react-dom/client";

import "app/styles/index.css";
import {App} from "app/App";
import {MyTicketsPage} from "pages/MyTicketsPage/MyTicketsPage";

if(__DEV__){
    import("app/styles/reset.css");
}

const container = document.getElementById("root");
if(container) {
    container.classList.add("main");
}
const root = createRoot(container!);
root.render(
    <App>
        <MyTicketsPage />
    </App>
);