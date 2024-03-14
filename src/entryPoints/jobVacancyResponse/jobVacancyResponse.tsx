import {createRoot} from "react-dom/client";
import {JobVacancyResponsePage} from "pages/JobVacancyResponsePage/JobVacancyResponsePage";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<JobVacancyResponsePage />);