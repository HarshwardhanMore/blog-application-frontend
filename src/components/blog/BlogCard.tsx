import { CircleUserRound, MessageCircle, Send, ThumbsUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { getToken } from "@/helpers/Auth";

const BlogCard = ({ data, isBlogLikedByUser }: any) => {
  // console.log("BlogCard :: ", data?.isBlogLikedByUser);
  // console.log("BlogCard type :: ", typeof data?.isBlogLikedByUser);
  const [blogLiked, setBlogLiked] = useState(false);

  if (data) {
    console.log(" blogLiked : ", isBlogLikedByUser);
  }

  useEffect(() => {
    setBlogLiked(isBlogLikedByUser);
  }, [isBlogLikedByUser]);

  const accessToken = getToken();

  // useEffect(() => {
  //   // setBlogLiked(isBlogLikedByUser);
  //   if (data?.blogId == 1) {
  //     console.log(" blogLiked : ", blogLiked);
  //   }
  // }, []);

  const likeBlog = async (blogid: any) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/blog/like",
        {
          blogid,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200 && response?.data?.error == false) {
        console.log(response.data.message);
        setBlogLiked(true); // Update blogLiked state to true if the like is successful
      } else {
        console.log(response.data.message);
        setBlogLiked(false); // Update blogLiked state to false if the like is not successful
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full flex flex-col items-start">
      <div className="flex items-center gap-x-2.5 text-sm mb-2.5">
        <span>
          <CircleUserRound size={26} strokeWidth={1} color="black" />
        </span>
        <span className="font-normal">
          {data?.createdByUser?.firstname + " " + data?.createdByUser?.lastname}
        </span>
        <span className="font-normal text-gray-500 text-xs">
          |&nbsp;&nbsp;&nbsp;{data?.createdAt}
        </span>
      </div>
      <h2 className="text-xl font-bold mb-1">
        <Link
          href={{
            pathname: `/${data?.title}`,
            query: { blogid: data?.id },
          }}
        >
          {data?.title}
        </Link>
      </h2>
      <div className=" mb-2.5">
        <p className="">{data?.description}</p>
        <span></span>
      </div>
      <div className="flex mb-2.5">
        <div className="flex gap-x-2.5 items-center *:cursor-pointer">
          <span
            onClick={() => {
              likeBlog(data?.id);
            }}
          >
            <ThumbsUp
              size={20}
              color={`${blogLiked == true ? "#f1b143" : "#2b2c34"}`}
              fill={`${blogLiked == true ? "#f1b143" : "transparent"}`}
              strokeWidth={1}
            />
          </span>
          <Link
            href={{
              pathname: `/${data?.title}`,
              query: { blogid: data?.id },
            }}
            className="relative"
          >
            <MessageCircle size={20} color="#2b2c34" strokeWidth={1} />
            <span className="rounded-full bg-primary absolute -bottom-2 -right-1.5 w-4 h-4 flex items-center justify-center p-1 text-[11px] text-light">
              {data?.countOfComments}
            </span>
          </Link>
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
