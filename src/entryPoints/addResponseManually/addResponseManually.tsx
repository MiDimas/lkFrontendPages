import {createRoot} from "react-dom/client";
import {AddResponseManuallyPage} from "pages/AddResponseManuallyPage/AddResponseManuallyPage";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<AddResponseManuallyPage />);