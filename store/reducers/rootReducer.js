import { authReducer } from "./authReducer";
import { builderReducer } from "./builderReducer";
import { pollResultsReducer } from "./pollResultsReducer";
import { loadingReducer, errorReducer } from "./utilsReducer";
import { accountReducer } from "./accountReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  summary: builderReducer,
  auth: authReducer,
  loading: loadingReducer,
  error: errorReducer,
  pollResults: pollResultsReducer,
  account: accountReducer
});

export { rootReducer };
