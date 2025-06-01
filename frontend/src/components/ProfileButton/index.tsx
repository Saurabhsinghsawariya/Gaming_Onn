import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import Profile from '../Profile/profile';

const ProfileButton = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsProfileOpen(true)}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-700/50 hover:bg-gray-700/70 transition-all duration-300"
      >
        <FaUser className="w-5 h-5 text-indigo-400" />
        <span className="text-gray-200">Profile</span>
      </button>

      <Profile
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </>
  );
};

export default ProfileButton;