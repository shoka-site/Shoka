export interface SceneConfig {
  id: number;
  startFrame: number;
  endFrame: number;
  videoFile?: string;  // path to footage file in /public/footage/
  label: string;       // description for Studio preview
  placeholderColor: string;
  placeholderAccent: string;
}

export const FPS = 30;

// Scene timing (in seconds → converted to frames)
export const SCENES: SceneConfig[] = [
  {
    id: 1,
    startFrame: 0,
    endFrame: 90,       // 0–3s
    videoFile: "scene1.mp4",
    label: "Stressed owner at desk",
    placeholderColor: "#1a1a2e",
    placeholderAccent: "#e94560",
  },
  {
    id: 2,
    startFrame: 90,
    endFrame: 210,      // 3–7s
    videoFile: "scene2.mp4",
    label: "Chaotic warehouse",
    placeholderColor: "#16213e",
    placeholderAccent: "#f5a623",
  },
  {
    id: 3,
    startFrame: 210,
    endFrame: 360,      // 7–12s
    videoFile: "scene3.mp4",
    label: "Frustrated phone calls",
    placeholderColor: "#0f3460",
    placeholderAccent: "#e94560",
  },
  {
    id: 4,
    startFrame: 360,
    endFrame: 480,      // 12–16s
    videoFile: "scene4.mp4",
    label: "Clean digital dashboard",
    placeholderColor: "#0d1b2a",
    placeholderAccent: "#00b4d8",
  },
  {
    id: 5,
    startFrame: 480,
    endFrame: 660,      // 16–22s
    videoFile: "scene5.mp4",
    label: "Efficient workflow",
    placeholderColor: "#023e58",
    placeholderAccent: "#48cae4",
  },
  {
    id: 6,
    startFrame: 660,
    endFrame: 780,      // 22–26s
    videoFile: "scene6.mp4",
    label: "Relaxed confident owner",
    placeholderColor: "#1b4332",
    placeholderAccent: "#52b788",
  },
  {
    id: 7,
    startFrame: 780,
    endFrame: 960,      // 26–32s
    videoFile: "scene7.mp4",
    label: "Team collaboration",
    placeholderColor: "#1a1a2e",
    placeholderAccent: "#7b2ff7",
  },
  {
    id: 8,
    startFrame: 960,
    endFrame: 1140,     // 32–38s
    videoFile: "scene8.mp4",
    label: "Confident owner, handshake",
    placeholderColor: "#0a0a0a",
    placeholderAccent: "#ffd700",
  },
];

export const TOTAL_FRAMES = 1140; // 38s × 30fps
export const TRANSITION_FRAMES = 12; // 0.4s overlap transition
