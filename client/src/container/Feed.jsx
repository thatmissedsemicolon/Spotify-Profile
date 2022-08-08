import React, { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import { Route, Routes } from 'react-router-dom';
import { Profile, TopArtists, Artist, Tracks, Track, RecentlyPlayed, Playlists, Playlist, Recommendations, NotFound } from '../components';
import { NavLink } from 'react-router-dom';
import { links } from '../utils/data';

const Feed = () => {
  const scrollRef = useRef(null);
  
  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  })

  const isNotActiveStyle = 'flex flex-col py-4 w-[100px] text-center items-center justify-center text-[#9B9B9B] text-[11px] hover:bg-[#282828]';
  const isActiveStyle = 'flex flex-col py-4 w-[100px] text-center items-center justify-center text-[#9B9B9B] text-[11px] bg-[#282828] hover:bg-[#282828]';

  return (
    <div className="flex md:flex-row flex-col h-[100%] transition-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Navbar />
      </div>
      <div className="pb-2 flex-1 h-screen bg-[#181818] overflow-y-auto" ref={scrollRef}>
        <Routes>
          <Route path='/' element={<Profile />} />
          <Route path='/artists' element={<TopArtists />} />
          <Route path='/artist/:artistId' element={<Artist />} />
          <Route path='/tracks' element={<Tracks />} />
          <Route path='/track/:trackId' element={<Track />} />
          <Route path='/recent' element={<RecentlyPlayed />} />
          <Route path='/playlists' element={<Playlists />} />
          <Route path='/playlists/:playlistId' element={<Playlist />} />
          <Route path='/recommendations/:playlistId' element={<Recommendations />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </div>
      <div className="flex md:hidden">
        <nav className="fixed bottom-0 inset-x-0 bg-black flex justify-between">
          {links.map((index, i) => (
            <NavLink key={i} to={index?.to} className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
              {index?.image}
              {index?.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default Feed;