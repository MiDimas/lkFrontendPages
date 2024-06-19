import {createRoot} from "react-dom/client";
import {ViewerWindowPage} from "pages/ViewerWindowPage/ViewerWindowPage";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<ViewerWindowPage />);