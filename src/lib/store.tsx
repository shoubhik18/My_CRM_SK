import { combineReducers, configureStore } from '@reduxjs/toolkit'
import leadSlice from './features/lead/leadSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authSlice from './features/auth/authSlice';
import taskSlice from './features/task/taskSlice';
import navbarSlice from './features/navbar/navbarSlice';
import coursesSlice from './features/courses/coursesSlice';
import homeSlice from './features/home/homeSlice';
import calendarSlice from './features/calender/calenderSlice';
import batchSlice from './features/batch/batchSlice';
import trainerSlice from './features/trainer/trainerSlice';
import campaignSlice from './features/campaign/campaignSlice';
import learnerSlice from './features/learner/learnerSlice';

export const makeStore = () => {
    const rootReducer = combineReducers({
        auth: authSlice,
        lead: leadSlice,
        task: taskSlice,
        nav: navbarSlice,
        courses: coursesSlice,
        home: homeSlice,
        calendar: calendarSlice,
        batch: batchSlice,
        trainer: trainerSlice,
        campaign: campaignSlice,
        learner: learnerSlice,
    });

    return configureStore({
        reducer: rootReducer,
    });
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore = () => useAppSelector((state) => state);