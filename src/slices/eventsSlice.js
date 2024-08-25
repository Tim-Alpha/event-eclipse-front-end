import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

export const fetchEventsByVenueUUID = createAsyncThunk(
  'events/fetchEventsByVenueUUID',
  async (uuid) => {
    // const response = await axios.get(`/event/venue/${uuid}`);
    // return response.data.events;
  }
);

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearEvents: (state) => {
      state.events = [];
      state.isLoading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventsByVenueUUID.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEventsByVenueUUID.fulfilled, (state, action) => {
        state.events = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchEventsByVenueUUID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearEvents } = eventsSlice.actions;

export default eventsSlice.reducer;
