import { CgProfile } from 'react-icons/cg';
import { TbMicrophone2, TbPlaylist } from 'react-icons/tb';
import { FaMusic } from 'react-icons/fa';
import { GiBackwardTime } from 'react-icons/gi';

export const links = [
  {
    name: "Profile",
    className: "flex flex-col justify-center items-center py-4 px-4 text-center hover:bg-[#181818]",
    to: "/",
    image: <CgProfile size={22} />
  },
  {
    name: "Top Artists",
    className: "flex flex-col justify-center items-center py-4 px-4 text-center hover:bg-[#181818]",
    to: "/artists",
    image: <TbMicrophone2 size={22} />
  },
  {
    name: "Top Tracks",
    className: "flex flex-col justify-center items-center py-4 px-4 text-center hover:bg-[#181818]",
    to: "/tracks",
    image: <FaMusic size={22} />
  },
  {
    name: "Recent",
    className: "flex flex-col justify-center items-center py-4 px-4 text-center hover:bg-[#181818]",
    to: "/recent",
    image: <GiBackwardTime size={22} />
  },
  {
    name: "Playlists",
    className: "flex flex-col justify-center items-center py-4 px-4 text-center hover:bg-[#181818]",
    to: "/playlists",
    image: <TbPlaylist size={22} />
  }
]

export const Navlinks = [
  {
    name:"Profile",
    links:"",
    image:<CgProfile size={26} />
  },
  {
    name:"Top Artists",
    links:"artists",
    image:<TbMicrophone2 size={26} />,
  },
  {
    name:"Top Tracks",
    links:"tracks",
    image:<FaMusic size={20} />,
  },
  {
    name:"Recent",
    links:"recent",
    image:<GiBackwardTime size={26} />,
  },
  {
    name:"Playlists",
    links:"playlists",
    image:<TbPlaylist size={24} />,
  },
]