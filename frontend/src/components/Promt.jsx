import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Paperclip, ArrowUp, Globe, Bot } from "lucide-react";
import logo from "../../public/logo.png";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow as codeTheme } from "react-syntax-highlighter/dist/esm/styles/prism";

function Promt() {
  const [inputValue, setInputValue] = useState("");
  const [typeMessage, setTypeMessage] = useState("");
  const [promt, setPromt] = useState([]);
  const [loading, setLoading] = useState(false);
  const promtEndRef = useRef();

  useEffect(() => {
    try {
      const rawUser = localStorage.getItem("user");
      if (rawUser && rawUser !== "undefined") {
        const user = JSON.parse(rawUser);
        const storedPromt = localStorage.getItem(`promtHistory_${user._id}`);
        if (storedPromt && storedPromt !== "undefined") {
          setPromt(JSON.parse(storedPromt));
        }
      }
    } catch (err) {
      console.error("Error loading user or promtHistory:", err.message);
    }
  }, []);

  useEffect(() => {
    try {
      const rawUser = localStorage.getItem("user");
      if (rawUser && rawUser !== "undefined") {
        const user = JSON.parse(rawUser);
        localStorage.setItem(`promtHistory_${user._id}`, JSON.stringify(promt));
      }
    } catch (err) {
      console.error("Error saving promtHistory:", err.message);
    }
  }, [promt]);

  useEffect(() => {
    promtEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [promt, loading]);

  const handleSend = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    setInputValue("");
    setTypeMessage(trimmed);
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      // Send JSON, not FormData
      const { data } = await axios.post(
        "http://localhost:4002/api/v1/prompts",
        { content: trimmed }, // JSON payload
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setPromt((prev) => {
        if (!Array.isArray(prev)) {
          console.warn("Previous promt state is not an array:", prev);
          return [
            { role: "user", content: trimmed },
            { role: "assistant", content: data.reply || "No reply from server" },
          ];
        }
        return [
          ...prev,
          { role: "user", content: trimmed },
          { role: "assistant", content: data.reply || "No reply from server" },
        ];
      });
    } catch (error) {
      console.error("API Error:", error);
      setPromt((prev) => {
        if (!Array.isArray(prev)) {
          console.warn("Previous promt state is not an array:", prev);
          return [
            { role: "user", content: trimmed },
            { role: "assistant", content: "❌ Something went wrong with the AI response." },
          ];
        }
        return [
          ...prev,
          { role: "user", content: trimmed },
          {
            role: "assistant",
            content: "❌ Something went wrong with the AI response.",
          },
        ];
      });
    } finally {
      setLoading(false);
      setTypeMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
      <style>{`
        .chat-scrollbar::-webkit-scrollbar {
          width: 10px;
        }
        .chat-scrollbar::-webkit-scrollbar-track {
          background: #1f1f1f;
        }
        .chat-scrollbar::-webkit-scrollbar-thumb {
          background-color: #6b7280;
          border-radius: 10px;
          border: 2px solid #1f1f1f;
        }
        .chat-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #6b7280 #1f1f1f;
        }
      `}</style>

      <div className="h-full md:h-screen flex flex-col justify-between p-4 overflow-y-auto">
        {/* Header */}
        <div className="mt-8 md:mt-16 text-center">
          <div className="flex items-center justify-center gap-2">
            <img src={logo} alt="DeepSeek Logo" className="h-6 md:h-8" />
            <h1 className="text-2xl md:text-3xl font-semibold text-white mb-2">
              Hi, I'm DeepSeek.
            </h1>
          </div>
          <p className="text-gray-400 text-base md:text-sm mt-2">
            💬 How can I help you today?
          </p>
        </div>

        {/* Chat history */}
        <div className="w-full max-w-4xl flex-1 mt-6 mb-4 space-y-4 h-[60vh] px-1 overflow-y-auto chat-scrollbar">
          {promt.map((msg, index) => (
            <div
              key={index}
              className={`w-full flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "assistant" ? (
                <div className="w-full bg-[#232323] text-white rounded-xl px-4 py-3 text-sm whitespace-pre-wrap">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={codeTheme}
                            language={match[1]}
                            PreTag="div"
                            className="rounded-lg mt-2"
                            {...props}
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        ) : (
                          <code
                            className="bg-gray-800 px-1 py-0.5 rounded"
                            {...props}
                          >
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
              ) : (
                <div className="w-[30%] bg-blue-600 text-white rounded-xl px-4 py-3 text-sm whitespace-pre-wrap self-start">
                  {msg.content}
                </div>
              )}
            </div>
          ))}

          {loading && typeMessage && (
            <div className="whitespace-pre-wrap px-4 py-3 rounded-2xl text-sm break-words bg-blue-600 text-white self-end ml-auto max-w-[40%]">
              {typeMessage}
            </div>
          )}

          {loading && (
            <div className="flex justify-start w-full">
              <div className="bg-[#2f2f2f] text-white px-4 py-3 rounded-xl text-sm animate-pulse">
                🤖Loading...
              </div>
            </div>
          )}

          <div ref={promtEndRef} />
        </div>

        {/* Message input */}
        <div className="w-full max-w-4xl relative mt-auto">
          <div className="bg-[#2f2f2f] rounded-[2rem] px-4 md:px-6 py-6 md:py-8 shadow-md">
            <input
              type="text"
              placeholder="💬 Message DeepSeek"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent w-full text-white placeholder-gray-400 text-base md:text-lg outline-none"
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-4">
              <div className="flex gap-2 flex-wrap">
                <button className="flex items-center gap-2 border border-gray-500 text-white text-sm md:text-base px-3 py-1.5 rounded-full hover:bg-gray-600 transition">
                  <Bot className="w-4 h-4" />
                  DeepThink (R1)
                </button>
                <button className="flex items-center gap-2 border border-gray-500 text-white text-sm md:text-base px-3 py-1.5 rounded-full hover:bg-gray-600 transition">
                  <Globe className="w-4 h-4" />
                  Search
                </button>
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <button className="text-gray-400 hover:text-white transition">
                  <Paperclip className="w-5 h-5" />
                </button>
                <button
                  onClick={handleSend}
                  className="bg-gray-500 hover:bg-blue-600 p-2 rounded-full text-white transition"
                  aria-label="Send message"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Promt;
