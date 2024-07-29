import "./index.css";
import '@smastrom/react-rating/style.css'
import 'react-lazy-load-image-component/src/effects/blur.css';
import App from "./App";
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<App />);
