import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPlaylist, getRecommendationsForTracks, getUser, createPlaylist, addTracksToPlaylist, followPlaylist, doesUserFollowPlaylist } from '../api';
import { catchErrors } from '../utils';
import TrackItem from './TrackItem';

const Recommendations = () => {
  const { playlistId } = useParams();

  const [playlist, setPlaylist] = useState(null);
  const [recommendations, setRecommmendations] = useState(null);
  const [recPlaylistId, setRecPlaylistId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  document.title = `${playlist ? `Recommended Tracks Based On - ${playlist?.name}` : 'Recommended Tracks'}`;

  useEffect(() => {
    const fetchPlaylistData = async () => {
      const { data } = await getPlaylist(playlistId);
      setPlaylist(data);
    };
    catchErrors(fetchPlaylistData());

    const fetchUserData = async () => {
      const { data } = await getUser();
      setUserId(data.id);
    };
    catchErrors(fetchUserData());
  }, [playlistId]);

  useMemo(() => {
    const fetchData = async () => {
      if (playlist) {
        const { data } = await getRecommendationsForTracks(playlist.tracks.items);
        setRecommmendations(data);
      }
    };
    catchErrors(fetchData());
  }, [playlist]);

  useMemo(() => {
    const isUserFollowingPlaylist = async plistId => {
      const { data } = await doesUserFollowPlaylist(plistId, userId);
      setIsFollowing(data[0]);
    };

    const addTracksAndFollow = async () => {
      const uris = recommendations.tracks.map(({ uri }) => uri).join(',');
      const { data } = await addTracksToPlaylist(recPlaylistId, uris);

      if (data) {
        await followPlaylist(recPlaylistId);
        catchErrors(isUserFollowingPlaylist(recPlaylistId));
      }
    };

    if (recPlaylistId && recommendations && userId) {
      catchErrors(addTracksAndFollow(recPlaylistId));
    }
  }, [recPlaylistId, recommendations, userId]);

  const createPlaylistOnSave = async () => {
    if (!userId) {
      return;
    }

    const name = `Recommended Tracks Based on ${playlist.name}`;
    const { data } = await createPlaylist(userId, name);
    setRecPlaylistId(data.id);
  };

  return (
    <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 px-4 md:mt-0 pt-8 pb-12 md:pt-24 h-screen'>
      {playlist && (
        <div className='flex flex-wrap justify-center md:justify-between items-center'>
          <h2 className="text-[26px] md:text-2xl font-bold text-white text-center md:text-start">
            Recommended Tracks Based On{' '}
            <Link to={`/playlists/${playlist.id}`}>{playlist.name}</Link>
          </h2>
          <div className='py-4'>
            {isFollowing && recPlaylistId ? (
              <a
                href={`https://open.spotify.com/playlist/${recPlaylistId}`}
                target="_blank"
                rel="noopener noreferrer"
                className='px-6 py-2 rounded-full border-2 border-bg-white w-42 font-[700] uppercase text-white text-[12px] tracking-[1px] hover:bg-white hover:text-black'>
                Open in Spotify
              </a>
            ) : (
              <button onClick={catchErrors(createPlaylistOnSave)} className="flex flex-row items-center justify-center px-6 py-2 rounded-full bg-[#1DB954] w-42 font-[700] uppercase text-white text-[12px] tracking-[1px] hover:bg-[#1ed760]">Save to Spotify</button>
            )}
          </div>
        </div>
      )}
      <ul className='mb-10 md:mb-4 py-0 md:py-8'>
        {recommendations && recommendations.tracks.map((track, i) => <TrackItem track={track} key={i} />)}
      </ul>
    </div>
  )
}

export default Recommendations;