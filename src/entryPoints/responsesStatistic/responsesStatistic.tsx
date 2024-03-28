import {createRoot} from "react-dom/client";

import "app/styles/index.css";
import {ResponsesStatisticPage} from "pages/ResponsesStatisticPage/ResponsesStatisticPage";

if(__DEV__){
    import("app/styles/reset.css");
}

const container = document.getElementById("root");
if(container) {
    container.classList.add("main");
}
const root = createRoot(container!);
root.render(<ResponsesStatisticPage />);