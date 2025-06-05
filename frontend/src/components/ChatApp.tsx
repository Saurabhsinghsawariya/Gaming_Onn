import React, { useState } from "react";
import { FaComments } from "react-icons/fa";
import Chat from "./Chat/Chat";
import MessageInput from "./Chat/MessageInput";

const ChatApp: React.FC = () => {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="chat-app bg-gray-900 text-white min-h-screen flex flex-col items-center p-4">
      {/* Header */}
      <header className="w-full max-w-4xl flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FaComments className="text-blue-500" />
          Chat Application
        </h1>
        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300">
          Logout
        </button>
      </header>

      {/* Chat Section */}
      <div className="chat-container w-full max-w-4xl flex flex-col flex-grow bg-gray-800 mt-4 rounded-lg shadow-lg overflow-hidden">
        <Chat key={refresh.toString()} />
        <MessageInput onMessageSent={handleRefresh} />
      </div>
    </div>
  );
};

export default ChatApp;