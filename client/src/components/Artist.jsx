import React, { useState, useEffect } from 'react';
import { formatWithCommas, catchErrors } from '../utils';
import { getArtist } from '../api';
import { useParams } from 'react-router-dom';
import Loader from './Loader';

const Artist = () => {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);

  document.title = `${artist ? `Top Artists - ${artist?.name}` : 'Top Artists'}`;

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getArtist(artistId);
      setArtist(data);
    };

    catchErrors(fetchData());
  }, [artistId]);

  const capitalizeFirstLowercaseRest = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      {artist ? (
        <div>
          <div className='flex flex-col items-center'>
            <img src={artist.images[0].url} alt="Artist Artwork" className='rounded-full w-48 h-48 md:w-80 md:h-80 pointer-events-none' />
          </div>
          <div className='py-8'>
            <h3 className='text-center font-bold text-3xl md:text-6xl text-white'>{artist.name}</h3>
            <div className='grid grid-cols-3 md:grid-cols-3 gap-2 py-8'>
              <div>
                <h3 className='text-[#509bf5] font-bold text-center text-xl md:text-2xl'>{formatWithCommas(artist.followers.total)}</h3>
                <p className='text-center text-[14px] text-[#9B9B9B] uppercase py-1'>Followers</p>
              </div>
              {artist.genres && (
                <div>
                  <p>
                    {artist.genres.map(genre => (
                      <p key={genre} className="text-[#509bf5] font-bold text-lg md:text-xl text-center">{capitalizeFirstLowercaseRest(genre)}</p>
                    ))}
                  </p>
                  <p className='text-center text-[14px] text-[#9B9B9B] uppercase py-1'>Genres</p>
                </div>
              )}
              {artist.popularity && (
                <div>
                  <h3 className='text-[#509bf5] font-bold text-xl md:text-2xl text-center'>{artist.popularity}%</h3>
                  <p className='text-center text-[14px] text-[#9B9B9B] uppercase py-1'>Popularity</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default Artist;