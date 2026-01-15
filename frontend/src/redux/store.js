import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import {
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage

/* Persist config */
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // ONLY persist auth slice
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
