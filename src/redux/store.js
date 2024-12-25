import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "@/redux/rootReducer";

const initialState = {};
//const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: rootReducer,
    //RootReducer : persistedReducer,
    initialState: initialState,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware)=>{
        return getDefaultMiddleware({serializableCheck:false})
    }
})

//export const persistor = persistStore(store)

