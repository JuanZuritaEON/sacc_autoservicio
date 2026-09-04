import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { apiSlice, appReducer } from './Slices';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

const reducers = {
  [apiSlice.reducerPath]: apiSlice.reducer,
  app: appReducer
};

export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }).concat(apiSlice.middleware)
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector