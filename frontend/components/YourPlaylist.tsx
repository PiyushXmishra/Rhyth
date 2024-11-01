"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios"; // Regular axios import
import UserPlaylists from "@/components/UserPlaylists";
import LoginPage from "@/components/Login";
import useMediaQuery from "@/components/hooks/useMediaQuery";
import { redirect } from "next/navigation";
import { useToken } from '@/components/contexts/TokenContext';

function YourPlaylist() {
  const { sessionToken } = useToken(); // Get session token from context
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { data: session } = useSession();
  const [hasRegistered, setHasRegistered] = useState(false);

  useEffect(() => {
    if (isMobile) {
      redirect("/");
    }
  }, [isMobile]);

  useEffect(() => {
    const registerUser = async () => {
      try {
        // Explicitly set the session-token in the header for this request
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/api/playlist/createuser`,
          {},
          {
            headers: {
              'session-token': sessionToken || '', // Send the session token here
            }
          }
        );
        console.log(response.data);
        setHasRegistered(true);
        localStorage.setItem("hasRegistered", "true"); // Store in local storage
      } catch (error) {
        //@ts-ignore
        console.error("Error registering user:", error.response ? error.response.data : error);
      }
    };

    const hasRegisteredLocal = localStorage.getItem("hasRegistered") === "true";
    if (session && !hasRegistered && !hasRegisteredLocal) {
      registerUser();
    } else if (hasRegisteredLocal) {
      setHasRegistered(true); // Update state if already registered
    }
  }, [session, hasRegistered, sessionToken]); // Added sessionToken to dependencies

  return (
    <>
      {!session ? (
          <LoginPage />
      ) : (
          <UserPlaylists />
      )}
    </>
  );
}

export default YourPlaylist;
