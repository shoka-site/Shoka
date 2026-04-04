import React from "react";
import {
  AbsoluteFill,
  Video,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  staticFile,
} from "remotion";
import { SceneConfig, TRANSITION_FRAMES } from "../types";

interface CinematicSceneProps {
  scene: SceneConfig;
  /** frame number relative to this scene's start (0-based) */
  localFrame: number;
  sceneDuration: number;
}

/**
 * Letterbox / cinematic crop bars
 */
const CinematicBars: React.FC = () => (
  <>
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        background: "#000",
        zIndex: 10,
      }}
    />
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        background: "#000",
        zIndex: 10,
      }}
    />
  </>
);

/**
 * Cinematic vignette overlay
 */
const Vignette: React.FC = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      background:
        "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.75) 100%)",
      zIndex: 5,
      pointerEvents: "none",
    }}
  />
);

/**
 * Film grain overlay (subtle noise effect via SVG)
 */
const FilmGrain: React.FC<{ opacity: number }> = ({ opacity }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E\")",
      backgroundSize: "256px 256px",
      opacity,
      mixBlendMode: "overlay",
      zIndex: 6,
      pointerEvents: "none",
    }}
  />
);

/**
 * Placeholder visual used when no footage file is provided.
 * Each scene gets a unique animated gradient + icon to convey its mood.
 */
const PlaceholderVisual: React.FC<{
  scene: SceneConfig;
  localFrame: number;
  totalFrames: number;
}> = ({ scene, localFrame, totalFrames }) => {
  // Slow pan effect on placeholder
  const pan = interpolate(localFrame, [0, totalFrames], [0, -40], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtle pulse on accent element
  const pulse = interpolate(
    Math.sin((localFrame / 30) * Math.PI * 2),
    [-1, 1],
    [0.8, 1.0]
  );

  const icons: Record<number, string> = {
    1: "😰",
    2: "📦",
    3: "📱",
    4: "💻",
    5: "⚡",
    6: "😊",
    7: "👥",
    8: "🤝",
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `linear-gradient(160deg, ${scene.placeholderColor} 0%, #000 100%)`,
        overflow: "hidden",
      }}
    >
      {/* Animated background circles */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${scene.placeholderAccent}22 0%, transparent 70%)`,
          top: "50%",
          left: "50%",
          transform: `translate(calc(-50% + ${pan}px), -50%) scale(${pulse})`,
          transition: "transform 0.1s",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${scene.placeholderAccent}44 0%, transparent 70%)`,
          top: "30%",
          left: "30%",
          transform: `translate(${pan * 0.5}px, 0)`,
        }}
      />

      {/* Scene icon + label for Studio preview */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          color: "rgba(255,255,255,0.9)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 120 }}>{icons[scene.id] ?? "🎬"}</div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
            opacity: 0.6,
            textAlign: "center",
            padding: "0 60px",
          }}
        >
          {scene.label}
        </div>
        <div
          style={{
            fontSize: 22,
            opacity: 0.35,
            fontFamily: "monospace",
          }}
        >
          REPLACE WITH: /public/footage/{scene.videoFile}
        </div>
      </div>
    </div>
  );
};

export const CinematicScene: React.FC<CinematicSceneProps> = ({
  scene,
  localFrame,
  sceneDuration,
}) => {
  const { width, height } = useVideoConfig();

  // ── Fade in (first TRANSITION_FRAMES frames of scene) ──────────────────────
  const fadeIn = interpolate(
    localFrame,
    [0, TRANSITION_FRAMES],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    }
  );

  // ── Fade out (last TRANSITION_FRAMES frames of scene) ──────────────────────
  const fadeOut = interpolate(
    localFrame,
    [sceneDuration - TRANSITION_FRAMES, sceneDuration],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.quad),
    }
  );

  const opacity = Math.min(fadeIn, fadeOut);

  // ── Subtle Ken Burns zoom on video ─────────────────────────────────────────
  const zoom = interpolate(localFrame, [0, sceneDuration], [1.0, 1.06], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // ── Cinematic color grade: slight desaturation + cool/warm tint per scene ──
  const colorGrades: Record<number, string> = {
    1: "saturate(0.75) contrast(1.1) brightness(0.85)",        // moody, tense
    2: "saturate(0.6) contrast(1.2) brightness(0.8) sepia(0.2)", // chaotic, gritty
    3: "saturate(0.7) contrast(1.15) brightness(0.85)",         // stressed
    4: "saturate(1.1) contrast(0.95) brightness(1.1)",          // clean, bright reveal
    5: "saturate(1.0) contrast(1.05) brightness(1.0)",          // neutral efficiency
    6: "saturate(1.15) contrast(1.0) brightness(1.1)",          // warm success
    7: "saturate(1.05) contrast(1.0) brightness(1.05)",         // collaborative warmth
    8: "saturate(1.2) contrast(1.05) brightness(1.05)",         // confident finale
  };

  const hasFootage = false; // flip to true once you drop files in /public/footage/

  return (
    <AbsoluteFill style={{ opacity }}>
      {/* ── Footage or placeholder ─────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${zoom})`,
          transformOrigin: "center center",
          filter: colorGrades[scene.id] ?? "none",
        }}
      >
        {hasFootage && scene.videoFile ? (
          <Video
            src={staticFile(`footage/${scene.videoFile}`)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            playbackRate={1}
            muted
          />
        ) : (
          <PlaceholderVisual
            scene={scene}
            localFrame={localFrame}
            totalFrames={sceneDuration}
          />
        )}
      </div>

      {/* ── Post-processing layers ─────────────────────────────────── */}
      <Vignette />
      <FilmGrain opacity={0.04} />
      <CinematicBars />
    </AbsoluteFill>
  );
};
