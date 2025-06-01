import { useState } from "react";

const UserProfile = () => {
  const [profileImg, setProfileImg] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("John Doe");
  const [email, setEmail] = useState<string>("john@example.com");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setProfileImg(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the updated data to your backend
    alert("Profile updated!");
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-800 rounded-lg shadow-lg p-6 text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">User Profile</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="mb-4">
          <label htmlFor="profileImg" className="cursor-pointer">
            <img
              src={preview || "https://via.placeholder.com/120"}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
            />
            <input
              id="profileImg"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          <p className="text-sm text-gray-400 mt-2 text-center">Click image to upload</p>
        </div>
        <div className="mb-4 w-full">
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