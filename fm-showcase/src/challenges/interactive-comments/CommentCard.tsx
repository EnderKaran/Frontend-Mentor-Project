import type { User, Comment, Reply } from "./types";

interface CommentCardProps {
  item: Comment | Reply;
  currentUser: User;
}

import iconDelete from './interactive-comments-images/icon-delete.svg';
import iconEdit from './interactive-comments-images/icon-edit.svg';
import iconMinus from './interactive-comments-images/icon-minus.svg';
import iconPlus from './interactive-comments-images/icon-plus.svg';
import iconReply from './interactive-comments-images/icon-reply.svg';


export default function CommentCard({ item, currentUser }: CommentCardProps) {
  const isCurrentUser = item.user.username === currentUser.username;

  // Resim yolunu garantiye al: Eğer yol ./ ile başlıyorsa public klasörü için düzelt
  const fixImagePath = (path: string) => {
    if (path.startsWith('./')) return path.substring(1);
    return path;
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm flex flex-col md:flex-row gap-4 md:gap-6 relative">
      
      {/* 1. SKOR BUTONU - Renkleri sabitledik */}
      <div className="flex md:flex-col items-center justify-between bg-[#f2f4f7] p-2 rounded-xl w-24 md:w-10 h-10 md:h-24 order-2 md:order-1">
        <button className="text-[#c5c6ef] hover:text-[#5357b6] font-extrabold text-xl">+</button>
        <span className="text-[#5357b6] font-bold">{item.score}</span>
        <button className="text-[#c5c6ef] hover:text-[#5357b6] font-extrabold text-xl">-</button>
      </div>

      {/* 2. İÇERİK ALANI */}
      <div className="flex-1 order-1 md:order-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <img src={fixImagePath(item.user.image.png)} alt="" className="w-8 h-8 rounded-full" />
            <span className="font-bold text-[#334253]">{item.user.username}</span>
            {isCurrentUser && (
              <span className="bg-[#5357b6] text-white text-[10px] px-1.5 py-0.5 rounded-sm font-medium">you</span>
            )}
            <span className="text-[#67727e]">{item.createdAt}</span>
          </div>

          {/* Aksiyon Butonları */}
          <div className="hidden md:flex items-center gap-4">
            {isCurrentUser ? (
              <>
                <button className="flex items-center gap-2 text-[#ed6368] hover:opacity-50 font-bold transition-opacity">
                  <img src={iconDelete} alt="" /> Delete
                </button>
                <button className="flex items-center gap-2 text-[#5357b6] hover:opacity-50 font-bold transition-opacity">
                  <img src={iconEdit} alt="" /> Edit
                </button>
              </>
            ) : (
              <button className="flex items-center gap-2 text-[#5357b6] hover:opacity-50 font-bold transition-opacity">
                <img src={iconReply} alt="" /> Reply
              </button>
            )}
          </div>
        </div>

        <p className="text-[#67727e] leading-relaxed">
          {'replyingTo' in item && (
            <span className="text-[#5357b6] font-bold mr-1">@{item.replyingTo}</span>
          )}
          {item.content}
        </p>
      </div>

      {/* 3. MOBİL AKSİYON (Sağ Alt) */}
      <div className="md:hidden absolute bottom-6 right-4 flex items-center gap-4">
        {isCurrentUser ? (
           <>
           <button className="flex items-center gap-2 text-[#ed6368] font-bold"><img src={iconDelete} alt="" /> Delete</button>
           <button className="flex items-center gap-2 text-[#5357b6] font-bold"><img src={iconEdit} alt="" /> Edit</button>
         </>
        ) : (
          <button className="flex items-center gap-2 text-[#5357b6] font-bold">
            <img src={iconReply} alt="" /> Reply
          </button>
        )}
      </div>
    </div>
  );
}