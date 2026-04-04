# Footage Guide

Drop your video clips into `public/footage/` with these exact filenames:

| File          | Scene | Duration | Description                              | Suggested source            |
|---------------|-------|----------|------------------------------------------|-----------------------------|
| scene1.mp4    | 1     | 3s       | Stressed owner at desk, laptop, moody    | Pexels / Runway             |
| scene2.mp4    | 2     | 4s       | Chaotic warehouse, scattered boxes       | Pexels / Pika               |
| scene3.mp4    | 3     | 5s       | Frustrated phone calls, pacing           | Pexels / Runway             |
| scene4.mp4    | 4     | 4s       | Clean dashboard on laptop/tablet         | Pexels / your platform demo |
| scene5.mp4    | 5     | 6s       | Efficient workers, fast packaging        | Pexels / Runway             |
| scene6.mp4    | 6     | 4s       | Relaxed owner, bright lighting           | Pexels / Runway             |
| scene7.mp4    | 7     | 6s       | Team collaborating, pointing at screens  | Pexels / Runway             |
| scene8.mp4    | 8     | 6s       | Handshake or confident walk              | Pexels / Runway             |

## After adding footage

1. Open `src/components/CinematicScene.tsx`
2. Change line: `const hasFootage = false;` → `const hasFootage = true;`
3. Run `npm run studio` to preview

## Free footage sources
- https://www.pexels.com/videos/ (free, no attribution required)
- https://pixabay.com/videos/ (free)
- https://www.coverr.co/ (free)

## AI video generation
- https://runwayml.com — text-to-video, best quality
- https://pika.art — fast text-to-video
- Use the scene descriptions from your prompt as input

## Commands

```bash
# Preview in browser (hot reload)
npm run studio

# Render final video
npm run render -- PlatformAd out/platform-ad.mp4

# Render with max quality
npx remotion render src/index.ts PlatformAd out/platform-ad.mp4 --codec=h264 --crf=18
```
