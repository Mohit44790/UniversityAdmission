import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App.jsx";
import { store, persistor } from "./redux/store";
import "./index.css";
import { logout } from "./redux/slices/authSlice.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate
  loading={null}
  persistor={persistor}
  onBeforeLift={() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      store.dispatch(logout());
    }
  }}
>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</PersistGate>

    </Provider>
  </StrictMode>
);
