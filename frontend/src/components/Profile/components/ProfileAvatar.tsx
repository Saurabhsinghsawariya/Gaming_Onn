import { FC } from 'react';
import { FaUser } from 'react-icons/fa';

interface ProfileAvatarProps {
  imageUrl?: string;
  name?: string;
}

const ProfileAvatar: FC<ProfileAvatarProps> = ({ imageUrl, name }) => {
  const initials = name
    ?.split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();

  return (
    <div className="w-32 h-32 rounded-full border-4 border-gray-800 overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center group transition-all duration-300 hover:scale-105">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={`${name}'s avatar`}
          className="w-full h-full object-cover"
        />
      ) : initials ? (
        <span className="text-4xl font-bold text-white">{initials}</span>
      ) : (
        <FaUser className="w-16 h-16 text-white/80 group-hover:text-white transition-colors" />
      )}
    </div>
  );
};

export default ProfileAvatar;