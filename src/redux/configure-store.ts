import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';
import { reducer as registrationReducer } from './reducers/registration.slice';
import { reducer as repeatRequestsSlice } from './reducers/repeatRequests.slice';
import { reducer as feedback } from './reducers/feedback.slice';
import { api } from './apiRtk/api';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
});

const reducers = combineReducers({
    router: routerReducer,
    registration: registrationReducer,
    repeatRequests: repeatRequestsSlice,
    feedback: feedback,
    [api.reducerPath]: api.reducer,
});

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(routerMiddleware).concat(api.middleware),
});

export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
