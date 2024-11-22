
import React, { useState } from "react";

const ChatFeature: React.FC = () => {
  // State to manage whether the chat window is open or closed
  const [isChatOpen, setIsChatOpen] = useState(false);

  // State to store the user's message
  const [message, setMessage] = useState("");

  // State to store all sent messages
  const [messages, setMessages] = useState<string[]>([]);

  // Toggle chat window visibility
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Handle message send
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([...messages, message]);
      setMessage("");
    }
  };

  return (
    <div>
      {/* Fixed Button to open/close chat window */}
      <button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
      >
        {isChatOpen ? "Close Chat" : "Open Chat"}
      </button>

      {/* Chat Window */}
      {isChatOpen && (
        <div className="fixed bottom-16 right-4 w-80 bg-white p-4 border border-gray-300 rounded-lg shadow-lg">
          <div className="max-h-[60vh] overflow-y-scroll mb-4">
            {/* Display messages */}
            {messages.map((msg, index) => (
              <div key={index} className="mb-2">
                <div className="bg-gray-200 p-2 rounded-lg">{msg}</div>
              </div>
            ))}
          </div>

          {/* Message input form */}
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatFeature;
