"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios"; // Regular axios import
import UserPlaylists from "@/components/UserPlaylists";
import LoginPage from "@/components/Login";
import { useToken } from '@/components/contexts/TokenContext';

function YourPlaylist() {
  const { sessionToken } = useToken(); // Get session token from context
  const { data: session } = useSession();
  const [hasRegistered, setHasRegistered] = useState(false);


  useEffect(() => {
    const registerUser = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/api/playlist/createuser`,
          {},
          {
            headers: {
              'session-token': sessionToken || '',
            }
          }
        );
        setHasRegistered(true);
        localStorage.setItem("hasRegistered", "true"); 
      } catch (error) {
        //@ts-ignore
        console.error("Error registering user:", error.response ? error.response.data : error);
      }
    };

    const hasRegisteredLocal = localStorage.getItem("hasRegistered") === "true";
    if (session && !hasRegistered && !hasRegisteredLocal) {
      registerUser();
    } else if (hasRegisteredLocal) {
      setHasRegistered(true); 
    }
  }, [session, hasRegistered, sessionToken]); 

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
