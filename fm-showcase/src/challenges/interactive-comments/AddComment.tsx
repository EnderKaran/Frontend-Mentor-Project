import { useState } from "react";
import { avatars, type AvatarKey } from "./avatars";

interface AddCommentProps {
  currentUser: { username: string };
  buttonText: string;
  onSend: (content: string) => void;
  initialValue?: string;
}

export default function AddComment({ currentUser, buttonText, onSend, initialValue = "" }: AddCommentProps) {
  const [content, setContent] = useState(initialValue);

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSend(content);
    setContent("");
  };

  return (
    <div className="flex flex-col items-start gap-4 p-4 bg-white border rounded-lg shadow-sm md:p-6 md:flex-row border-slate-100">
      <img src={avatars[currentUser.username as AvatarKey]} alt="" className="hidden w-8 h-8 md:block" />
      <textarea
        className="flex-1 w-full border border-slate-200 rounded-lg p-3 h-24 resize-none focus:border-[#5357b6] outline-none text-[#67727e]"
        placeholder="Add a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex items-center justify-between w-full md:w-auto">
        <img src={avatars[currentUser.username as AvatarKey]} alt="" className="w-8 h-8 md:hidden" />
        <button onClick={handleSubmit} className="bg-[#5357b6] text-white px-6 py-3 rounded-lg font-bold hover:opacity-50 transition-opacity uppercase">
          {buttonText}
        </button>
      </div>
    </div>
  );
}