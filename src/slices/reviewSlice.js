import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchReviewsByVenueUUID = createAsyncThunk(
    'reviews/fetchReviewsByVenueUUID',
    async (uuid) => {
        const response = await axios.get(`/review/get_by_venue_uuid`, {
            params: { uuid }
        });
        return response.data.reviews;
    }
);

const reviewSlice = createSlice({
    name: 'reviews',
    initialState: {
        reviews: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        clearReviews: (state) => {
            state.reviews = [];
            state.isLoading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviewsByVenueUUID.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchReviewsByVenueUUID.fulfilled, (state, action) => {
                state.reviews = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchReviewsByVenueUUID.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export const { clearReviews } = reviewSlice.actions;

export default reviewSlice.reducer;
