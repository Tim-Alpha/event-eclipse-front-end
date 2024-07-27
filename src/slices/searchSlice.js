import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the async thunk for fetching results
export const fetchResults = createAsyncThunk(
  'search/fetchResults',
  async ({ query, page }, { dispatch }) => {
    const response = await axios.get(`/search`, {
      params: {
        searchType: 'venue',
        mixed: query,
        page,
        pageSize: 9,
      },
    });
    // Update the results and page in the state
    dispatch(setResults(response.data.venues));
    dispatch(setTotalPages(response.data.maxSize));
    dispatch(setPage(page));
    return response.data.venues;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    results: [],
    query: '',
    page: 1,
    totalPages: 1,
  },
  reducers: {
    setResults: (state, action) => {
      state.results = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchResults.fulfilled, (state, action) => {
      state.results = [...state.results, ...action.payload];
    });
  },
});

export const { setResults, setPage, setTotalPages, setQuery } = searchSlice.actions;

export default searchSlice.reducer;
