import { useState } from "react";
import { FaBars, FaGamepad, FaGlobe, FaHome, FaInfoCircle, FaSearch, FaSignOutAlt, FaTimes, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Images/logo.png";
import ProfileFloatingWindow from "./Profile/profile";

const NavBar: React.FC = () => {
  const [nav, setNav] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [profileOpen, setProfileOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  // Dummy user data, replace with real user info as needed
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: ""
  };

  // Navigation handlers
  const handleHomeClick = () => {
    // Trigger the background change in Homepage
    const event = new CustomEvent('changeBackground');
    window.dispatchEvent(event);
    navigate("/home");
  };
  const handleWorldChatClick = () => navigate("/chat");
  const handleGamesClick = () => navigate("/games");
  const handleAboutClick = () => navigate("/footer");
  const handleLogout = () => {
    alert("You have been logged out!");
    navigate("/login");
  };

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/games?search=${searchQuery}`);
      setSearchQuery("");
    }
  };

  const navBtn = "button-72";

  return (
    <>
      <nav className="w-full fixed top-0 z-50 bg-gray-900/40 backdrop-blur-lg shadow-lg h-24">
        <header className="max-w-[1440px] mx-auto px-6 flex items-center justify-between h-full relative">
          {/* Left side navigation */}
          <ul className="hidden lg:flex items-center gap-6 flex-1">
            <li>
              <button onClick={handleHomeClick} className={navBtn}>
                <FaHome />
                Home
              </button>
            </li>
            <li>
              <button onClick={handleGamesClick} className={navBtn}>
                <FaGamepad />
                Games
              </button>
            </li>
            <li>
              <button onClick={handleAboutClick} className={navBtn}>
                <FaInfoCircle />
                About
              </button>
            </li>
          </ul>

          {/* Center search bar */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-2 bg-white/80 rounded-full py-2 px-4 shadow-md w-[400px]"
            >
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none px-2"
              />
              <button type="submit" className="text-gray-600">
                <FaSearch />
              </button>
            </form>
          </div>

          {/* Right side with logo and profile */}
          <div className="flex items-center gap-6 flex-1 justify-end">
            <button onClick={() => setProfileOpen(true)} className={navBtn}>
              <FaUserCircle />
              Profile
            </button>
            <div className="h-20 w-auto ml-4">
              <img
                src={Logo}
                alt="Logo"
                className="h-full w-auto object-contain"
              />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden absolute left-6 top-1/2 -translate-y-1/2">
            <button onClick={() => setNav(!nav)} className="text-white">
              {nav ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </header>

        {/* Mobile menu */}
        {nav && (
          <div className="lg:hidden absolute top-24 left-0 w-full bg-gray-900/90 backdrop-blur-lg py-4">
            <div className="flex items-center justify-center mb-4">
              <img src={Logo} alt="Logo" className="h-16 w-auto object-contain" />
            </div>
            <ul className="flex flex-col items-center gap-2">
              <li>
                <button onClick={handleHomeClick} className={navBtn}>
                  <FaHome />
                  Home
                </button>
              </li>
              <li>
                <button onClick={handleGamesClick} className={navBtn}>
                  <FaGamepad />
                  Games
                </button>
              </li>
              <li>
                <button onClick={handleAboutClick} className={navBtn}>
                  <FaInfoCircle />
                  About
                </button>
              </li>
              <li>
                <button onClick={handleWorldChatClick} className={navBtn}>
                  <FaGlobe />
                  World Chat
                </button>
              </li>
              <li>
                <button onClick={handleLogout} className={navBtn}>
                  <FaSignOutAlt />
                  Logout
                </button>
              </li>
              <li>
                <button
                  onClick={() => setProfileOpen(true)}
                  className={navBtn}
                >
                  <FaUserCircle style={{ marginRight: 8 }} />
                  Profile
                </button>
              </li>
              {/* Mobile Search Bar */}
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center gap-2 bg-white/80 rounded-full py-1 px-3 shadow-md w-11/12 mt-4"
              >
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-grow bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none px-2"
                />
                <button
                  type="submit"
                  className={navBtn}
                >
                  <FaSearch />
                  Search
                </button>
              </form>
            </ul>
          </div>
        )}
      </nav>

      <ProfileFloatingWindow
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}

      />
    </>
  );
};

export default NavBar;