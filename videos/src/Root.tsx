import React from "react";
import { Composition } from "remotion";
import { PlatformAd } from "./compositions/PlatformAd";
import { TOTAL_FRAMES, FPS } from "./types";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Iraqi Platform — Social Media Ad
          Format: Instagram/TikTok Reel, 9:16, 38 seconds
          To render: npm run render -- PlatformAd out/platform-ad.mp4
      */}
      <Composition
        id="PlatformAd"
        component={PlatformAd}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={{}}
      />
    </>
  );
};
