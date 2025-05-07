// app/components/Header.tsx
"use client";

import LoggedIn from "@/app/actions/LoggedIn";
import ProfileMenuComponent from "@/app/actions/ProfileMenuComponent";
import { Button, Menu, MenuItem } from "@mui/material";
import { useSession } from "next-auth/react";
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const { data: session } = useSession()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className="bg-white shadow-sm lg:static">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-4">
            <a href="#">
              <img
                src="https://www.freepnglogos.com/uploads/512x512-logo-png/512x512-logo-five-pointed-star-logo-icon-icons-download-8.png"
                alt="System X"
                className="h-auto w-10"
              />
            </a>
            <form className="relative w-full hidden md:block">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon className="text-gray-400" fontSize="small" />
              </div>
              <input
                id="search"
                name="search"
                type="search"
                placeholder="Search"
                className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-[#006aff] focus:outline-none focus:ring-1 focus:ring-[#006aff]"
              />
            </form>
          </div>
          
          <div className="lg:flex gap-4 items-center hidden">
          <button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            // className="relative rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-[#006aff]"
          >
             <img
                src={session?.user?.image ? session.user.image : "https://randomuser.me/api/portraits"}
                alt="User"
                className="h-8 w-8 rounded-full"
              />
          </button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem> */}
            <MenuItem onClick={handleClose}>
              <ProfileMenuComponent />
            </MenuItem>
          </Menu>
          </div>
        </div>
      </div>
      {menuOpen && (
        <>
          <nav className="lg:hidden px-4 py-4 space-y-2">
            <a href="#" className="block py-2 text-base font-medium text-gray-900 hover:underline">
              Home
            </a>
            <a href="#" className="block py-2 text-base font-medium text-gray-900 hover:underline">
              Popular
            </a>
            <a href="#" className="block py-2 text-base font-medium text-gray-900 hover:underline">
              Communities
            </a>
            <a href="#" className="block py-2 text-base font-medium text-gray-900 hover:underline">
              Trending
            </a>
          </nav>
          <div className="lg:hidden px-4 py-2 flex items-center gap-4">
            <a href="#" className="text-sm font-medium text-gray-900 hover:underline">
              Go Premium
            </a>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="relative rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              <img
                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?..."
                alt="User"
                className="h-8 w-8 rounded-full"
              />
              {userMenuOpen && (
                <div className="absolute right-4 top-16 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Your Profile
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Settings
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Sign out
                  </a>
                </div>
              )}
            </button>
            <a
              href="#"
              className="inline-flex items-center rounded-md bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700"
            >
              New Post
            </a>
          </div>
        </>
      )}
    </header>
  );
}