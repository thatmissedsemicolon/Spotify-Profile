import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/spotify.png';
import { Navlinks } from '../utils/data';
import { IoIosArrowForward } from 'react-icons/io';
import { getUserInfo } from '../api';
import { catchErrors } from '../utils';

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { user } = await getUserInfo();
      setUser(user);
    };

    catchErrors(fetchData());
  },[])

  const isNotActiveStyle = 'flex flex-col px-6 py-1.5 w-[100px] text-center items-center justify-center text-[#9B9B9B] text-[11px] hover:bg-[#282828]';
  const isActiveStyle = 'flex flex-col px-6 py-1.5 w-[100px] text-center items-center justify-center text-[#9B9B9B] text-[11px] bg-[#282828] hover:bg-[#282828]';

  return (
    <nav className="bg-black flex flex-col justify-between overflow-hidden h-full min-w-210 scrollbar">
      <div className="bg-black flex flex-col relative group">
        <Link
          to="/"
          className="flex px-6 gap-2 my-6 pt-1 w-[100px] text-center items-center justify-center relative group"
        >
          <img src={logo} alt="spotify" className="pointer-events-none w-20" />
          <div className="absolute top-0 left-0 w-full h-0 flex flex-col justify-center items-center opacity-0 group-hover:h-full group-hover:opacity-100 bg-greenOverlay"></div>
        </Link>
      </div>
      <div className="flex flex-col items-center">
        {Navlinks.map((item, i) => ( 
          <NavLink key={i} to={`/${item.links}`} className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
            <p>{item?.image}</p>
            <p className='py-1'>{item.name}</p>
          </NavLink>
        ))}
      </div>
      <a
        href={user?.external_urls?.spotify} target="_blank" rel="noopener noreferrer"
        className="hidden bg-white md:flex my-5 mb-3 p-2 items-center rounded-lg shadow-lg mx-3"
        >
          <img src={user?.images[0]?.url} alt="avatar" className="w-10 h-10 rounded-full" />
          <IoIosArrowForward />
      </a>
    </nav>
  )
}

export default Navbar;