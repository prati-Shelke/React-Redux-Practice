import { createStore,applyMiddleware} from "redux";
import rootReducer from "../reducers/combineReducers"
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore,persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

const persistConfig={
     key:'main',
     storage,
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = createStore(persistedReducer ,
     composeWithDevTools(applyMiddleware(thunk))
     )

export const Persistor = persistStore(store)

