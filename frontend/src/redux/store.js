import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { persistReducer, persistStore } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

// ===============================
// Persist Config
// ===============================
const persistConfig = {
  key: "root",
  storage: storageSession,   // sessionStorage
  whitelist: ["auth"],       // persist ONLY auth slice
};

// ===============================
// Persisted Reducer
// ===============================
const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

// ===============================
// Store
// ===============================
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // redux-persist actions
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
  devTools: import.meta.env.DEV, // Vite-safe
});

// ===============================
// Persistor
// ===============================
export const persistor = persistStore(store);
