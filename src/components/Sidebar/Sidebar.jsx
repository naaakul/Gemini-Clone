import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import "./Sidebar.css";
import { Context } from "../../context/Context";
import { IoMenu, IoSettingsSharp } from "react-icons/io5";
import { MdHistory } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { IoIosAdd, IoMdHelpCircleOutline } from "react-icons/io";
import { FiMessageSquare } from "react-icons/fi";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompt, setRecentPrompt, newChat } = useContext(Context);

  const loadPropt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt); // Ensure onSent is awaited
  };

  return (
    <div
      id="sidebar"
      className="sidebar min-h-[100vh] inline-flex flex-col justify-between py-[25px] px-[15px] bg-[#1E1F20]"
    >
      <div className="top">
        <IoMenu
        size={30}
          onClick={() => setExtended((prev) => !prev)}
          className="text-[#E5E5E5] menu block ml-[12px] cursor-pointer"
        />
        <div
          onClick={newChat}
          className="new-chat mt-[10px] inline-flex items-center gap-[10px] py-[10px] px-[10px] bg-[#282A2C] rounded-[50px] text-[14px] text-[#E8EAED] cursor-pointer"
        >
          <IoIosAdd size={32}/>
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent flex flex-col">
            <p className="text-[#E5E5E5] recent-title mt-[30px] mb-[20px]">Recent</p>
            {prevPrompt.map((item, index) => (
              <div
                key={index}
                onClick={() => loadPropt(item)}
                className="recent-entry flex items-start items-center gap-[10px] p-[10px] pr-[40px] rounded-[50px] text-[#282828] cursor-pointer hover:bg-[#282A2C]"
              >
                <FiMessageSquare className="text-[#E5E5E5]"/>
                <p className="text-[#E5E5E5]">{item.slice(0, 13)} ...</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div className="bottom flex flex-col">
        <div className="text-[#E5E5E5] bottom-item recent-entry flex items-start gap-[10px] p-[15px] pl-[14px] rounded-[50px] text-[#282828] cursor-pointer hover:bg-[#303131] cursor-pointer">
          <IoMdHelpCircleOutline size={25} />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item text-[#E5E5E5] recent-entry flex items-start gap-[10px] p-[15px] rounded-[50px] text-[#282828] cursor-pointer hover:bg-[#303131] cursor-pointer">
          <FaHistory size={21} />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item text-[#E5E5E5] recent-entry flex items-start gap-[10px] p-[15px] rounded-[50px] text-[#282828] cursor-pointer hover:bg-[#303131] cursor-pointer">
          <IoSettingsSharp size={21} />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
