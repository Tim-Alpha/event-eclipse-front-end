import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import searchReducer from './slices/searchSlice';
import venueReducer from './slices/venueSlice';
import reviewReducer from './slices/reviewSlice'; 

const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
    venue: venueReducer,
    reviews: reviewReducer,
  },
});

export default store;
