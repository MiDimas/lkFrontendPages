import {createRoot} from "react-dom/client";
import {JobVacancyResponse} from "pages/JobVacancyResponse/JobVacancyResponse";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<JobVacancyResponse />);