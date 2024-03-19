import {createRoot} from "react-dom/client";
import {JobVacancyResponsePage} from "pages/JobVacancyResponsePage/JobVacancyResponsePage";

import "app/styles/index.css";
if(__DEV__){
    import("app/styles/reset.css");
}

const container = document.getElementById("root");
if(container) {
    container.classList.add("main");
}
const root = createRoot(container!);
root.render(<JobVacancyResponsePage />);