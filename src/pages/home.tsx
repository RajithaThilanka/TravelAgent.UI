import React, { useState, useRef, useEffect } from "react";
import { Send, User, Bot } from "lucide-react";

// Note: In a real application, you would need to install MUI with:
// npm install @mui/material @emotion/react @emotion/styled
// This is a representation since we can't import external libraries besides the ones specified

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === "") return;

    // Add user message
    setMessages([...messages, { role: "user", content: input }]);

    // Clear input
    setInput("");

    // Simulate assistant response (in a real app, this would be an API call)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "This is a simulated response. In a real application, this would come from your AI backend.",
        },
      ]);
    }, 1000);
  };

  // MUI-inspired styles implemented with Tailwind
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="w-1/2 h-full flex flex-col bg-gray-900 text-gray-100 shadow-xl border border-gray-800">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-800 flex items-center bg-gray-800">
          <div className="h-6 w-6 rounded-full bg-violet-500 mr-3"></div>
          <h1 className="text-xl font-medium">Claude</h1>
        </div>

        {/* Chat area - dark background */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex max-w-3xl ${
                  message.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center mr-3 ml-3">
                  {message.role === "user" ? (
                    <User size={18} className="text-gray-300" />
                  ) : (
                    <Bot size={18} className="text-gray-300" />
                  )}
                </div>
                <div
                  className={`p-4 rounded-lg shadow-md ${
                    message.role === "user"
                      ? "bg-violet-600 text-white"
                      : "bg-gray-800 text-gray-100"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area - MUI-inspired */}
        <div className="p-4 border-t border-gray-800 bg-gray-800">
          <div className="flex relative rounded-lg overflow-hidden shadow-lg">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Message Claude..."
              className="w-full p-4 pr-12 bg-gray-700 text-gray-100 focus:outline-none placeholder-gray-400"
            />
            <button
              onClick={handleSend}
              className="absolute right-4 top-4 text-gray-400 hover:text-violet-500 transition-colors duration-200"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
