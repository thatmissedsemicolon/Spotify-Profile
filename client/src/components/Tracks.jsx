import React, { useState, useEffect } from 'react';
import { getTopTracksShort, getTopTracksMedium, getTopTracksLong } from '../api';
import { catchErrors } from '../utils';
import TrackItem from './TrackItem';
import Loader from './Loader';

const Tracks = () => {
  const [topTracks, setTopTracks] = useState(null);
  const [activeRange, setActiveRange] = useState('long');

  document.title = "Top Tracks";
  
  const apiCalls = {
    long: getTopTracksLong(),
    medium: getTopTracksMedium(),
    short: getTopTracksShort(),
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getTopTracksLong();
      setTopTracks(data);
    };
    catchErrors(fetchData());
  }, []);

  const changeRange = async range => {
    const { data } = await apiCalls[range];
    setTopTracks(data);
    setActiveRange(range);
  };

  const setRangeData = range => catchErrors(changeRange(range));

  return (
    <>
      <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 px-4 md:mt-0 pt-8 pb-12 md:pt-24'>
        <div className='flex flex-wrap justify-center md:justify-between items-center'>
          <div className='flex flex-wrap text-3xl md:text-2xl text-white font-bold'>
            Top Tracks
          </div>
          <div className='flex flex-wrap text-[14px] md:text-[16px] font-sans font-semibold cursor-pointer py-8 md:py-0'>
            <p className= {activeRange === "long" ? 'px-1 md:px-4 underline underline-offset-4 text-white' : 'px-1 md:px-4 hover:underline hover:underline-offset-4 text-[#9B9B9B] hover:text-white'} isActive={activeRange === 'long'} onClick={() => setRangeData('long')}>All Time</p>
            <p className= {activeRange === "medium" ? 'px-1 md:px-4 underline underline-offset-4 text-white' : 'px-1 md:px-4 hover:underline hover:underline-offset-4 text-[#9B9B9B] hover:text-white'} isActive={activeRange === 'medium'} onClick={() => setRangeData('medium')}>Last 6 Months</p>
            <p className= {activeRange === "short" ? 'px-1 md:px-4 underline underline-offset-4 text-white' : 'px-1 md:px-4 hover:underline hover:underline-offset-4 text-[#9B9B9B] hover:text-white'} isActive={activeRange === 'short'} onClick={() => setRangeData('short')}>Last 4 Weeks</p>
          </div>
        </div>
        <ul className='mb-20 md:mb-8 py-0 md:py-8'>
          {topTracks ? (
            topTracks.items.map((track, i) => <TrackItem track={track} key={i} />)
          ) : (
            <Loader />
          )}
        </ul>
      </div>
    </>
  )
}

export default Tracks;
