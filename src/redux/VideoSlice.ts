import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface VideoState {
  concertBlobUrl: string | null;
  footballBlobUrl: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: VideoState = {
  concertBlobUrl: null,
  footballBlobUrl: null,
  status: 'idle',
  error: null,
};

interface FetchVideoBlobArgs {
  url: string;
  type: 'concert' | 'football';
}

export const fetchVideoBlob = createAsyncThunk<
  FetchVideoBlobArgs,
  FetchVideoBlobArgs
>('videos/fetchVideoBlob', async ({ url, type }) => {
  const response = await axios.get(url, { responseType: 'blob' });
  const blob = new Blob([response.data], { type: 'video/mp4' });
  return { url: URL.createObjectURL(blob), type };
});

const videoSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideoBlob.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchVideoBlob.fulfilled,
        (state, action: PayloadAction<FetchVideoBlobArgs>) => {
          console.log('fulfilled');
          console.log(action.payload);
          const { url, type } = action.payload;
          if (type === 'concert') {
            state.concertBlobUrl = url;
          } else if (type === 'football') {
            state.footballBlobUrl = url;
          }
          state.status = 'succeeded';
        },
      )
      .addCase(fetchVideoBlob.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to load video';
      });
  },
});

export default videoSlice.reducer;
