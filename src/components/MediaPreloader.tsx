import MediaUrls from '@src/class/MediaUrls';
import { AppDispatch } from '@src/redux/Store';
import { fetchVideoBlob } from '@src/redux/VideoSlice';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const MediaPreloader: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // dispatch(
    //   fetchVideoBlob({
    //     url: MediaUrls.concertVideoPreview,
    //     type: 'concert',
    //   }),
    // );
    // dispatch(
    //   fetchVideoBlob({
    //     url: MediaUrls.footballVideoPreview,
    //     type: 'football',
    //   }),
    // );
  }, [dispatch]);

  return (
    <>
      <video
        preload='auto'
        autoPlay
        muted
        width={1}
        // style={{ zIndex: -99, background: 'none', position: 'absolute' }}
        style={{ display: 'none' }}
      >
        <source src={MediaUrls.concertVideoPreview}></source>
      </video>
      <video
        preload='auto'
        autoPlay
        muted
        width={1}
        // style={{ zIndex: -99, background: 'none', position: 'absolute' }}
        style={{ display: 'none' }}
      >
        <source src={MediaUrls.footballVideoPreview}></source>
      </video>
    </>
  );
};

export default MediaPreloader;
