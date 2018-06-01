import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import RecordsReducer from "./reducer_records";

const rootReducer = combineReducers({
    records: RecordsReducer,
    form: formReducer
});

export default rootReducer;
