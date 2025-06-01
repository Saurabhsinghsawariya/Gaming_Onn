import { FaGamepad, FaRocket, FaTrophy, FaUsers } from "react-icons/fa"; // Import icons
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { CTA } from "../assets/Images/Image";

const Banner = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleJoinUsClick = () => {
    navigate("/Join-Us"); // Navigate to the Join Us page
  };

  return (
    <section className="w-full pt-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto p-4">
        {/* Main Banner Content */}
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          {/* Left Section */}
          <div className="md:w-1/2 text-center md:text-start">
            <div className="flex items-end space-x-2 pb-5">
              <div className="h-1 w-12 bg-[#F68E5F] rounded-lg"></div>
              <h3 className="text-[#F68E5F] text-nowrap uppercase font-semibold">
                Explore a New Dimension
              </h3>
            </div>
            <h2 className="text-white font-bold text-lg sm:text-2xl md:text-3xl lg:text-4xl lg:max-w-sm">
              Ready to unlock your potentials in a world of fun?
            </h2>
            <p className="text-gray-400 mt-4 lg:max-w-md">
              Join a community of gamers, creators, and innovators. Discover new
              games, compete for trophies, and connect with players worldwide.
            </p>
            <button
              onClick={handleJoinUsClick} // Connect button to Join Us page
              className="mt-6 py-3 px-6 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white text-lg font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Join Us
            </button>
          </div>

          {/* Right Section */}
          <div className="w-full relative">
            <img
              src={CTA}
              alt="cta"
              className="w-full rounded-2xl object-contain shadow-lg"
            />
            {/* Decorative Frames */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-indigo-600 rounded-full blur-xl opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#F68E5F] rounded-full blur-2xl opacity-50"></div>
          </div>
        </div>

        {/* Icon Sections */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Icon 1 */}
          <div className="flex flex-col items-center text-center bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <FaRocket className="text-indigo-500 text-4xl mb-4" />
            <h4 className="text-white font-bold text-lg">Fast-Paced Action</h4>
            <p className="text-gray-400 mt-2">
              Experience thrilling gameplay with lightning-fast action.
            </p>
          </div>

          {/* Icon 2 */}
          <div className="flex flex-col items-center text-center bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <FaGamepad className="text-green-500 text-4xl mb-4" />
            <h4 className="text-white font-bold text-lg">Immersive Games</h4>
            <p className="text-gray-400 mt-2">
              Dive into a world of immersive and engaging games.
            </p>
          </div>

          {/* Icon 3 */}
          <div className="flex flex-col items-center text-center bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <FaUsers className="text-yellow-500 text-4xl mb-4" />
            <h4 className="text-white font-bold text-lg">Global Community</h4>
            <p className="text-gray-400 mt-2">
              Connect with players from all around the world.
            </p>
          </div>

          {/* Icon 4 */}
          <div className="flex flex-col items-center text-center bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <FaTrophy className="text-red-500 text-4xl mb-4" />
            <h4 className="text-white font-bold text-lg">Win Trophies</h4>
            <p className="text-gray-400 mt-2">
              Compete and win trophies to showcase your skills.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;