import { useState } from "react";
import dataJSON from "./data.json";
import type { CommentData } from "./types";
import CommentCard from "./CommentCard";

export default function InteractiveComments() {
  const [data] = useState<CommentData>(dataJSON);

  return (
    // 'force-light' ekleyerek üstten gelen dark mod etkisini kırdık
    <main className="min-h-screen py-8 px-4 md:py-16 bg-[#f5f6fa] force-light">
      <div className="max-w-[730px] mx-auto space-y-5">
        
        {data.comments.map((comment) => (
          <div key={comment.id} className="space-y-5">
            <CommentCard item={comment} currentUser={data.currentUser} />
            
            {comment.replies.length > 0 && (
              <div className="flex flex-col gap-5 pl-4 md:pl-10 border-l-2 border-slate-200 ml-4 md:ml-10">
                {comment.replies.map((reply) => (
                  <CommentCard key={reply.id} item={reply} currentUser={data.currentUser} />
                ))}
              </div>
            )}
          </div>
        ))}
        
      </div>
    </main>
  );
}