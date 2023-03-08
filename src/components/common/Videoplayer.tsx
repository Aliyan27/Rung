import React, { useRef, useEffect, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

interface VideoProps {
  src: string;
  onEnded?: () => void;
}

const VideoPlayer = ({ src }: VideoProps) => {
  const [player, setPlayer] = useState<any>();
  const videoNode = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoNode.current) {
      const newPlayer = videojs(videoNode.current, {
        autoplay: "muted",
        playsinline: true,
        controls: false,
        loop: true,
      });
      setPlayer(newPlayer);
      return () => {
        newPlayer.dispose();
      };
    }
  }, [src]);

  useEffect(() => {
    if (player) {
      player.src(src);
    }
  }, [player, src]);
  return (
    <>
      <video ref={videoNode} className="video-js"></video>
    </>
  );
};

export default VideoPlayer;
