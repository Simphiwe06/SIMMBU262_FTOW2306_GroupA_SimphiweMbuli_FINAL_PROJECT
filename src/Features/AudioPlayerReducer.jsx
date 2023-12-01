import { combineReducers } from "@reduxjs/toolkit";
import audioPlayerReducer from './PlayerSlice'

const rootReducer = combineReducers({
    audioPlayer: audioPlayerReducer
});

export default rootReducer