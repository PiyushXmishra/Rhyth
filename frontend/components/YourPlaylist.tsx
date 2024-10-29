"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import UserPlaylists from "@/components/UserPlaylists";
import LoginPage from "@/components/Login";
import useMediaQuery from "@/components/hooks/useMediaQuery";
import { redirect } from "next/navigation";

function YourPlaylist() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  useEffect(() => {
    if (isMobile) {
      redirect("/");
    }
  }, [isMobile]);

  axios.defaults.withCredentials = true;

  const { data: session } = useSession();
  const [hasRegistered, setHasRegistered] = useState(false);
  useEffect(() => {
    const registerUser = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/api/playlist/createuser`,
          {}
        );
        console.log(response.data);
        setHasRegistered(true);
        localStorage.setItem("hasRegistered", "true"); // Store in local storage
      } catch (error) {
        console.error("Error registering user:", error);
      }
    };

    const hasRegisteredLocal = localStorage.getItem("hasRegistered") === "true";
    if (session && !hasRegistered && !hasRegisteredLocal) {
      registerUser();
    } else if (hasRegisteredLocal) {
      setHasRegistered(true); // Update state if already registered
    }
  }, [session, hasRegistered]);

  return (
    <div className="flex w-5/12 bg-secondary rounded-3xl p-4">
      {!session ? (
        <div className="w-full">
          <LoginPage />
        </div>
      ) : (
        <div className="w-full">
          <UserPlaylists />
        </div>
      )}
    </div>
  );
}

export default YourPlaylist;
