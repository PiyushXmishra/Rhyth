"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useToken } from "@/components/contexts/TokenContext";
import { motion } from "framer-motion";
import { usePlayer } from "../../components/contexts/PlayerContext";
import { Dropdown } from "@/components/controls/DownloadButton";
import HistoryLoader from "@/components/loaders/HistoryLoader";
import { useSession } from "next-auth/react";
import LoginPage from "@/components/Login";
interface Song {
  videoId: string;
  listenedAt: string;
  name: string;
  thumbnail: string;
}

interface GroupedHistory {
  [date: string]: Song[];
}

const HistoryPage: React.FC = () => {
  const {data:session} = useSession();
  const { sessionToken } = useToken();
  const [groupedHistory, setGroupedHistory] = useState<GroupedHistory>({});

  const [loading, setLoading] = useState(true);
  const { setVideoId } = usePlayer();

  const truncateTitle = (title: string, maxLength: number) => {
    if (title.length > maxLength) {
      return title.slice(0, maxLength) + "...";
    }
    return title;
  };

  const handleVideoSelect = (videoId: string) => {
    setVideoId(videoId);
  };

  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL,
  });

  axiosInstance.interceptors.request.use((config) => {
    if (sessionToken) {
      config.headers["session-token"] = sessionToken;
    }
    return config;
  });

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axiosInstance.post(
          `${process.env.NEXT_PUBLIC_URL}/api/users/gethistory`
        );
        const data: GroupedHistory = response.data;

        setGroupedHistory(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchHistory();
  }, [sessionToken]);

  function formatDate(dateString: string): string {
    const [day, month, year] = dateString.split("/");

    const inputDate = new Date(
      parseInt(year, 10),
      parseInt(month, 10) - 1,
      parseInt(day, 10)
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (inputDate.getTime() === today.getTime()) {
      return "Today";
    } else if (inputDate.getTime() === yesterday.getTime()) {
      return "Yesterday";
    }
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
    const monthName = months[inputDate.getMonth()];

    const daySuffix =
      day.endsWith("1") && day !== "11"
        ? "st"
        : day.endsWith("2") && day !== "12"
        ? "nd"
        : day.endsWith("3") && day !== "13"
        ? "rd"
        : "th";

    const formattedDay = `${parseInt(day, 10)}${daySuffix}`;

    return `${formattedDay} ${monthName}`;
  }

  return(
    <>{
      !session ? (
      <LoginPage/>
      ) : (
<div className="flex flex-col h-full w-full pt-2 px-1 lg:pt-4">
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="w-full h-full rounded-lg">
          {loading ? (
            <HistoryLoader count={20} />
          ) : (
            Object.keys(groupedHistory).map((date) => (
              <div key={date}>
                <h3 className="text-xl font-bold  text-white">
                  {formatDate(date)}
                </h3>
                <div className="">
                  {groupedHistory[date].map((song) => (
                    <motion.div
                      whileHover={{
                        scale: 1.01,
                        transition: { duration: 0.01 },
                      }}
                      whileTap={{ scale: 0.9 }}
                      key={song.videoId}
                      className="flex items-center py-2 cursor-pointer transition duration-200 ease-in-out justify-between"
                    >
                      <div
                        className="flex items-center w-full"
                        onClick={() => handleVideoSelect(song.videoId)}>
                        <img
                          src={song.thumbnail}
                          alt={song.name}
                          className="w-16 h-12 lg:w-20 lg:h-16 rounded-lg object-cover"
                        />

                        <div className="ml-4 mr-2 lg:ml-4 lg:mr-0">
                          <h3 className="text-xs lg:text-base font-bold  ">
                            {truncateTitle(song.name, 40)}
                          </h3>
                        </div>
                      </div>
                      <div className="flex">
                        <Dropdown
                          videoId={song.videoId}
                          videoTitle={song.name}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
      )
    }
    </>
    
  );
};

export default HistoryPage;
