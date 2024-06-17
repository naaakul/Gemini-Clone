import React, { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [error, setError] = useState(null); // Added state for error handling

  const onSent = async (prompt) => {
    setLoading(true);
    setError(null); // Reset error before new request
    try {
      const response = await runChat(prompt);
      setResultData(response);
      setShowResult(true);
      setRecentPrompt(prompt);
      setPrevPrompt((prev) => [prompt, ...prev.slice(0, 4)]);
    } catch (error) {
      console.error("Error in onSent:", error);
      setError("Failed to get response. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    prevPrompt,
    setPrevPrompt,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    setLoading,
    error, // Add error to context value
    setError, // Add setError to context value
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
