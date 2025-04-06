// components/DoctorModal.jsx
import React, { useState } from "react";

const DoctorModal = ({ doctor, onClose }) => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMsg, setInputMsg] = useState("");

  const sendMessage = () => {
    if (inputMsg.trim() !== "") {
      setMessages([...messages, { text: inputMsg, sender: "user" }]);
      setInputMsg("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-[#F4EBDC] p-6 rounded-2xl w-full max-w-4xl shadow-lg relative border border-[#C8B6A6] flex gap-6">
        {/* Profile Section */}
        <div className="w-1/2">
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-[#6C757D] hover:text-[#A4161A] text-xl"
          >
            &times;
          </button>
          <div className="flex flex-col items-center text-center space-y-4">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-24 h-24 rounded-full border-4 border-[#B08968]"
            />
            <h2 className="text-xl font-bold text-[#3A506B]">{doctor.name}</h2>
            <p className="text-[#6C757D]">{doctor.specialization}</p>
            <div className="flex gap-4 mt-4">
              <button className="bg-[#3A506B] text-white px-4 py-2 rounded-xl hover:bg-[#2b3c51]">Call</button>
              <button
                className="bg-[#B08968] text-white px-4 py-2 rounded-xl hover:bg-[#a17759]"
                onClick={() => setShowChat(true)}
              >
                Message
              </button>
              <button className="bg-[#6C757D] text-white px-4 py-2 rounded-xl hover:bg-[#5a6168]">Video</button>
            </div>
          </div>
        </div>

        {/* Chat Section */}
        {showChat && (
          <div className="w-1/2 flex flex-col bg-white/60 rounded-2xl p-4 border border-[#D8C3A5]">
            <div className="flex items-center space-x-4 mb-4 border-b pb-2">
              <img src={doctor.image} className="w-10 h-10 rounded-full border" alt="Doctor" />
              <h3 className="font-semibold text-[#3A506B]">{doctor.name}</h3>
            </div>
            <div className="flex-1 overflow-y-auto h-64 space-y-2 p-2">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-xl max-w-[75%] ${
                    msg.sender === "user"
                      ? "bg-[#3A506B] text-white self-end ml-auto"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="mt-2 flex">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 rounded-l-xl bg-[#F4EBDC] border border-r-0 border-[#C8B6A6] focus:outline-none"
              />
              <button
                onClick={sendMessage}
                className="bg-[#3A506B] text-white px-4 py-2 rounded-r-xl hover:bg-[#2b3c51]"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorModal;
