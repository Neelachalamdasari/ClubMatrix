import { useState } from "react";
import { askAssistant } from "../services/aiService";

function AIAssistant({ compact = false }) {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAskAI = async () => {
    if (!prompt.trim()) return;

    try {
      setLoading(true);
      const data = await askAssistant(prompt);
      setReply(data.reply);
    } catch (error) {
      console.error("AI Communication Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAskAI();
    }
  };

  return (
    <div 
      className={`${compact ? "" : "mt-14"} bg-[#120a0a]! border border-red-900/40 p-4 rounded-2xl shadow-xl transition-all duration-300 text-white!`}
    >
      <h2 className={`font-bold text-red-100 tracking-tight flex items-center gap-2 ${compact ? "text-sm mb-3" : "text-2xl mb-5"}`}>
        <span className="w-1 h-4 bg-red-800 rounded-full"></span>
        AI Assistant
      </h2>

      
      <textarea
        placeholder="Ask AI anything about documentation, tasks, or event management..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={compact ? 3 : 4}
        className="w-full p-3 rounded-xl bg-[#1e1414]! border border-red-900/50 text-white! placeholder-gray-500! outline-none focus:border-red-700/80 transition-all text-xs sm:text-sm resize-none"
      />

      <button
        type="button"
        onClick={handleAskAI}
        disabled={loading}
        className="mt-3 w-full bg-red-900/60 hover:bg-red-800/70 border border-red-800/40 text-red-100 font-semibold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-black/40"
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {reply && (
        <div className="mt-4 bg-[#0a0505] border border-red-950/60 p-3 rounded-xl max-h-48 overflow-y-auto shadow-inner shadow-black">
          <h3 className="font-bold text-xs mb-2 text-red-400/80 uppercase tracking-wider">
            AI Response
          </h3>
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
            {reply}
          </p>
        </div>
      )}
    </div>
  );
}

export default AIAssistant;