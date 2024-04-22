"use client";

import CommentCard from "@/components/blog/CommentCard";
import { getToken } from "@/helpers/Auth";
import axios from "axios";
import {
  ArrowLeft, MessageCircle,
  Send,
  SendHorizonal,
  ThumbsUp
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import User from "@/components/User";

interface Blog {
  id: number;
  title: string;
  description: string;
  createdByUserId: number;
  createdAt: string; // Assuming it's a string representation of a date
  updatedAt: string; // Assuming it's a string representation of a date
  createdByUser: {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    createdAt: string; // Assuming it's a string representation of a date
    updatedAt: string; // Assuming it's a string representation of a date
  };
  likes: {
    id: number;
    blogId: number;
    userId: number;
    createdAt: string; // Assuming it's a string representation of a date
    user: {
      id: number;
      email: string;
      firstname: string;
      lastname: string;
      password: string;
      createdAt: string; // Assuming it's a string representation of a date
      updatedAt: string; // Assuming it's a string representation of a date
    };
  }[];
  comments: {
    id: number;
    blogId: number;
    comment: string;
    commentedByUserId: number;
    createdAt: string; // Assuming it's a string representation of a date
    updatedAt: string; // Assuming it's a string representation of a date
    commentedByUser: {
      id: number;
      email: string;
      firstname: string;
      lastname: string;
      password: string;
      createdAt: string; // Assuming it's a string representation of a date
      updatedAt: string; // Assuming it's a string representation of a date
    };
  }[];
  totalLikes: number;
  totalComments: number;
}

const convertDate = (dateStr: any) => {
  // Parse the input date string
  const parsedDate = new Date(dateStr);

  // Array of month names
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Extract year, month, and day from parsed date
  const year = parsedDate.getFullYear();
  const month = months[parsedDate.getMonth()];
  const day = parsedDate.getDate();

  // Format the date in the desired format
  const formattedDate = `${month} ${day}, ${year}`;

  return formattedDate;
};

const Page = () => {
  const searchParams = useSearchParams();
  const [data, setData] = useState<Blog | null>(null);
  const [blogid, setBlogid] = useState<string | null>(null);
  const [newComment, setNewComment] = useState<string>("");
  const accessToken = getToken();

  useEffect(() => {
    setBlogid(searchParams.get("blogid")); // Set blogid state using searchParams
  }, [searchParams]);

  const getBlogsData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:9000/api/blog/getBlogDetailsById",
        { blogid: parseInt(blogid!) },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
      setData(response?.data?.data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (blogid) {
      getBlogsData();
    }
  }, [blogid]);

  const postComment = async (data: any) => {
    try {
      const response: any = await axios.post(
        "http://localhost:9000/api/blog/comment",
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
      //   if (response.status === 200 && response?.data?.error == false) {
      getBlogsData();
      //   }
      return response;
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSumbit = () => {
    if (newComment != "") {
      const response = postComment({
        blogid: parseInt(blogid!),
        comment: newComment,
      });
      setNewComment("");

      toast.promise(response, {
        loading: "Posting Your Comment...",
        success: <p>Your Comment has been Added!</p>,
        error: <p>Unable to Add Your Comment</p>,
      });
    } else {
      toast.error("Please enter your comment");
    }
  };

  return (
    <main className="w-full flex flex-col">
      <main className="w-full flex-1 flex flex-col items-center gap-y-10">
        <section className="w-full flex flex-col gap-y-5 px-[25px] sm:px-0 sm:w-[550px] md:w-[700px] lg:w-[750px] pt-5 sm:pt-10 pb-2.5 sm:pb-5 sticky top-14 sm:top-20 bg-light z-10">
          <span
            onClick={() => {
              history.back();
            }}
            className="cursor-pointer"
          >
            <ArrowLeft size={24} strokeWidth={1.5} color="#f1b143" />
          </span>
          <div className="w-full flex flex-col items-start">
            <div className="w-full flex items-center justify-between text-sm mb-2.5">
              <span className="flex items-center gap-x-1">
                <span>
                  {/* <CircleUserRound size={30} strokeWidth={1} color="black" /> */}
                  <User size="medium" />
                </span>
                <span className="font-normal text-dark">
                  {data &&
                    data?.createdByUser.firstname! +
                      " " +
                      data?.createdByUser?.lastname}
                </span>
              </span>
              <span className="flex items-center gap-x-1">
                <span className="px-2 py-1 rounded-full bg-dark text-light text-xs">
                  Posted
                </span>
                <span className="font-normal text-gray-500 text-xs">
                  {convertDate(data?.createdAt)}
                </span>
              </span>
            </div>
            <h2 className="text-xl font-bold mb-1">{data?.title}</h2>
            <div className=" mb-2.5">
              <p className="">{data?.description}</p>
              <span></span>
            </div>
            <div className="w-full flex flex-col items-start gap-y-2.5 *:cursor-pointer">
              <div className="flex items-center gap-x-2.5">
                <span className="flex items-center gap-x-1">
                  <ThumbsUp
                    size={20}
                    color="#f1b143"
                    fill="#f1b143"
                    strokeWidth={1}
                  />
                  <span className="text-sm text-dark">+{data?.totalLikes}</span>
                </span>
                <span className="flex items-center gap-x-1">
                  <Send
                    size={20}
                    color="#f1b143"
                    fill="#f1b143"
                    strokeWidth={1}
                  />
                  <span className="text-sm text-dark">+0</span>
                </span>
              </div>
              <div className="w-full flex items-center gap-x-1">
                <MessageCircle
                  strokeWidth={1.5}
                  size={20}
                  color="#f1b143"
                  fill="#f1b143"
                />
                <span className=" text-primary">Comments</span>
              </div>

              <div className="w-full pl-6">
                <div className="w-full flex items-center text-sm border rounded-lg py-2 px-4 gap-x-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e: any) => {
                      setNewComment(e.target.value);
                    }}
                    className="flex-grow text-gray-600"
                    placeholder="Add Your Comment"
                  />
                  <button className="" onClick={handleSumbit}>
                    <SendHorizonal strokeWidth={1} size={20} />
                  </button>
                </div>
              </div>
              {data?.comments && data.comments.length > 0 ? (
                <div className="w-full flex flex-col items-start gap-y-2.5 pl-6">
                  {data.comments.map((item: any, index: number) => {
                    return (
                      <CommentCard
                        key={index}
                        data={{
                          ...item,
                          createdAt: convertDate(item?.createdAt),
                        }}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="w-full flex items-center justify-center py-5 text-sm text-dark">
                  No Comments Yet
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </main>
  );
};
export default Page;
