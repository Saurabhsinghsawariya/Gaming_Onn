import { FC, useEffect, useState } from 'react';
import { FaCalendar, FaEnvelope, FaSignOutAlt, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Modal from '../common/Modal';
import ProfileAvatar from './components/ProfileAvatar';

interface UserData {
  name: string;
  email: string;
  createdAt?: string;
  avatarUrl?: string;
}

interface ProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

const Profile: FC<ProfileProps> = ({ isOpen, onClose }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/users/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        setError('');
      } else {
        throw new Error('Failed to fetch profile');
      }
    } catch (err) {
      setError('Failed to load profile');
      localStorage.removeItem('token');
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchProfile();
  }, []);

  // Set up polling for updates
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (localStorage.getItem('token')) {
        fetchProfile();
      }
    }, 10000); // Poll every 10 seconds

    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserData(null);
    onClose();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
      </div>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative bg-gray-950 rounded-2xl shadow-[0_0_100px_0_rgba(139,92,246,0.25)] overflow-hidden transform hover:scale-[1.02] transition-all duration-300 border border-purple-500/30">
        {/* Enhanced gradient border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 animate-gradient-xy opacity-20 blur-2xl -z-10" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-gray-900/90 hover:bg-purple-600/70 transition-all duration-300 group shadow-lg shadow-purple-900/30"
        >
          <FaTimes className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
        </button>

        {/* Enhanced Profile Header with Avatar */}
        <div className="relative h-48 bg-gradient-to-r from-cyan-700 via-purple-700 to-pink-700 animate-gradient-slow">
          <div className="absolute inset-0 bg-gray-950/40 backdrop-blur-sm"></div>
          <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2">
            <div className="p-1 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500">
              <ProfileAvatar 
                imageUrl={userData?.avatarUrl} 
                name={userData?.name}
              />
            </div>
          </div>
        </div>

        <div className="pt-24 p-8 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
          {error && (
            <div className="bg-red-950/50 text-red-400 p-4 rounded-lg mb-6 backdrop-blur-sm border border-red-800/50 shadow-lg shadow-red-900/20">
              {error}
            </div>
          )}

          {userData && (
            <div className="space-y-8">
              {/* Enhanced Name Section */}
              <div className="text-center">
                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 animate-text">
                  {userData.name}
                </h2>
              </div>

              {/* Enhanced Info Cards */}
              <div className="grid grid-cols-1 gap-4">
                <div className="group bg-gray-900/70 rounded-xl p-6 backdrop-blur-sm hover:bg-gray-800/80 transition-all duration-300 border border-purple-500/20 hover:border-purple-500/40 shadow-lg shadow-purple-900/10 hover:shadow-purple-900/20">
                  <div className="flex items-center space-x-4">
                    <FaEnvelope className="text-cyan-400 w-6 h-6 group-hover:text-purple-400 transition-colors" />
                    <div>
                      <p className="text-sm text-gray-400 font-medium">Email</p>
                      <p className="text-lg text-gray-100">{userData.email}</p>
                    </div>
                  </div>
                </div>

                {userData.createdAt && (
                  <div className="group bg-gray-900/70 rounded-xl p-6 backdrop-blur-sm hover:bg-gray-800/80 transition-all duration-300 border border-purple-500/20 hover:border-purple-500/40 shadow-lg shadow-purple-900/10 hover:shadow-purple-900/20">
                    <div className="flex items-center space-x-4">
                      <FaCalendar className="text-pink-400 w-6 h-6 group-hover:text-purple-400 transition-colors" />
                      <div>
                        <p className="text-sm text-gray-400 font-medium">Member since</p>
                        <p className="text-lg text-gray-100">
                          {new Date(userData.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full mt-8 py-4 px-6 bg-gradient-to-r from-pink-700 to-purple-700 text-white rounded-xl hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-950 transition-all duration-300 flex items-center justify-center space-x-3 shadow-xl shadow-purple-900/30 text-lg font-medium"
              >
                <FaSignOutAlt className="w-6 h-6" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default Profile;