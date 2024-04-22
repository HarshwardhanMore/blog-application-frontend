"use client";

import BlogCard from "@/components/blog/BlogCard";
import {
  ChevronDown, ChevronUp, FilterX, Search
} from "lucide-react";
import { useEffect, useState } from "react";
import { getToken } from "@/helpers/Auth";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@/helpers/Authorize";

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
  const [sort, setSort] = useState(3);
  const [blogForm, setBlogForm] = useState(initialValues);
  const [filtersVisibility, setFiltersVisibility] = useState(false);
  const [likedBlogs, setLikedBlogs] = useState({});
  const [activity, setActivity] = useState<any>([]);

  const { session } = useAuth();
  const accessToken = getToken();

  const getBlogsData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9000/api/blog/getMyBlogs",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // if (response.status == 401) {
      //   redirect("/login");
      // }
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
        "http://localhost:9000/api/auth/getMyActivity",
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

  const sortByCreatedAtAsc = () => {
    setFilteredData(
      [...filteredData].sort((a: any, b: any) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      })
    );
  };

  const sortByCreatedAtDesc = () => {
    setFilteredData(
      [...filteredData].sort((a: any, b: any) => {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      })
    );
  };

  useEffect(() => {
    if (sort == 1) {
      sortByCreatedAtAsc();
    } else if (sort == 2) {
      sortByCreatedAtDesc();
    } else {
      setFilteredData(data);
    }
  }, [sort]);

  // Function to search data by title
  const searchByTitle = (searchTerm: any) => {
    setFilteredData(
      data.filter((item: any) =>
        item.title?.toLowerCase().includes(searchTerm?.toLowerCase())
      )
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
        <section className="w-full px-[25px] sm:px-0 sm:w-[550px] md:w-[700px] xl:w-[700px] flex flex-col gap-y-2.5 pt-5 sm:pt-10 pb-2.5 sm:pb-5 border-b sticky top-14 sm:top-20 bg-light z-10">
          <div className="w-full flex flex-col sm:flex-row items-center gap-y-2.5 sm:gap-y-0 sm:gap-x-2.5 md:gap-x-5">
            <div className="w-full sm:w-auto flex-grow flex items-center gap-x-2.5 bg-gray-50 rounded-lg px-2.5">
              <Search size={16} color="#f1b143" />
              <input
                name="titleSearch"
                id=""
                placeholder="Search for Blog"
                className="flex-grow py-2 bg-transparent text-sm text-dark *:text-light"
                onChange={(e) => {
                  searchByTitle(e.target.value);
                }}
              />
            </div>
            {filtersVisibility && (
              // <div className="w-full sm:w-auto flex flex-grow">
              //   <label
              //     htmlFor=""
              //     className={`flex-grow px-5 py-2 cursor-pointer text-sm rounded-l-lg text-center ${
              //       sort == 2
              //         ? "text-light bg-primary"
              //         : "text-dark bg-gray-50 "
              //     }`}
              //     onClick={() => {
              //       setSort(2);
              //     }}
              //   >
              //     Oldest Blogs
              //   </label>
              //   <label
              //     htmlFor=""
              //     className={`flex-grow px-5 py-2 cursor-pointer text-sm rounded-r-lg text-center ${
              //       sort == 1
              //         ? "text-light bg-primary"
              //         : "text-dark bg-gray-50 "
              //     }`}
              //     onClick={() => {
              //       setSort(1);
              //     }}
              //   >
              //     Latest Blogs
              //   </label>
              // </div>

              <div className="w-full flex items-center sm:w-auto flex-grow">
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
                  Oldest
                </label>
                <label
                  htmlFor=""
                  className={`flex-grow px-5 py-2 cursor-pointer text-sm text-center ${
                    sort == 3
                      ? "text-light bg-primary"
                      : "text-dark bg-gray-50 "
                  }`}
                  onClick={() => {
                    setSort(3);
                  }}
                >
                  Shufle
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
                  Latest
                </label>
              </div>
            )}
            {/* {filtersVisibility && (
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
            )} */}
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
              onClick={() => {
                setFilteredData(data);
                setSort(3);
              }}
            >
              Clear Filters <FilterX color="#f1b143" size={16} />
            </span>
          </div>
        </section>

        {filteredData?.length > 0 ? (
          <section className="w-full px-[25px] sm:px-0 sm:w-[550px] md:w-[700px] xl:w-[700px]">
            {filteredData?.map((item: any, index: number) => {
              const createdAt = convertDate(item?.createdAt);
              const isBlogLikedByUser = activity?.likes?.some(
                (like: any) => like.blogId === item.id
              );
              return (
                <>
                  <BlogCard
                    key={index}
                    data={{
                      ...item,
                      createdByUser: {
                        firstname: session?.firstname || "Guest",
                        lastname: session?.lastname || "",
                      },
                      createdAt,
                      isBlogLikedByUser,
                      isMyBlogs: true,
                    }}
                  />
                  {/* <div className="w-full h-[1px] bg-primary opacity-35 mt-7 mb-4"></div> */}
                </>
              );
            })}
          </section>
        ) : (
          <div className="w-full text-center text-gray-300 px-[25px] sm:px-0 sm:w-[550px] md:w-[700px] xl:w-[700px]">
            {data?.length > 0
              ? `No Result Found!`
              : `You Haven't Published Your First Blog Yet!`}
          </div>
        )}
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
