"use client";

import LoginPage from "@/components/auth/LoginPage";
import RegisterPage from "@/components/auth/RegisterPage";
import BlogCard from "@/components/blog/BlogCard";
import Link from "next/link";
import {
  BookPlus,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  CircleUserRound,
  FilterX,
  MessageCircle,
  Plus,
  Search,
  Send,
  SlidersHorizontal,
  ThumbsUp,
  UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getToken } from "@/helpers/Auth";
import axios from "axios";
import toast from "react-hot-toast";

// const data = [
//   {
//     id: 1,
//     title: "10 Tips for Productivity",
//     description:
//       "In this blog post, we'll explore 10 practical tips to boost your productivity and make the most out of your time. From time management techniques to effective task prioritization, these tips",
//     category_id: 6,
//     created_at: "2024-04-17 07:20:49.156",
//     updated_at: "2024-04-17 07:20:49.156",
//   },
//   {
//     id: 2,
//     title: "Healthy Eating Habits",
//     description:
//       "Discover the importance of maintaining healthy eating habits for a balanced lifestyle. In this blog post, we'll discuss the benefits of incorporating nutrient-rich foods into your diet, along",
//     category_id: 6,
//     created_at: "2024-04-17 07:21:11.255",
//     updated_at: "2024-04-17 07:21:11.255",
//   },
//   {
//     id: 3,
//     title: "Introduction to Machine Learning",
//     description:
//       "Learn the fundamentals of machine learning and its applications in various industries. In this blog post, we'll cover key concepts such as supervised learning, unsupervised learning, and neur",
//     category_id: 6,
//     created_at: "2024-04-17 07:21:28.030",
//     updated_at: "2024-04-17 07:21:28.030",
//   },
//   {
//     id: 4,
//     title: "Travel Photography Tips",
//     description:
//       "Capture stunning travel memories with these expert photography tips. From composition techniques to camera settings, this blog post will help you take your travel photography to the next leve",
//     category_id: 6,
//     created_at: "2024-04-17 07:21:37.466",
//     updated_at: "2024-04-17 07:21:37.466",
//   },
//   {
//     id: 5,
//     title: "Mindfulness Meditation Guide",
//     description:
//       "Discover the transformative power of mindfulness meditation. In this blog post, we'll explore the benefits of mindfulness practice for mental well-being, as well as simple meditation exercise",
//     category_id: 6,
//     created_at: "2024-04-17 07:21:47.486",
//     updated_at: "2024-04-17 07:21:47.486",
//   },
//   {
//     id: 6,
//     title: "The Art of Storytelling",
//     description:
//       "Uncover the secrets of compelling storytelling in this blog post. Learn how to captivate your audience, evoke emotions, and craft memorable narratives that resonate with readers.",
//     category_id: 5,
//     created_at: "2024-04-17 07:23:45.912",
//     updated_at: "2024-04-17 07:23:45.912",
//   },
//   {
//     id: 7,
//     title: "Effective Time Management",
//     description:
//       "Master the art of time management with proven strategies and techniques. This blog post will help you prioritize tasks, set achievable goals, and maximize your productivity.",
//     category_id: 5,
//     created_at: "2024-04-17 07:23:57.419",
//     updated_at: "2024-04-17 07:23:57.419",
//   },
//   {
//     id: 8,
//     title: "DIY Home Decor Ideas",
//     description:
//       "Get inspired to transform your living space with these creative DIY home decor ideas. From budget-friendly projects to upcycling tips, this blog post will help you personalize your home.",
//     category_id: 5,
//     created_at: "2024-04-17 07:24:07.774",
//     updated_at: "2024-04-17 07:24:07.774",
//   },
//   {
//     id: 9,
//     title: "Beginner's Guide to Gardening",
//     description:
//       "Embark on your gardening journey with confidence. This blog post covers the basics of gardening, including plant care tips, garden design principles, and common gardening mistakes to avoid.",
//     category_id: 4,
//     created_at: "2024-04-17 07:25:22.589",
//     updated_at: "2024-04-17 07:25:22.589",
//   },
//   {
//     id: 10,
//     title: "Essential Self-Care Practices",
//     description:
//       "Prioritize self-care and nurture your well-being with these essential practices. From mindfulness exercises to relaxation techniques, this blog post will help you create a self-care routine t",
//     category_id: 4,
//     created_at: "2024-04-17 07:25:38.858",
//     updated_at: "2024-04-17 07:25:38.858",
//   },
//   {
//     id: 11,
//     title: "Mastering Chess Strategy",
//     description:
//       "Unlock the secrets of chess strategy and elevate your game to the next level. In this blog post, we'll delve into advanced tactics, positional play, and opening principles to help you become ",
//     category_id: 3,
//     created_at: "2024-04-17 07:27:25.473",
//     updated_at: "2024-04-17 07:27:25.473",
//   },
//   {
//     id: 12,
//     title: "The Power of Positive Thinking",
//     description:
//       "Harness the power of positive thinking to transform your life. This blog post explores the benefits of adopting a positive mindset, overcoming negativity, and cultivating optimism in everyday",
//     category_id: 3,
//     created_at: "2024-04-17 07:27:43.370",
//     updated_at: "2024-04-17 07:27:43.370",
//   },
//   {
//     id: 13,
//     title: "Exploring World Cuisine",
//     description:
//       "Embark on a culinary adventure and explore the diverse flavors of world cuisine. From spicy curries to savory pastas, this blog post will introduce you to delicious dishes from around the glo",
//     category_id: 2,
//     created_at: "2024-04-17 07:29:30.617",
//     updated_at: "2024-04-17 07:29:30.617",
//   },
// ];

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

export default function Home() {
  const initialValues = { title: "", description: "" };
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sort, setSort] = useState(1);
  const [blogForm, setBlogForm] = useState(initialValues);
  const [filtersVisibility, setFiltersVisibility] = useState(false);
  const [likedBlogs, setLikedBlogs] = useState({});
  const [activity, setActivity] = useState<any>([]);

  const accessToken = getToken();

  const getBlogsData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/blog/getMyBlogs",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response?.data);
      setData(response?.data?.data);
      setFilteredData(response?.data?.data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getMyActivity = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/auth/getMyActivity",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setActivity(response?.data?.data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getBlogsData();
    getMyActivity();
  }, []);

  const sortByCreatedAtAsc = (data: any[]) => {
    return [...data].sort((a, b) => {
      return (
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    });
  };

  // Function to sort data by created_at in descending order
  const sortByCreatedAtDesc = (data: any[]) => {
    return [...data].sort((a, b) => {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });
  };

  // Function to search data by title
  const searchByTitle = (data: any, searchTerm: any) => {
    return data.filter((item: any) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Function to search data by author (assuming author information is available)
  const searchByAuthor = (searchTerm: any) => {
    setFilteredData(
      data.filter(
        (item: any) =>
          `${item.createdByUser?.firstname} ${item.createdByUser?.lastname}`.toLowerCase() ==
          searchTerm?.toLowerCase()
      )
    );
  };

  const handleSubmit = () => {
    console.log(blogForm);
    setBlogForm(initialValues);
  };

  return (
    <main className="w-full flex flex-col">
      <main className="w-full flex-1 flex flex-col items-center gap-y-10">
        <section className="w-full px-[25px] sm:px-0 sm:w-[550px] md:w-[700px] lg:w-[750px] flex flex-col gap-y-2.5 pt-5 sm:pt-10 pb-2.5 sm:pb-5 border-b sticky top-14 sm:top-20 bg-light z-10">
          <div className="w-full flex flex-col sm:flex-row items-center gap-y-2.5 sm:gap-y-0 sm:gap-x-2.5 md:gap-x-5">
            <div className="w-full sm:w-auto flex-grow flex items-center gap-x-2.5 bg-gray-50 rounded-lg px-2.5">
              <Search size={16} color="#f1b143" />
              <input
                name="titleSearch"
                id=""
                placeholder="Search for Blog"
                className="flex-grow py-2 bg-transparent text-sm text-dark *:text-light"
              />
            </div>
            {filtersVisibility && (
              <div className="w-full sm:w-auto flex flex-grow">
                <label
                  htmlFor=""
                  className={`flex-grow px-5 py-2 cursor-pointer text-sm rounded-l-lg text-center ${
                    sort == 2
                      ? "text-light bg-primary"
                      : "text-dark bg-gray-50 "
                  }`}
                  onClick={() => {
                    setSort(2);
                  }}
                >
                  Oldest Blogs
                </label>
                <label
                  htmlFor=""
                  className={`flex-grow px-5 py-2 cursor-pointer text-sm rounded-r-lg text-center ${
                    sort == 1
                      ? "text-light bg-primary"
                      : "text-dark bg-gray-50 "
                  }`}
                  onClick={() => {
                    setSort(1);
                  }}
                >
                  Latest Blogs
                </label>
              </div>
            )}
            {filtersVisibility && (
              <select
                name="author"
                id=""
                className="w-full sm:w-auto flex-grow px-5 py-2 cursor-pointer text-sm text-dark bg-gray-50 rounded-lg *:text-dark"
                onChange={(e) => {
                  searchByAuthor(e.target.value);
                }}
              >
                <option value="" disabled selected>
                  Author
                </option>
                {data?.map((item: any, index: number) => {
                  return (
                    <option
                      key={index}
                      value={`${item?.createdByUser?.firstname} ${item?.createdByUser?.lastname}`}
                    >
                      {`${item?.createdByUser?.firstname} ${item?.createdByUser?.lastname}`}
                    </option>
                  );
                })}
              </select>
            )}
          </div>
          <div className="w-full flex items-center justify-between">
            <span
              className="self-end cursor-pointer text-xs text-primary bg-transparent"
              onClick={() => {
                setFiltersVisibility(!filtersVisibility);
              }}
            >
              {filtersVisibility ? (
                <span className="flex gap-x-1 items-center text-primary">
                  Hide <ChevronUp color="#f1b143" size={16} />
                </span>
              ) : (
                <span className="flex gap-x-1 items-center text-primary">
                  Show <ChevronDown color="#f1b143" size={16} />
                </span>
              )}
            </span>
            <span
              className="self-end cursor-pointer text-sm text-primary bg-transparent flex gap-x-1 items-center"
              onClick={() => setFilteredData(data)}
            >
              Clear Filters <FilterX color="#f1b143" size={16} />
            </span>
          </div>
        </section>

        <section className="w-full px-[25px] sm:px-0 sm:w-[550px] md:w-[700px] lg:w-[750px]">
          {filteredData?.map((item: any, index: number) => {
            const createdAt = convertDate(item?.createdAt);
            const isBlogLikedByUser = activity?.likes?.some(
              (like: any) => like.blogId === item.id
            );
            return (
              <>
                <BlogCard
                  key={index}
                  data={{ ...item, createdAt, isBlogLikedByUser }}
                />
                <div className="w-full h-[1px] bg-primary opacity-35 mt-7 mb-4"></div>
              </>
            );
          })}
        </section>
        {/* <section className="w-[400px] flex flex-col items-start">
          <div className="w-full flex flex-col items-start gap-y-5">
            <div className="flex gap-x-1 items-center self-start">
              <h2 className="font-semibold">Filters</h2>
              <SlidersHorizontal size={16} />
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <input
                name="titleSearch"
                id=""
                placeholder="Search for Blog"
                className="w-full col-span-2 px-5 py-2 text-sm text-dark bg-gray-50 rounded-lg *:text-light"
              />
              <label
                htmlFor=""
                className={`px-5 py-2 cursor-pointer text-sm rounded-lg text-center ${
                  sort == 2 ? "text-light bg-primary" : "text-dark bg-gray-50 "
                }`}
                onClick={() => {
                  setSort(2);
                }}
              >
                Oldest Blogs
              </label>
              <label
                htmlFor=""
                className={`px-5 py-2 cursor-pointer text-sm rounded-lg text-center ${
                  sort == 1 ? "text-light bg-primary" : "text-dark bg-gray-50 "
                }`}
                onClick={() => {
                  setSort(1);
                }}
              >
                Latest Blogs
              </label>

              <select
                name="author"
                id=""
                className="w-full col-span-2 px-5 py-2 cursor-pointer text-sm text-dark bg-gray-50 rounded-lg *:text-dark"
              >
                <option value="" disabled selected>
                  Author
                </option>
                <option value="">Author Name 1</option>
                <option value="">Author Name 2</option>
                <option value="">Author Name 3</option>
              </select>
              <span
                className="px-5 pt-2 cursor-pointer text-sm text-primary bg-transparent flex gap-x-1 items-center"
                onClick={() => setFilteredData(data)}
              >
                Clear Filters <FilterX color="#f1b143" size={16} />
              </span>
            </div>
          </div>
        </section> */}
      </main>
    </main>
  );
}
