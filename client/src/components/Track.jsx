import React, { useState, useEffect } from 'react';
import { formatDuration, getYear, parsePitchClass, catchErrors } from '../utils';
import { getTrackInfo } from '../api';
import FeatureChart from './FeatureChart';
import { useParams } from 'react-router-dom';
import Loader from './Loader';

const Track = () => {
  const { trackId } = useParams();

  const [track, setTrack] = useState(null);
  const [audioAnalysis, setAudioAnalysis] = useState(null);
  const [audioFeatures, setAudioFeatures] = useState(null);

  document.title = `${track ? `Top Tracks - ${track?.name}` : 'Top Tracks'}`;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTrackInfo(trackId);
      setTrack(data.track);
      setAudioAnalysis(data.audioAnalysis);
      setAudioFeatures(data.audioFeatures);
    };
    catchErrors(fetchData());
  }, [trackId]);

  return (
    <>
      {track ? (
        <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 px-4 md:mt-0 pt-8 pb-12 md:pt-24'>
          <div className='flex flex-wrap gap-8 justify-center items-center md:items-start md:justify-start'>
            <img src={track.album.images[0].url} alt="Album Artwork" className='w-[200px] md:w-[250px] pointer-events-none' />
            <div>
              <p className='text-[30px] md:text-[42px] text-white font-bold text-center md:text-start'>{track.name}</p>
              <div className='text-center md:text-start'>
                {track.artists && track.artists.map(({ name }, i) => (
                  <span className='text-[18px] md:text-[24px] text-[#b3b3b3] font-bold' key={i}>
                    {name}
                    {track.artists.length > 0 && i === track.artists.length - 1 ? '' : ','}
                    &nbsp;
                  </span>
                ))}
                <div className='text-[16px] font-semibold text-[#9B9B9B] py-2'>
                  <a
                    href={track.album.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer">
                    {track.album.name}
                  </a>{' '}
                  &middot; {getYear(track.album.release_date)}
                </div>
                <div className='py-6'>
                  <a
                    href={track.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-[#1DB954] text-sm rounded-full text-white font-bold uppercase">
                    Play on Spotify
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className='py-[30px] md:py-[60px]'>
          {audioFeatures && audioAnalysis && (
            <div className='grid grid-cols-3 md:grid-cols-5 text-[#b3b3b3] font-bold text-center'>
              <div className='py-2 border-[1px] border-[#404040]'>
                <p className='text-[24px] md:text-[30px]'>{formatDuration(audioFeatures.duration_ms)}</p>
                <p className='text-[12px]'>Duration</p>
              </div>
              <div className='py-2 border-[1px] border-[#404040]'>
                <p className='text-[24px] md:text-[30px]'>{parsePitchClass(audioFeatures.key)}</p>
                <p className='text-[12px]'>Key</p>
              </div>
              <div className='py-2 border-[1px] border-[#404040]'>
                <p className='text-[24px] md:text-[30px]'>{audioFeatures.mode === 1 ? 'Major' : 'Minor'}</p>
                <p className='text-[12px]'>Modality</p>
              </div>
              <div className='py-2 border-[1px] border-[#404040]'>
                <p className='text-[24px] md:text-[30px]'>{audioFeatures.time_signature}</p>
                <p className='text-[12px]'>Time Signature</p>
              </div>
              <div className='py-2 border-[1px] border-[#404040]'>
                <p className='text-[24px] md:text-[30px]'>{Math.round(audioFeatures.tempo)}</p>
                <p className='text-[12px]'>Tempo (BPM)</p>
              </div>
              <div className='py-2 border-[1px] border-[#404040]'>
                <p className='text-[24px] md:text-[30px]'>{track.popularity}%</p>
                <p className='text-[12px]'>Popularity</p>
              </div>
              <div className='py-2 border-[1px] border-[#404040]'>
                <p className='text-[24px] md:text-[30px]'>{audioAnalysis.bars.length}</p>
                <p className='text-[12px]'>Bars</p>
              </div>
              <div className='py-2 border-[1px] border-[#404040]'>
                <p className='text-[24px] md:text-[30px]'>{audioAnalysis.beats.length}</p>
                <p className='text-[12px]'>Beats</p>
              </div>
              <div className='py-2 border-[1px] border-[#404040]'>
                <p className='text-[24px] md:text-[30px]'>{audioAnalysis.sections.length}</p>
                <p className='text-[12px]'>Sections</p>
              </div>
              <div className='py-2 border-[1px] border-[#404040]'>
                <p className='text-[24px] md:text-[30px]'>{audioAnalysis.segments.length}</p>
                <p className='text-[12px]'>Segments</p>
              </div>
            </div>
          )}
          </div>
          <div className="flex item-center justify-center px-2 mb-[30px] md:px-0 md:mb-[0px]">
            <FeatureChart features={audioFeatures} type="" />
          </div>
          <a
            href="https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/"
            target="_blank"
            rel="noopener noreferrer"
            className='flex justify-center items-center m-[20px] text-[#b3b3b3]'>
            Full Description of Audio Features
          </a>
        </div>
      ):(
        <Loader />
      )}
    </>
  )
}

export default Track;