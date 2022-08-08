import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTopArtistsShort, getTopArtistsMedium, getTopArtistsLong } from '../api';
import { catchErrors } from '../utils';
import { AiFillInfoCircle } from 'react-icons/ai';
import Loader from './Loader';

const TopArtists = () => {
  const [topArtists, setTopArtists] = useState(null);
  const [activeRange, setActiveRange] = useState('long');

  document.title = "Top Artists";

  const apiCalls = {
    long: getTopArtistsLong(),
    medium: getTopArtistsMedium(),
    short: getTopArtistsShort(),
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getTopArtistsLong();
      setTopArtists(data);
    };
    catchErrors(fetchData());
  }, []);

  const changeRange = async range => {
    const { data } = await apiCalls[range];
    setTopArtists(data);
    setActiveRange(range);
  };

  const setRangeData = range => catchErrors(changeRange(range));

  return (
    <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 px-4 md:mt-0 pt-8 pb-12 md:pt-24'>
      <div className='flex flex-wrap justify-center md:justify-between items-center'>
        <div className='flex flex-wrap text-3xl md:text-2xl text-white font-bold'>
          Top Artists
        </div>
        <div className='flex flex-wrap text-[14px] md:text-[16px] font-sans font-semibold cursor-pointer py-8 md:py-0'>
          <p className= {activeRange === "long" ? 'px-1 md:px-4 underline underline-offset-4 text-white' : 'px-1 md:px-4 hover:underline hover:underline-offset-4 text-[#9B9B9B] hover:text-white'} isActive={activeRange === 'long'} onClick={() => setRangeData('long')}>All Time</p>
          <p className= {activeRange === "medium" ? 'px-1 md:px-4 underline underline-offset-4 text-white' : 'px-1 md:px-4 hover:underline hover:underline-offset-4 text-[#9B9B9B] hover:text-white'} isActive={activeRange === 'medium'} onClick={() => setRangeData('medium')}>Last 6 Months</p>
          <p className= {activeRange === "short" ? 'px-1 md:px-4 underline underline-offset-4 text-white' : 'px-1 md:px-4 hover:underline hover:underline-offset-4 text-[#9B9B9B] hover:text-white'} isActive={activeRange === 'short'} onClick={() => setRangeData('short')}>Last 4 Weeks</p>
        </div>
      </div>
      <div>
        {topArtists ? (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 py-6 md:py-12 gap-8'>
            {topArtists?.items?.map(({ id, external_urls, images, name }, i) => (
              <div className='flex flex-col items-center' key={i}>
                <Link to={`/artist/${id}`} className="relative group">
                  {images?.length && <img src={images[1]?.url} alt="Artist" className="rounded-full w-28 h-28 md:w-48 md:h-48" />}
                  <div className="absolute top-0 left-0 w-full h-0 flex flex-col justify-center items-center rounded-full opacity-0 group-hover:h-full group-hover:opacity-100 bg-blackOverlay">
                    <AiFillInfoCircle size={34} className="text-white" />
                  </div>
                </Link>
                <a href={external_urls?.spotify} target="_blank" rel="noopener noreferrer" className='py-3 text-white text-md text-center hover:underline hover:underline-offset-4'>
                  {name}
                </a>
              </div>
            ))}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  )
}

export default TopArtists;