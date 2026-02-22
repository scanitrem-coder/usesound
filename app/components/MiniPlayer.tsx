"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

interface MiniPlayerProps {
  audioUrl: string;
  trackId: string;
}

export default function MiniPlayer({ audioUrl, trackId }: MiniPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // создаём глобальный audio
  useEffect(() => {
    if (!(window as any).globalAudio) {
      (window as any).globalAudio = new Audio();
      (window as any).currentTrackId = null;
    }
        audioRef.current = (window as any).globalAudio;
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if ((window as any).currentTrackId !== trackId) {
      audio.pause();
      audio.src = audioUrl;
      audio.load();
      audio.currentTime = 0;
      (window as any).currentTrackId = trackId;
      audio.play();
      setIsPlaying(true);
    } else {
      if (audio.paused) {
        audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    }
  };
  // Загружаем длительность отдельно
useEffect(() => {
  const tempAudio = new Audio();
  tempAudio.src = audioUrl;
  tempAudio.preload = "metadata";

  const handleLoadedMetadata = () => {
    if (!isNaN(tempAudio.duration)) {
      setDuration(tempAudio.duration);
    }
  };

  tempAudio.addEventListener("loadedmetadata", handleLoadedMetadata);

  tempAudio.load(); // важно!

  return () => {
    tempAudio.removeEventListener("loadedmetadata", handleLoadedMetadata);
  };
}, [audioUrl]);



  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      if ((window as any).currentTrackId !== trackId) {
        setProgress(0);
        setIsPlaying(false);
        setCurrentTime(0);
        return;
      }

      if (!audio.duration) return;

      const percent = (audio.currentTime / audio.duration) * 100;

setProgress(percent);
setCurrentTime(audio.currentTime);
setDuration(audio.duration); 
      };

    const handleEnded = () => {
      if ((window as any).currentTrackId === trackId) {
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime(0);
      }
    };
    const handleLoadedMetadata = () => {
  if ((window as any).currentTrackId === trackId) {
    setDuration(audio.duration);
  }
};

audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [trackId]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    if ((window as any).currentTrackId !== trackId) return;

    const value = Number(e.target.value);
    const newTime = (value / 100) * audio.duration;
    audio.currentTime = newTime;
    setProgress(value);
  };

  const formatTime = (time: number) => {
    if (!time) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="flex items-center gap-4 w-full">
      <button
        onClick={togglePlay}
        className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-400 transition flex items-center justify-center"
      >
        {isPlaying ? (
          <Pause size={18} className="text-black" />
        ) : (
          <Play size={18} className="text-black ml-1" />
        )}
      </button>

      <div className="flex flex-col flex-1">
        <input
          type="range"
          value={progress}
          onChange={handleSeek}
          min="0"
          max="100"
          className="w-full"
        />

        <div className="flex justify-between text-xs text-zinc-400 mt-1">
          <span>{formatTime(currentTime)}</span>
                  </div>
      </div>
    </div>
  );
}
