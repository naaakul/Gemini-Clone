import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import "./Sidebar.css";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompt, setRecentPrompt, newChat } = useContext(Context);

  const loadPropt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt); // Ensure onSent is awaited
  };

  return (
    <div id="sidebar" className="sidebar min-h-[100vh] inline-flex flex-col justify-between py-[25px] px-[15px] bg-[#f0f4f9]">
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu block pb-6 ml-[15px] cursor-pointer"
          src={assets.menu_icon}
          alt=""
        />
        <div onClick={newChat} className="new-chat mt-[10px] inline-flex items-center gap-[10px] py-[10px] px-[15px] bg-[#e6eaf1] rounded-[50px] text-[14px] text-zinc-500 cursor-pointer">
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent flex flex-col">
            <p className="recent-title mt-[30px] mb-[20px]">Recent</p>
            {prevPrompt.map((item, index) => (
              <div key={index} onClick={() => loadPropt(item)} className="recent-entry flex items-start items-center gap-[10px] p-[10px] pr-[40px] rounded-[50px] text-[#282828] cursor-pointer hover:bg-[#E6EAF1]">
                <img src={assets.message_icon} alt="" />
                <p>{item.slice(0, 13)} ...</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div className="bottom flex flex-col">
        <div className="bottom-item recent-entry flex items-start gap-[10px] p-[15px] rounded-[50px] text-[#282828] cursor-pointer hover:bg-[#E6EAF1] cursor-pointer">
          <img src={assets.question_icon} alt="" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry flex items-start gap-[10px] p-[15px] rounded-[50px] text-[#282828] cursor-pointer hover:bg-[#E6EAF1] cursor-pointer">
          <img src={assets.history_icon} alt="" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry flex items-start gap-[10px] p-[15px] rounded-[50px] text-[#282828] cursor-pointer hover:bg-[#E6EAF1] cursor-pointer">
          <img src={assets.setting_icon} alt="" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;