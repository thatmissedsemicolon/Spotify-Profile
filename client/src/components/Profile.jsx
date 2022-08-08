import React, { useState, useEffect } from 'react';
import { getUserInfo } from '../api';
import { useNavigate, Link } from 'react-router-dom';
import { AiFillInfoCircle } from 'react-icons/ai';
import TrackItem from './TrackItem';
import { catchErrors } from '../utils';
import Loader from './Loader';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [followedArtists, setFollowedArtists] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [topTracks, setTopTracks] = useState(null);
  const [nowPlaying, setNowPlaying] = useState(null);
  const navigate = useNavigate();

  document.title = `${nowPlaying? `Now Playing - ${nowPlaying?.item?.name} by ${nowPlaying?.item?.artists?.map((index) => index?.name).join(', ')}` : 'Spotify Profile'}`;

  const logout = () => {
    window.localStorage.removeItem('spotify_token_timestamp');
    window.localStorage.removeItem('spotify_access_token');
    window.localStorage.removeItem('spotify_refresh_token');
    navigate('/');
    window.location.reload();
  };

  useEffect(() => {
    const fetchData = async () => {
      const { user, followedArtists, playlists, nowPlaying, topArtists, topTracks } = await getUserInfo();
      setUser(user);
      setFollowedArtists(followedArtists);
      setPlaylists(playlists);
      setNowPlaying(nowPlaying);
      setTopArtists(topArtists);
      setTopTracks(topTracks);
    };

    catchErrors(fetchData());
  }, []);
  
  const totalPlaylists = playlists ? playlists.total : 0;

  return (
    <>
      {user ? (
        <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 px-4 md:mt-0 pt-8 pb-12 md:pt-24'>
          <div className='flex flex-col items-center justify-center'>
            <div>
              {user.images.length > 0 ? (
                <img src={user.images[0].url} alt="avatar" className='rounded-full w-[150px] h-[150px] md:w-[180px] md:h-[180px] pointer-events-none' />
              ):(
                <img src="" alt="avatar" className='rounded-full w-[150px] h-[150px] md:w-[180px] md:h-[180px] pointer-events-none' />
              )}
            </div>
            <div> 
              <a href={user.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                <h1 className='text-3xl md:text-5xl text-center font-bold text-white hover:text-[#1ed760]'>{user.display_name}</h1>
              </a>
            </div>
            <div className='grid grid-cols-3 gap-10 justify-between py-4 md:py-8'>
              <div className='flex flex-col text-center'>
                <p className='text-[#1DB954] text-xl md:text-2xl font-bold'>{user.followers.total}</p>
                <p className='text-[#9B9B9B] text-sm md:text-md uppercase font-medium'>Followers</p>
              </div>
              {followedArtists && (
                <div className='flex flex-col text-center'>
                  <p className='text-[#1DB954] text-xl md:text-2xl font-mono font-bold'>{followedArtists.artists.items.length}</p>
                  <p className='text-[#9B9B9B] text-sm md:text-md uppercase font-medium'>Following</p>
                </div>
              )}
              {totalPlaylists && (
                <div className='flex flex-col text-center'>
                  <p className='text-[#1DB954] text-xl md:text-2xl font-mono font-bold'>{totalPlaylists}</p>
                  <p className='text-[#9B9B9B] text-sm md:text-md uppercase font-medium'>Playlists</p>
                </div>
              )}
            </div>
            <div className='flex py-6 gap-2 md:gap-5 text-center'>
              {nowPlaying && nowPlaying.is_playing && (
                <Link to={`/track/${nowPlaying.item.id}`} className="bg-[#1DB954] rounded-full py-3 w-[130px] uppercase text-white font-bold text-sm hover:bg-[#1ed760]">Now Playing</Link>
              )}
              <button onClick={logout} className="border-2 border-white rounded-full px-2 py-2 w-[130px] uppercase text-white font-bold text-sm hover:text-black hover:bg-white">Logout</button>
            </div>
          </div>
          <div className='grid grid-cols-1 md:gap-10 py-12 md:py-16 sm:grid-cols-1 lg:divide-y-0 lg:grid-cols-2 xl:grid-cols-2'>
            <div className='flex flex-col'>
              <div className='flex flex-row text-start items-center justify-between'>
                <div className='flex items-center justify-center font-bold text-lg text-white'>
                  Top Artists of All Time
                </div>
                <Link to="/artists" className="text-[#8892b0] text-lg">
                  <button className="border-2 border-white rounded-full py-2 w-[110px] md:w-[130px] uppercase text-white font-bold text-sm hover:text-black hover:bg-white">See More</button>
                </Link>
              </div>
              {topArtists ? (
                <ul>
                  {topArtists.items.slice(0, 10).map((artist, i) => (
                    <div className='flex flex-wrap text-center items-center py-4 relative group' key={i}>
                      <Link to={`/artist/${artist.id}`} className="relative group">
                        {artist.images.length && <img src={artist.images[2].url} alt="Artist" className="rounded-full w-14 h-14" />}
                        <div className="absolute top-0 left-0 w-full h-0 flex flex-col justify-center items-center opacity-0 rounded-full group-hover:h-full group-hover:opacity-100 bg-blackOverlay">
                          <AiFillInfoCircle size={20} className="text-white" />
                        </div>
                      </Link>
                      <Link to={`/artist/${artist.id}`}>
                        <span className='px-4 text-white text-center font-semibold text-sm md:text-md hover:underline hover:underline-offset-4 text-[12px] md:text-[14px]'>{artist.name}</span>
                      </Link>
                    </div>
                  ))}
                </ul>
              ) : (
                <Loader />
              )}
            </div>
            <div className='flex flex-col'>
              <div className='flex flex-row text-start items-center justify-between'>
                <div className='flex items-center justify-center font-bold text-lg text-white'>
                  Top Tracks of All Time
                </div>
                <Link to="/tracks" className="text-[#8892b0] text-lg">
                  <button className="border-2 border-white rounded-full py-2 w-[110px] md:w-[130px] uppercase text-white font-bold text-sm hover:text-black hover:bg-white">See More</button>
                </Link>
              </div>
              <ul>
                {topTracks ? (
                  topTracks.items
                   .slice(0, 10)
                   .map((track, i) => <TrackItem track={track} key={i} />)
                ) : (
                  <Loader />
                )}
              </ul>
            </div>
          </div>
        </div>
      ): (
        <Loader />
      )}
    </>
  )
}

export default Profile;