import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import { ArrowLeft } from "lucide-react"; 
import dataJSON from "./data.json";
import type { Comment, CommentData, Reply } from "./types";
import CommentCard from "./CommentCard";
import AddComment from "./AddComment";

export default function InteractiveComments() {
  const [data, setData] = useState<CommentData>(() => {
    const saved = localStorage.getItem("fm-comments-data");
    return saved ? JSON.parse(saved) : dataJSON;
  });

  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem("fm-comments-data", JSON.stringify(data));
  }, [data]);

  const handleAddComment = (content: string) => {
    const newComment: Comment = {
      id: crypto.getRandomValues(new Uint32Array(1))[0],
      content,
      createdAt: "Just now",
      score: 0,
      user: data.currentUser,
      replies: []
    };
    setData(prev => ({ ...prev, comments: [...prev.comments, newComment] }));
  };

  const handleReply = (content: string, commentId: number, replyingTo: string) => {
    const newReply: Reply = {
      id: crypto.getRandomValues(new Uint32Array(1))[0],
      content,
      createdAt: "Just now",
      score: 0,
      replyingTo,
      user: data.currentUser
    };

    setData(prev => ({
      ...prev,
      comments: prev.comments.map(c => 
        c.id === commentId ? { ...c, replies: [...c.replies, newReply] } : 
        c.replies.some(r => r.id === commentId) ? { ...c, replies: [...c.replies, newReply] } : c
      )
    }));
  };

  const handleEdit = (id: number, content: string) => {
    setData(prev => ({
      ...prev,
      comments: prev.comments.map(c => 
        c.id === id ? { ...c, content } : 
        { ...c, replies: c.replies.map(r => r.id === id ? { ...r, content } : r) }
      )
    }));
  };

  const handleScore = (id: number, delta: number) => {
    setData(prev => ({
      ...prev,
      comments: prev.comments.map(c => 
        c.id === id ? { ...c, score: c.score + delta } : 
        { ...c, replies: c.replies.map(r => r.id === id ? { ...r, score: r.score + delta } : r) }
      )
    }));
  };

  const confirmDelete = () => {
    if (deleteId) {
      setData(prev => ({
        ...prev,
        comments: prev.comments
          .filter(c => c.id !== deleteId)
          .map(c => ({ ...c, replies: c.replies.filter(r => r.id !== deleteId) }))
      }));
      setDeleteId(null);
    }
  };

  return (
    <main className="min-h-screen py-8 px-4 md:py-16 bg-[#f5f6fa] force-light font-rubik text-left">
      <div className="max-w-182.5 mx-auto">
        
        {/* GERİ DÖN BUTONU */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 mb-8 font-bold transition-all text-[#67727e] hover:text-[#334253] group"
        >
          <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
          Back to Hub
        </Link>

        {/* YORUM LİSTESİ */}
        <div className="space-y-5">
          {data.comments.sort((a, b) => b.score - a.score).map((comment) => (
            <div key={comment.id} className="space-y-5">
              <CommentCard item={comment} currentUser={data.currentUser}
                onReply={(c) => handleReply(c, comment.id, comment.user.username)}
                onDelete={setDeleteId} onEdit={handleEdit} onScoreChange={handleScore} />
              {comment.replies.length > 0 && (
                <div className="flex flex-col gap-5 pl-4 ml-4 border-l-2 md:pl-10 border-slate-200 md:ml-10">
                  {comment.replies.map((reply) => (
                    <CommentCard key={reply.id} item={reply} currentUser={data.currentUser}
                      onReply={(c) => handleReply(c, comment.id, reply.user.username)}
                      onDelete={setDeleteId} onEdit={handleEdit} onScoreChange={handleScore} />
                  ))}
                </div>
              )}
            </div>
          ))}
          <AddComment currentUser={data.currentUser} buttonText="Send" onSend={handleAddComment} />
        </div>
      </div>

      {/* SİLME ONAY MODALI */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full space-y-4 duration-200 bg-white rounded-lg shadow-2xl p-7 md:p-8 max-w-100 animate-in zoom-in-95">
            <h2 className="text-2xl font-bold text-[#334253]">Delete comment</h2>
            <p className="text-[#67727e] leading-relaxed">Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
            <div className="flex gap-4 pt-2">
              <button onClick={() => setDeleteId(null)} className="flex-1 bg-[#67727e] text-white py-3 rounded-lg font-bold uppercase hover:opacity-70 transition-opacity">No, Cancel</button>
              <button onClick={confirmDelete} className="flex-1 bg-[#ed6368] text-white py-3 rounded-lg font-bold uppercase hover:opacity-70 transition-opacity">Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}