import React, { useState, useEffect } from 'react';
import { getPlaylist, getAudioFeaturesForTracks } from '../api';
import { catchErrors } from '../utils';
import TrackItem from './TrackItem';
import FeatureChart from './FeatureChart';
import { Link, useParams } from 'react-router-dom';
import Loader from './Loader';

const Playlist = () => {
  const { playlistId } = useParams();

  const [playlist, setPlaylist] = useState(null);
  const [audioFeatures, setAudioFeatures] = useState(null);

  document.title = `${playlist ? `Playlist - ${playlist?.name}` : 'Playlist'}`;

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getPlaylist(playlistId);
      setPlaylist(data);
    };
    catchErrors(fetchData());
  }, [playlistId]);

  useEffect(() => {
    const fetchData = async () => {
      if (playlist) {
        const { data } = await getAudioFeaturesForTracks(playlist.tracks.items);
        setAudioFeatures(data);
      }
    };
    catchErrors(fetchData());
  }, [playlist]);

  return (
    <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 px-4 md:mt-0 pt-8 pb-12 md:pt-24'>
      {playlist ? (
        <div>
          <div className='block lg:flex'>
            <div className='w-[100%] min-w-auto lg:w-[30%] text-center md:min-w-[200px]'>
              {playlist?.images?.length && (
                <div className='flex flex-col justify-center items-center'>
                  <img src={playlist?.images[0]?.url} alt="Album Art" className='w-[100%] max-w-[300px] pointer-events-none' />
                </div>
              )}

              <a href={playlist?.external_urls?.spotify} target="_blank" rel="noopener noreferrer">
                <p className='mt-[20px] font-[700] text-[28px] text-white'>{playlist?.name}</p>
              </a>

              <p className='text-[14px] text-[#9B9B9B]'>By {playlist?.owner?.display_name}</p>

              {playlist?.description && (
                <p className='text-[14px] text-[#9B9B9B]' dangerouslySetInnerHTML={{ __html: playlist?.description }} />
              )}

              <p className='text-[14px] text-white mt-[20px]'>{playlist?.tracks?.total} Tracks</p>

              <div className='flex flex-col justify-center items-center py-[40px] text-center'>
                <Link to={`/recommendations/${playlist?.id}`} className="px-6 py-2 bg-[#1DB954] text-sm rounded-full text-white font-bold uppercase">Get Recommendations</Link>
              </div>

              {audioFeatures && (
                <FeatureChart features={audioFeatures?.audio_features} type="y" />
              )}
            </div>
            <div className='ml-0 lg:ml-[50px]'>
              <ul className='mb-10 md:mb-4'>
                {playlist?.tracks && playlist?.tracks?.items?.map(({ track }, i) => <TrackItem track={track} key={i} />)}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default Playlist;