import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { SCENES, TOTAL_FRAMES, TRANSITION_FRAMES } from "../types";
import { CinematicScene } from "../components/CinematicScene";
import { SceneTransition } from "../components/SceneTransition";

/**
 * Transition types per scene boundary (index = scene index of OUTGOING scene).
 * scene1→2: fade
 * scene2→3: fade
 * scene3→4: FLASH  ← dramatic problem→solution moment
 * scene4→5: fade
 * scene5→6: fade
 * scene6→7: fade
 * scene7→8: WHIP   ← energetic finale
 */
const TRANSITION_TYPES = ["fade", "fade", "flash", "fade", "fade", "fade", "whip"] as const;

export const PlatformAd: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {SCENES.map((scene, index) => {
        const sceneDuration = scene.endFrame - scene.startFrame;
        const localFrame = frame - scene.startFrame;

        // Only render scenes that are active (within range + transition overlap)
        const isActive =
          frame >= scene.startFrame - TRANSITION_FRAMES &&
          frame < scene.endFrame + TRANSITION_FRAMES;

        if (!isActive) return null;

        return (
          <CinematicScene
            key={scene.id}
            scene={scene}
            localFrame={Math.max(0, localFrame)}
            sceneDuration={sceneDuration}
          />
        );
      })}

      {/* ── Transition overlays at scene boundaries ──────────────────── */}
      {SCENES.slice(0, -1).map((scene, index) => {
        // Transition center = end of scene N
        const transitionStart = scene.endFrame - TRANSITION_FRAMES / 2;
        const transitionEnd = scene.endFrame + TRANSITION_FRAMES / 2;

        const isActive = frame >= transitionStart && frame <= transitionEnd;
        if (!isActive) return null;

        const progress = interpolate(
          frame,
          [transitionStart, transitionEnd],
          [0, 1],
          {
            easing: Easing.inOut(Easing.quad),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }
        );

        const type = TRANSITION_TYPES[index] ?? "fade";
        return (
          <SceneTransition
            key={`transition-${index}`}
            progress={progress}
            type={type}
          />
        );
      })}

      {/* ── Global cinematic color wash (cool teal tint, very subtle) ── */}
      <AbsoluteFill
        style={{
          background: "linear-gradient(180deg, rgba(0,20,40,0.08) 0%, rgba(0,10,20,0.12) 100%)",
          pointerEvents: "none",
          zIndex: 7,
          mixBlendMode: "multiply",
        }}
      />
    </AbsoluteFill>
  );
};
