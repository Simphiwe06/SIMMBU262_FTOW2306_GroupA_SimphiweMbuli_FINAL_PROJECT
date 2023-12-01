import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../Features/AudioPlayerReducer";

export const store = configureStore({
    reducer: rootReducer
    
})