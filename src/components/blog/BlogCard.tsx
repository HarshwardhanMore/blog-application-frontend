import {
  CircleUserRound,
  MessageCircle,
  Send,
  ThumbsUp,
  Trash2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { getToken } from "@/helpers/Auth";
import User from "@/components/User";
const BlogCard = ({ data }: any) => {
  // console.log("BlogCard :: ", data?.isBlogLikedByUser);
  // console.log("BlogCard type :: ", typeof data?.isBlogLikedByUser);
  const [blogLiked, setBlogLiked] = useState(false);
  const [blogVisibility, setBlogVisibility] = useState(true);

  // if (data) {
  //   console.log(" blogLiked : ", data?.isBlogLikedByUser);
  // }

  useEffect(() => {
    setBlogLiked(data?.isBlogLikedByUser);
  }, [data?.isBlogLikedByUser]);

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

  const deleteBlog = async (id: any) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/blog/delete",
        {
          id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200 && response?.data?.error == false) {
        setBlogVisibility(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const onClickShare = (title: any, id: any) => {
    const url = window.location.href;
    const titleUrl = title.split(" ").join("%20");
    const blogIdUrl = `?blogid=${id}`;

    navigator.clipboard.writeText(url + titleUrl + blogIdUrl);

    toast.success("Share link has been copied to clipboard!");
  };

  return (
    <div
      className={`w-full flex-col items-start border-b border-[#f1b14359] pb-6 mb-4 ${
        !blogVisibility ? "hidden" : "flex"
      }`}
    >
      <div className="flex items-center gap-x-2.5 text-sm mb-2.5">
        <span>
          {/* <CircleUserRound size={26} strokeWidth={1} color="black" /> */}
          <User size="small" />
        </span>
        <span className="font-normal">
          {data?.createdByUser?.firstname + " " + data?.createdByUser?.lastname}
        </span>
        <span className="font-normal text-gray-500 text-xs">
          |&nbsp;&nbsp;&nbsp;{data?.createdAt}
        </span>
      </div>
      <h2 className="text-xl font-bold mb-1 hover:text-primary transition-colors">
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
      <div className="w-full flex mb-2.5">
        <div className="w-full flex gap-x-2.5 items-center *:cursor-pointer">
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
          <span
            onClick={() => {
              onClickShare(data?.title, data?.id);
            }}
          >
            <Send size={20} color="#2b2c34" strokeWidth={1} />
          </span>
          {data && data?.isMyBlogs && (
            <div className="flex justify-end items-center flex-1">
              <span
                onClick={() => {
                  deleteBlog(data?.id);
                }}
              >
                <Trash2 size={18} color="red" strokeWidth={1.5} />
              </span>
            </div>
          )}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default BlogCard;
