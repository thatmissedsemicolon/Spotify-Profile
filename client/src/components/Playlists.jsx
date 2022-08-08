import React, { useState, useEffect } from 'react';
import { getPlaylists } from '../api';
import { catchErrors } from '../utils';
import { FaMusic } from 'react-icons/fa';
import { AiFillInfoCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Loader from './Loader';

const Playlists = () => {
  const [playlists, setPlaylists] = useState(null);

  document.title = "Playlists";

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getPlaylists();
      setPlaylists(data);
    };
    catchErrors(fetchData());
  }, []);

  return (
    <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 px-4 md:mt-0 pt-8 pb-12 md:pt-24'>
      <h2 className='text-2xl font-bold text-white text-center md:text-start'>Your Playlists</h2>
      <div className='py-8'>
        <div>
          {playlists ? (
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5'>
              {playlists.items.map(({ id, images, name, tracks }, i) => (
                <div key={i}>
                  <Link to={id} className="group relative">
                    {images.length ? (
                      <>
                        <img src={images[0].url} alt="Album Art" />
                        <div className="absolute top-0 left-0 w-full h-0 flex flex-col justify-center items-center opacity-0 group-hover:h-full group-hover:opacity-100 bg-lightOverlay transition-shadow"></div>
                      </>
                    ) : (
                      <div className='absolute top-0 left-0 w-full h-0 flex flex-col justify-center items-center opacity-0 group-hover:h-full group-hover:opacity-100 bg-lightOverlay transition-shadow'>
                        <FaMusic className='w-[50px] h-[50px]' />
                      </div>
                    )}
                    <div className="absolute top-0 left-0 w-full h-0 flex flex-col justify-center items-center opacity-0 group-hover:h-full group-hover:opacity-100 bg-blackOverlay">
                      <AiFillInfoCircle size={34} className="text-white" />
                    </div>
                  </Link>
                  <div className='text-center py-4'>
                    <Link to={id} className="text-white font-semibold hover:underline hover:underline-offset-4">{name}</Link>
                    <p className='text-[#9B9B9B] text-[12px] uppercase m-[5px] font-semibold tracking-[1px]'>{tracks.total} Tracks</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  )
}

export default Playlists;