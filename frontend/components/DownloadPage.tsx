"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import Image from "next/image";

export const dynamic = "force-dynamic";

export function Component() {
  const [videoUrl, setVideoUrl] = useState("");
  const [themeOptions, setThemeOptions] = useState<string[]>([]);
  const [selectedResolution, setSelectedResolution] = useState<string>("");
  const [isLoadingFormats, setIsLoadingFormats] = useState(false);
  const [isLoadingDownload, setIsLoadingDownload] = useState(false);
  const [isSelectDisabled, setIsSelectDisabled] = useState(true);
  const [downloadResponse, setDownloadResponse] = useState<{
    DownloadUrl: string;
    previewUrl: string;
  } | null>(null);
  const [title, setTitle] = useState<string>("");
  const [thumbnailURL, setThumbnailURL] = useState<string>("");
  const [duration, setDuration] = useState<string>("");

  useEffect(() => {
    if (videoUrl) {
      fetchFormats();
    }
  }, [videoUrl]);

  const fetchFormats = async () => {
    setIsLoadingFormats(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SONG_BACKEND_URL}/api/formats`,
        { videoUrl },
        { timeout: 60000 }
      );
      const result = response.data;
      if (Array.isArray(result.qualities)) {
        setThemeOptions(result.qualities);
        setTitle(result.Metadata.Title);
        setThumbnailURL(result.Metadata.ThumbnailURL);
        setDuration(result.Metadata.Duration);
        setIsSelectDisabled(false); // Enable select after formats are loaded
      } else {
        console.error("Received data format is invalid:", result);
      }
    } catch (error) {
      console.error("An error occurred while fetching formats.");
      console.error(error);
    } finally {
      setIsLoadingFormats(false);
    }
  };

  const handleDownload = async () => {
    if (!videoUrl || !selectedResolution) {
      console.error("Video URL and Resolution are required.");
      return;
    }

    setIsLoadingDownload(true);
    try {
      const formData = { videoUrl, resolution: selectedResolution };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SONG_BACKEND_URL}/api/download`,
        formData
      );
      setDownloadResponse(response.data);
    } catch (error) {
      console.error("An error occurred while downloading.");
      console.error(error);
    } finally {
      setIsLoadingDownload(false);
    }
  };

  const handleSearchSubmit = (e: any) => {
    e.preventDefault();
    fetchFormats();
  };

  const handleSelectChange = (value: string) => {
    setSelectedResolution(value);
  };

  const handlePreview = () => {
    if (downloadResponse && downloadResponse.previewUrl) {
      window.location.href = downloadResponse.previewUrl;
    }
  };

  const handleDownloadClick = () => {
    if (downloadResponse && downloadResponse.DownloadUrl) {
      window.location.href = downloadResponse.DownloadUrl;
    }
  };

 

  return (
    <div className="w-full items-center flex flex-col justify-center h-full ">
      <h1 className="flex text-2xl md:text-3xl lg:text-4xl text-center font-bold pb-6 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text">Not Your Another Downloader!! </h1>
      <div className="relative flex flex-row justify-between items-center overflow-hidden w-5/6">
        <Input
          type="search"
          placeholder="Enter YouTube Video URL"
          value={videoUrl}
          className="font-bold pl-5 text-sm"
          onChange={(e) => setVideoUrl(e.target.value)}
        />
        <Button
          className="absolute right-0 bg-transparent hover:bg-transparent  "
          onClick={handleSearchSubmit}
          disabled={isLoadingFormats}
        >
          {isLoadingFormats ? <SpinnerIcon /> : <SearchIcon />}
        </Button>
      </div>

      <div className="flex flex-row justify-between w-5/6 items-center  mt-4">
        <div className="flex">
          <Select
            disabled={isSelectDisabled || isLoadingDownload}
            onValueChange={handleSelectChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Resolution" />
            </SelectTrigger>
            <SelectContent>
              {themeOptions.map((theme, index) => (
                <SelectItem key={index} value={theme}>
                  {theme}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex ">
          <Button type="button" onClick={handleDownload}>
            {isLoadingDownload ? "Converting..." : "Go"}
          </Button>
        </div>

      </div>


      
      <div className="flex  mt-4">
        {title && (
            <div className="flex flex-col items-center md:items-start">
              <Image src={thumbnailURL} alt="Thumbnail" width={200} height={140} className="object-cover"/>
              <h2 className="text-sm font-semibold text-muted-foreground">{title}</h2>
              <p className="text-sm text-muted-foreground">Duration: {duration}</p>
            </div>
      
        )}
        
      </div>
      {downloadResponse && (
          <div className="flex flex-row justify-between w-4/6 items-center mt-4">
              <Button onClick={handlePreview}  className="flex ">Preview</Button>
           
              <Button onClick={handleDownloadClick} className="flex">Download</Button>
            </div>
        )}
    </div>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function SpinnerIcon(props: any) {
  return (
    <svg
      {...props}
      className="animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width="24"
      height="24"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path fill="currentColor" d="M12 2a10 10 0 00-1.993 19.801L12 22V2z" />
    </svg>
  );
}
