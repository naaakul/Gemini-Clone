import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    setLoading,
    setResultData,
    setError, // Ensure setError is destructured from context
    onSent,
  } = useContext(Context);

  const handleSend = async () => {
    setLoading(true);
    setError(null); // Reset previous errors
    try {
      const response = await onSent(input); // Call onSent with input
      setResultData(response);
    } catch (error) {
      setError("Failed to get response. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main flex-[1] min-h-[100vh] pb-[15vh] relative">
      <div className="nav flex items-center justify-between text-[20px] p-[20px] text-[#585858]">
        <p>Gemini</p>
        <img
          src={assets.user_icon}
          alt=""
          className="h-[40px] object-cover w-[40px] rounded-full"
        />
      </div>
      <div className="main-container max-w-[900px] m-auto">
        <div className="greet my-50px text-[56px] text-[#c4c7c5] font-medium p-[20px]">
          <p>
            <span>Hello, Nakul</span>
          </p>
          <p>How can I help you today?</p>
        </div>
        <div className="cards">
          <div className="card hover:bg-[#dfe4ea] h-[200px] p-[15px] bg-[#f0f4f9] rounded-[10px] relative cursor-pointer">
            <p className="text-[#585858] font-[17px]">
              Help write SQL to generate a report
            </p>
            <img
              src={assets.compass_icon}
              alt=""
              className="w-[35px] p-[5px] absolute bg-white rounded-[20px] bottom-[10px] right-[10px]"
            />
          </div>
          <div className="card hover:bg-[#dfe4ea] h-[200px] p-[15px] bg-[#f0f4f9] rounded-[10px] relative cursor-pointer">
            <p className="text-[#585858] font-[17px]">
              Give me phrases to learn a new language
            </p>
            <img
              src={assets.bulb_icon}
              alt=""
              className="w-[35px] p-[5px] absolute bg-white rounded-[20px] bottom-[10px] right-[10px]"
            />
          </div>
          <div className="card hover:bg-[#dfe4ea] h-[200px] p-[15px] bg-[#f0f4f9] rounded-[10px] relative cursor-pointer">
            <p className="text-[#585858] font-[17px]">
              I’m sick and need help crafting a text message for my boss
            </p>
            <img
              src={assets.message_icon}
              alt=""
              className="w-[35px] p-[5px] absolute bg-white rounded-[20px] bottom-[10px] right-[10px]"
            />
          </div>
          <div className="card hover:bg-[#dfe4ea] h-[200px] p-[15px] bg-[#f0f4f9] rounded-[10px] relative cursor-pointer">
            <p className="text-[#585858] font-[17px]">
              Help me find YouTube videos to care for a specific plant
            </p>
            <img
              src={assets.code_icon}
              alt=""
              className="w-[35px] p-[5px] absolute bg-white rounded-[20px] bottom-[10px] right-[10px]"
            />
          </div>
        </div>
        <div className="main-bottom absolute bottom-0 w-full max-w-[900px] px-[20px] m-auto">
          <div className="mt-[100px] search-box flex items-center justify-between gap-[20px] bg-[#f0f4f9] py-[10px] px-[20px] rounded-[50px]">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              className="flex-[1] bg-transparent border-none p-[8px] text-[18px] outline-none"
              type="text"
              placeholder="Enter a prompt here"
            />
            <div className="flex gap-2">
              <img
                className="w-[24px] cursor-pointer"
                src={assets.gallery_icon}
                alt=""
              />
              <img
                className="w-[24px] cursor-pointer"
                src={assets.mic_icon}
                alt=""
              />
              <img
                onClick={handleSend}
                className="w-[24px] cursor-pointer"
                src={assets.send_icon}
                alt=""
              />
            </div>
          </div>
          <p className="bottom-info text-[13px] my-[15px] mx-auto text-center font-light">
            Gemini may display inaccurate info, including about people, so
            double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
