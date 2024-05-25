import { AppDispatch } from '@src/redux/Store';
import { fetchVideoBlob } from '@src/redux/VideoSlice';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const MediaPreloader: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(
      fetchVideoBlob({
        url: 'https://static.gyechunsik.site/media/mainpage/chunpeltown-main-concert-720.mp4',
        type: 'concert',
      }),
    );
    dispatch(
      fetchVideoBlob({
        url: 'https://static.gyechunsik.site/media/mainpage/chunpeltown-main-football-720.mp4',
        type: 'football',
      }),
    );
  }, [dispatch]);

  return <></>;
};

export default MediaPreloader;
