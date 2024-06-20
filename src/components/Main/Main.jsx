import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import { FaCaretDown, FaPencilAlt, FaRegCompass } from "react-icons/fa";
import { RiBallPenFill } from "react-icons/ri";
import { AiFillCompass } from "react-icons/ai";
import { MdLightbulbOutline } from "react-icons/md";
import { SiGooglemaps } from "react-icons/si";
import { TbBrandGoogleMaps } from "react-icons/tb";
import { BiImageAdd } from "react-icons/bi";
import { IoIosCamera, IoMdSend } from "react-icons/io";

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
    <div className="main bg-[#131314] flex-[1] min-h-[100vh] pb-[15vh] relative">
      <div className="nav flex items-center justify-between text-[20px] p-[20px] text-[#CACCCE]">
        <p className="font-normal flex items-center">
          Gemini <FaCaretDown />
        </p>
        <img
          src={assets.user_icon}
          alt=""
          className="h-[40px] object-cover w-[40px] rounded-full"
        />
      </div>
      <div className="main-container max-w-[900px] m-auto">
        {!showResult ? (
          <>
            <div className="greet tracking-tighter my-50px text-[56px] text-[#c4c7c5] font-medium p-[20px]">
              <p>
                <span>Hello, Nakul</span>
              </p>
              <p className="text-[#444746]">How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card hover:bg-[#333537] h-[200px] p-[15px] bg-[#1E1F20] rounded-[10px] relative cursor-pointer">
                <p className="text-[#E3E3E3] font-[17px]">
                  Write a product description for a new type of toothbrush
                </p>
                <RiBallPenFill className="p-[8px] w-[38px] h-[38px] absolute rounded-full text-[#E3E3E3] bg-zinc-900 bottom-[15px] right-[15px]" />
              </div>
              <div className="card hover:bg-[#333537] h-[200px] p-[15px] bg-[#1E1F20] rounded-[10px] relative cursor-pointer">
                <p className="text-[#E3E3E3] font-[17px]">
                  Create a travel itinerary for a city
                </p>
                <FaRegCompass className="p-[8px] w-[38px] h-[38px] absolute rounded-full text-[#E3E3E3] bg-zinc-900 bottom-[15px] right-[15px]" />
              </div>
              <div className="card hover:bg-[#333537] h-[200px] p-[15px] bg-[#1E1F20] rounded-[10px] relative cursor-pointer">
                <p className="text-[#E3E3E3] font-[17px]">
                  Help me compare these college majors
                </p>
                <MdLightbulbOutline className="p-[5px] w-[38px] h-[38px] absolute rounded-full text-[#E3E3E3] bg-zinc-900 bottom-[15px] right-[15px]" />
              </div>
              <div className="card hover:bg-[#333537] h-[200px] p-[15px] bg-[#1E1F20] rounded-[10px] relative cursor-pointer">
                <p className="text-[#E3E3E3] font-[17px]">
                  What's the time it takes to walk to several landmarks
                </p>
                <SiGooglemaps className="p-[8px] w-[38px] h-[38px] absolute rounded-full text-[#E3E3E3] bg-zinc-900 bottom-[15px] right-[15px]" />
              </div>
            </div>
          </>
        ) : (
          <div className="result px-[5%] max-h-[70vh] overflow-y-scroll scrollbar-hide">
            <div className="result-title font-medium text-[17px] my-[40px] flex items-center gap-[26px]">
              <img
                className="w-[40px] h-[40px] rounded-full object-cover"
                src={assets.user_icon}
                alt=""
              />
              <p className="text-[#E3E3E3]">{recentPrompt}</p>
            </div>
            <div className="result-data flex items-start gap-[20px]">
              <img className="w-[45px]" src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="w-full flex flex-col gap-[10px]">
                  <hr className="loader rounded-[4px] border-0 bg-[#f6f7f8] h-[20px]" />
                  <hr className="loader2 rounded-[4px] border-0 bg-[#f6f7f8] h-[20px]" />
                  <hr className="loader rounded-[4px] border-0 bg-[#f6f7f8] h-[20px] w-60" />
                </div>
              ) : (
                <p
                  className="text-[#E3E3E3] text-[17px]"
                  dangerouslySetInnerHTML={{ __html: resultData }}
                ></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom absolute bottom-0 w-full max-w-[900px] px-[20px] m-auto">
          <div className="mt-[100px] search-box flex items-center justify-between gap-[0px] bg-[#1E1F20] py-[10px] px-[20px] rounded-[50px]">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              className="flex-[1] text-[#E3E3E3] bg-transparent border-none p-[8px] text-[18px] outline-none"
              type="text"
              placeholder="Enter a prompt here"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
            />
            <div className="flex gap-4 items-center">
              <BiImageAdd
                size={45}
                className="ico text-[#E3E3E3] w-[26px] cursor-pointer"
              />
              <IoIosCamera
                size={48}
                className="ico text-[#E3E3E3] w-[26px] cursor-pointer"
              />
              <IoMdSend
                onClick={handleSend}
                size={42}
                className="text-[#E3E3E3] w-[26px] cursor-pointer"
              />
            </div>
          </div>

          <p className="bottom-info text-[13px] text-[#E3E3E3] my-[15px] mx-auto text-center font-light">
            Some information given by this clone may not be correct because of
            free Google - gemini API so think twice before blaming the cutie on the top right corner.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
