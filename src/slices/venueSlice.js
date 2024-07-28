import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchVenueByUUID = createAsyncThunk(
  'venue/fetchVenueByUUID',
  async (uuid) => {
    const response = await axios.get(`/venue/get_by_uuid`, {
      params: { uuid }
    });
    return response.data.venue;
  }
);

const venueSlice = createSlice({
  name: 'venue',
  initialState: {
    venue: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearVenue: (state) => {
      state.venue = null;
      state.isLoading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVenueByUUID.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchVenueByUUID.fulfilled, (state, action) => {
        state.venue = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchVenueByUUID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearVenue } = venueSlice.actions;

export default venueSlice.reducer;
