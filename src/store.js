import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import searchReducer from './slices/searchSlice';
import venueReducer from './slices/venueSlice';
import reviewReducer from './slices/reviewSlice'; 
import eventsReducer from './slices/eventsSlice'; 

const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
    venue: venueReducer,
    reviews: reviewReducer,
    events: eventsReducer,
  },
});

export default store;
