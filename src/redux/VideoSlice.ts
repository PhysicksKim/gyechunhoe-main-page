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

/**
 * @deprecated
 * 비디오를 미리 로딩하기 위해 Blob URL 을 사용하는 Redux Slice 입니다.
 * Blob URL 을 통해 미리 로딩하는 것은 유용하지만, 동영상 파일 크기가 커지면 Progressive MP4 보다 초기 로딩 시간이 비교적 더 길어지는 단점이 있습니다.
 * 따라서 Progressive MP4 를 사용하면서도 비디오 화면을 숨겨두는 식으로 미리 로딩하는 방법을 사용하는 것이 더 효율적입니다.
 */
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
