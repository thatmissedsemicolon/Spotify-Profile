import React, { useState, useEffect } from 'react';
import { getRecentlyPlayed } from '../api';
import { catchErrors } from '../utils';
import TrackItem from './TrackItem';
import Loader from './Loader';

const RecentlyPlayed = () => {
  const [recentlyPlayed, setRecentlyPlayed] = useState(null);

  document.title = "Recently Played";

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getRecentlyPlayed();
      setRecentlyPlayed(data);
    };
    catchErrors(fetchData());
  }, []);

  return (
    <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 px-4 md:mt-0 pt-8 pb-12 md:pt-24'>
      <h2 className='text-2xl font-bold text-white text-center md:text-start'>Recently Played Tracks</h2>
      <ul className='mb-20 md:mb-8 py-0 md:py-8'>
        {recentlyPlayed ? (
          recentlyPlayed.items.map(({ track }, i) => <TrackItem track={track} key={i} />)
        ) : (
          <Loader />
        )}
      </ul>
    </div>
  )
}

export default RecentlyPlayed;