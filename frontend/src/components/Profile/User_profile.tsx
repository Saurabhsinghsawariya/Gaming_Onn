import { useState } from "react";

const UserProfile = () => {
  const [username, setUsername] = useState<string>("John Doe");
  const [email, setEmail] = useState<string>("john@example.com");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the updated data to your backend
    alert("Profile updated!");
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-800 rounded-lg shadow-lg p-6 text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">User Profile</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="mb-6 w-full">
          <label className="block mb-1">Username</label>
          <input
            type="text"
            className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6 w-full">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded font-bold transition"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
