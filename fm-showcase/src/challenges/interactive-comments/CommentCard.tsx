import { useState } from "react";
import type { User, Comment, Reply } from "./types";
import { avatars, type AvatarKey } from "./avatars";
import AddComment from "./AddComment";

import iconDelete from './interactive-comments-images/icon-delete.svg';
import iconEdit from './interactive-comments-images/icon-edit.svg';
import iconReply from './interactive-comments-images/icon-reply.svg';
import iconPlus from './interactive-comments-images/icon-plus.svg';
import iconMinus from './interactive-comments-images/icon-minus.svg';

interface CommentCardProps {
  item: Comment | Reply;
  currentUser: User;
  onReply: (content: string) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, content: string) => void;
  onScoreChange: (id: number, delta: number) => void;
}

export default function CommentCard({ item, currentUser, onReply, onDelete, onEdit, onScoreChange }: CommentCardProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(item.content);

  const isCurrentUser = item.user.username === currentUser.username;

  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex flex-col gap-4 p-4 bg-white border rounded-lg shadow-sm md:p-6 md:flex-row md:gap-6 border-slate-50">
        <div className="flex md:flex-col items-center justify-between bg-[#f2f4f7] p-2 rounded-xl w-24 md:w-10 h-10 md:h-24 order-2 md:order-1">
          <button onClick={() => onScoreChange(item.id, 1)} className="p-1 transition-opacity hover:opacity-50">
            <img src={iconPlus} alt="+" />
          </button>
          <span className="text-[#5357b6] font-bold">{item.score}</span>
          <button onClick={() => onScoreChange(item.id, -1)} className="p-1 transition-opacity hover:opacity-50">
            <img src={iconMinus} alt="-" />
          </button>
        </div>

        <div className="flex-1 order-1 md:order-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <img src={avatars[item.user.username as AvatarKey]} alt="" className="w-8 h-8 rounded-full" />
              <span className="font-bold text-[#334253]">{item.user.username}</span>
              {isCurrentUser && <span className="bg-[#5357b6] text-white text-[10px] px-1.5 py-0.5 rounded-sm font-medium">you</span>}
              <span className="text-[#67727e]">{item.createdAt}</span>
            </div>
            <div className="items-center hidden gap-4 md:flex">
              {isCurrentUser ? (
                <>
                  <button onClick={() => onDelete(item.id)} className="flex items-center gap-2 text-[#ed6368] font-bold hover:opacity-50 transition-opacity text-sm">
                    <img src={iconDelete} alt="" /> Delete
                  </button>
                  <button onClick={() => setIsEditing(!isEditing)} className="flex items-center gap-2 text-[#5357b6] font-bold hover:opacity-50 transition-opacity text-sm">
                    <img src={iconEdit} alt="" /> Edit
                  </button>
                </>
              ) : (
                <button onClick={() => setIsReplying(!isReplying)} className="flex items-center gap-2 text-[#5357b6] font-bold hover:opacity-50 transition-opacity text-sm">
                  <img src={iconReply} alt="" /> Reply
                </button>
              )}
            </div>
          </div>

          {isEditing ? (
            <div className="flex flex-col items-end gap-4">
              <textarea 
                title="Edit comment"
                placeholder="Edit your comment..."
                className="w-full p-3 border rounded-lg resize-none border-slate-200 text-[#67727e] focus:border-[#5357b6] outline-none"
                value={editContent} onChange={(e) => setEditContent(e.target.value)} rows={3}
              />
              <button onClick={() => { onEdit(item.id, editContent); setIsEditing(false); }} className="bg-[#5357b6] text-white px-6 py-2.5 rounded-lg font-bold hover:opacity-50 uppercase">Update</button>
            </div>
          ) : (
            <p className="text-[#67727e] leading-relaxed">
              {'replyingTo' in item && <span className="text-[#5357b6] font-bold mr-1">@{item.replyingTo}</span>}
              {item.content}
            </p>
          )}
        </div>

        <div className="absolute flex items-center gap-4 md:hidden bottom-6 right-4">
          {isCurrentUser ? (
             <>
             <button onClick={() => onDelete(item.id)} className="flex items-center gap-2 text-[#ed6368] font-bold text-sm"><img src={iconDelete} alt="" /> Delete</button>
             <button onClick={() => setIsEditing(!isEditing)} className="flex items-center gap-2 text-[#5357b6] font-bold text-sm"><img src={iconEdit} alt="" /> Edit</button>
           </>
          ) : (
            <button onClick={() => setIsReplying(!isReplying)} className="flex items-center gap-2 text-[#5357b6] font-bold text-sm"><img src={iconReply} alt="" /> Reply</button>
          )}
        </div>
      </div>
      {isReplying && <AddComment currentUser={currentUser} buttonText="Reply" onSend={(c) => { onReply(c); setIsReplying(false); }} />}
    </div>
  );
}