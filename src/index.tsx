import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <Provider store={store}>
    <ToastContainer />
    <App />
  </Provider>
);
