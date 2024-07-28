import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import searchReducer from './slices/searchSlice';
import venueReducer from './slices/venueSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
    venue: venueReducer,
  },
});

export default store;
