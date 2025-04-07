// src/components/DoctorModal.jsx
import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

const DoctorModal = ({ doctor, onClose }) => {
  const [peer, setPeer] = useState(null);
  const [conn, setConn] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMsg, setInputMsg] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [peerId, setPeerId] = useState("");
  const [callType, setCallType] = useState(null);
  const [inCall, setInCall] = useState(false);
  const myVideo = useRef(null);
  const userVideo = useRef(null);

  useEffect(() => {
    const newPeer = new Peer();

    newPeer.on("open", (id) => {
      setPeerId(id);
      console.log("My peer ID is:", id);
    });

    newPeer.on("connection", (connection) => {
      setConn(connection);
      connection.on("data", (data) => {
        setMessages((prev) => [...prev, { text: data, sender: "doctor" }]);
      });
    });

    newPeer.on("call", (incomingCall) => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        myVideo.current.srcObject = stream;
        myVideo.current.play();
        incomingCall.answer(stream);
        incomingCall.on("stream", (remoteStream) => {
          userVideo.current.srcObject = remoteStream;
          userVideo.current.play();
          setInCall(true);
        });
      });
    });

    setPeer(newPeer);
    return () => newPeer.destroy();
  }, []);

  const connectToDoctor = () => {
    const connection = peer.connect(doctor.peerId);
    setConn(connection);
    connection.on("data", (data) => {
      setMessages((prev) => [...prev, { text: data, sender: "doctor" }]);
    });
  };

  const sendMessage = () => {
    if (inputMsg.trim() && conn) {
      conn.send(inputMsg);
      setMessages((prev) => [...prev, { text: inputMsg, sender: "user" }]);
      setInputMsg("");
    }
  };

  const startCall = async (type) => {
    setCallType(type);
    const stream = await navigator.mediaDevices.getUserMedia({
      video: type === "video",
      audio: true,
    });
    myVideo.current.srcObject = stream;
    myVideo.current.play();

    const call = peer.call(doctor.peerId, stream);
    call.on("stream", (remoteStream) => {
      userVideo.current.srcObject = remoteStream;
      userVideo.current.play();
      setInCall(true);
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-[#F4EBDC] p-6 rounded-2xl w-full max-w-4xl shadow-lg relative border border-[#C8B6A6] flex gap-6">
        <div className="w-1/2 relative">
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
              <button
                className="bg-[#3A506B] text-white px-4 py-2 rounded-xl"
                onClick={() => startCall("audio")}
              >
                Call
              </button>
              <button
                className="bg-[#B08968] text-white px-4 py-2 rounded-xl"
                onClick={() => {
                  setShowChat(true);
                  connectToDoctor();
                }}
              >
                Message
              </button>
              <button
                className="bg-[#6C757D] text-white px-4 py-2 rounded-xl"
                onClick={() => startCall("video")}
              >
                Video
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Your Peer ID: <span className="font-mono">{peerId}</span>
            </p>
          </div>
        </div>

        {/* 💬 Real-time Chat */}
        {showChat && (
          <div className="w-1/2 flex flex-col bg-white/60 rounded-2xl p-4 border border-[#D8C3A5]">
            <div className="flex-1 overflow-y-auto h-64 space-y-2 p-2">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-xl max-w-[75%] ${
                    msg.sender === "user"
                      ? "bg-[#3A506B] text-white ml-auto"
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
                className="flex-1 px-4 py-2 rounded-l-xl bg-[#F4EBDC] border border-r-0"
              />
              <button
                onClick={sendMessage}
                className="bg-[#3A506B] text-white px-4 py-2 rounded-r-xl"
              >
                Send
              </button>
            </div>
          </div>
        )}

        {/* 📹 Video/Audio Call UI */}
        {inCall && (
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white border rounded-xl shadow-xl p-4 z-50 w-[90%] max-w-2xl">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-[#3A506B] font-bold text-lg">
                {callType === "video" ? "Video" : "Audio"} Call with {doctor.name}
              </h2>
              <button
                onClick={() => window.location.reload()}
                className="text-red-600 hover:text-red-800 font-semibold"
              >
                End Call
              </button>
            </div>
            <div className="flex gap-4 justify-center items-center">
              <video ref={myVideo} muted autoPlay className="w-1/2 rounded-xl" />
              <video ref={userVideo} autoPlay className="w-1/2 rounded-xl" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorModal;
