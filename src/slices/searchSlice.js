import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchResults = createAsyncThunk(
  'search/fetchResults',
  async ({ query, page }) => {
    console.log(page)
    const response = await axios.get(`/search`, {
      params: {
        searchType: 'venue',
        mixed: query,
        page,
        pageSize: 9,
      },
    });
    return {
      results: response.data.venues,
      totalPages: response.data.maxSize,
      currentPage: page,
    };
  }
);

export const fetchDefaultResults = createAsyncThunk(
  'search/fetchDefaultResults',
  async (_, { dispatch }) => {
    const defaultQueries = ['ve', 'you', 'night', 'star'];
    const randomQuery = defaultQueries[Math.floor(Math.random() * defaultQueries.length)];
    dispatch(setQuery(randomQuery));
    const response = await axios.get(`/search`, {
      params: {
        searchType: 'venue',
        mixed: randomQuery,
        page: 1,
        pageSize: 9,
      },
    });
    dispatch(setResults(response.data.venues));
    dispatch(setTotalPages(response.data.maxSize));
    dispatch(setPage(1));
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
    isLoading: false,
    isLoadingMore: false,
    noMoreResults: false,
  },
  reducers: {
    setResults: (state, action) => {
      state.results = action.payload;
    },
    appendResults: (state, action) => {
      state.results = [...state.results, ...action.payload];
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
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setLoadingMore: (state, action) => {
      state.isLoadingMore = action.payload;
    },
    setNoMoreResults: (state, action) => {
      state.noMoreResults = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchResults.pending, (state, action) => {
      if (action.meta.arg.page === 1) {
        state.isLoading = true;
      } else {
        state.isLoadingMore = true;
      }
    });
    builder.addCase(fetchResults.fulfilled, (state, action) => {
      if (action.meta.arg.page === 1) {
        state.results = action.payload.results;
        state.isLoading = false;
      } else {
        state.results = [...state.results, ...action.payload.results];
        state.isLoadingMore = false;
      }
      state.totalPages = action.payload.totalPages;
      state.page = action.payload.currentPage;
      if (action.meta.arg.page >= action.payload.totalPages) {
        state.noMoreResults = true;
      }
    });
    builder.addCase(fetchResults.rejected, (state, action) => {
      if (action.meta.arg.page === 1) {
        state.isLoading = false;
      } else {
        state.isLoadingMore = false;
      }
    });
    builder.addCase(fetchDefaultResults.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDefaultResults.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(fetchDefaultResults.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { setResults, appendResults, setPage, setTotalPages, setQuery, setLoading, setLoadingMore, setNoMoreResults } = searchSlice.actions;

export default searchSlice.reducer;
