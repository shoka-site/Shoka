import React from "react";
import { AbsoluteFill, interpolate, Easing } from "remotion";

type TransitionType = "fade" | "flash" | "whip";

interface SceneTransitionProps {
  /** 0 = start of transition, TRANSITION_FRAMES = end */
  progress: number;
  type: TransitionType;
}

/**
 * Flash cut transition — used for the problem→solution moment (scene 3→4)
 */
const FlashTransition: React.FC<{ progress: number }> = ({ progress }) => {
  const opacity = interpolate(
    progress,
    [0, 0.3, 0.5, 1],
    [0, 1, 0.8, 0],
    { easing: Easing.out(Easing.exp), extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: "#fff",
        opacity,
        pointerEvents: "none",
        zIndex: 20,
      }}
    />
  );
};

/**
 * Whip pan smear — directional motion blur overlay
 */
const WhipTransition: React.FC<{ progress: number }> = ({ progress }) => {
  const opacity = interpolate(
    progress,
    [0, 0.4, 1],
    [0, 0.6, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const scaleX = interpolate(progress, [0, 0.5, 1], [1, 4, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "rgba(255,255,255,0.15)",
        opacity,
        transform: `scaleX(${scaleX})`,
        filter: "blur(8px)",
        pointerEvents: "none",
        zIndex: 20,
      }}
    />
  );
};

export const SceneTransition: React.FC<SceneTransitionProps> = ({
  progress,
  type,
}) => {
  if (type === "flash") return <FlashTransition progress={progress} />;
  if (type === "whip") return <WhipTransition progress={progress} />;
  return null; // "fade" is handled by per-scene opacity
};
