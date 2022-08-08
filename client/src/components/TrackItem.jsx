import React from 'react';
import { Link } from 'react-router-dom';
import { formatDuration } from '../utils';
import { AiFillInfoCircle } from 'react-icons/ai';

const TrackItem = ({ track }) => {
  return (
    <li className='max-w-7xl mx-auto sm:px-6 md:px-0 pt-[30px]'>
      <Link to={`/track/${track?.id}`} className="flex flex-wrap items-center justify-between relative group">
        <div className='flex flex-wrap gap-5'>
          <div className='relative group'>
            {track?.album?.images?.length && <img src={track?.album?.images[2].url} alt="Album Artwork" className='w-12 md:w-14' />}
            <div className="absolute top-0 left-0 w-full h-0 flex flex-col justify-center items-center opacity-0 group-hover:h-full group-hover:opacity-100 bg-blackOverlay">
              <AiFillInfoCircle size={20} className="text-white" />
            </div>
          </div>
          <div>
            {track?.name && <p className='text-[12px] md:text-[14px] text-white font-semibold hover:underline hover:underline-offset-4 truncate overflow-hidden w-[150px] md:w-[250px] lg:w-[300px] xl:w-[430px]'>{track?.name}</p>}
            {track?.artists && track?.album && (
            <p className='text-[#9B9B9B] text-[12px] md:text-[14px] truncate overflow-hidden w-[150px] md:w-[500px] lg:w-[250px] xl:w-[400px]'>
              {track?.artists &&
                track?.artists?.map(({ name }, i) => (
                <span key={i}>
                  {name}
                  {track?.artists?.length > 0 && i === track?.artists?.length - 1 ? '' : ','}&nbsp;
                </span>
                ))}
                &nbsp;&middot;&nbsp;&nbsp;
              {track?.album?.name}
            </p>
            )}
          </div>
        </div>
        <div>
          <p className='flex flex-wrap justify-between text-[#9B9B9B] text-[12px] md:text-[14px]'>
            {track?.duration_ms && <div>{formatDuration(track?.duration_ms)}</div>}
          </p>
        </div>
      </Link>
    </li>
  )
}

export default TrackItem;