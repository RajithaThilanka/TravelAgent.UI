import { useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  addMessage,
  setIsTyping,
  setChatHistory,
} from "../store/slices/chatSlice";
import { Message } from "../types/chat";
import { chatHistory } from "../constants/chatData";
import { useChatAgentMutation } from "../api";

export const useChat = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => state.chat?.messages ?? []);
  const isTyping = useAppSelector((state) => state.chat?.isTyping ?? false);
  const messagesEndRef = useRef(null);

  // Use the mutation hook for sending chat requests to the backend
  const [chatAgent] = useChatAgentMutation();

  useEffect(() => {
    dispatch(setChatHistory(chatHistory));
  }, [dispatch]);

  // Function to handle message send logic
  const handleSendMessage = async (inputMessage: string) => {
    if (inputMessage.trim() === "") return;

    // Add the user message to the Redux state
    const newMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    dispatch(addMessage(newMessage));
    dispatch(setIsTyping(true));

    try {
      const response = await chatAgent({
        message: inputMessage,
        history: [],
      }).unwrap();

      const aiResponse: Message = {
        id: messages.length + 2,
        text:
          response?.message ||
          "I'm processing your request. This is a simulated response.",
        sender: "ai",
        timestamp: new Date(),
      };

      dispatch(addMessage(aiResponse));
      dispatch(setIsTyping(false));
    } catch (error) {
      console.error("Error sending message:", error);
      dispatch(setIsTyping(false));
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      const input = event.currentTarget as HTMLInputElement;
      handleSendMessage(input.value);
    }
  };

  const formatTimeStamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return {
    messages,
    isTyping,
    messagesEndRef,
    handleSendMessage,
    handleKeyPress,
    formatTimeStamp,
  };
};
