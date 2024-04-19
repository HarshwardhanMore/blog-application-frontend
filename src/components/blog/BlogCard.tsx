import { CircleUserRound, MessageCircle, Send, ThumbsUp } from "lucide-react";
import React from "react";

const BlogCard = ({ data }: any) => {
  return (
    <div className="w-full flex flex-col items-start">
      <div className="flex items-center gap-x-2.5 text-sm mb-2.5">
        <span>
          <CircleUserRound size={26} strokeWidth={1} color="black" />
        </span>
        <span className="font-normal">{data?.createdByUser?.firstname + ' ' + data?.createdByUser?.lastname}</span>
        <span className="font-normal text-gray-500 text-xs">
          |&nbsp;&nbsp;&nbsp;{data?.createdAt}
        </span>
      </div>
      <h2 className="text-xl font-bold mb-1">{data?.title}</h2>
      <div className=" mb-2.5">
        <p className="">{data?.description}</p>
        <span></span>
      </div>
      <div className="flex mb-2.5">
        <div className="flex gap-x-2.5 items-center *:cursor-pointer">
          <span>
            <ThumbsUp size={20} color="#2b2c34" strokeWidth={1} />
          </span>
          <span className="relative">
            <MessageCircle size={20} color="#2b2c34" strokeWidth={1} />
            <span className="rounded-full bg-primary absolute -bottom-2 -right-1.5 w-4 h-4 flex items-center justify-center p-1 text-[11px] text-light">
              {data?.countOfComments}
            </span>
          </span>
          <span>
            <Send size={20} color="#2b2c34" strokeWidth={1} />
          </span>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default BlogCard;
