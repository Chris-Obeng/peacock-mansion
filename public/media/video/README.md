# Hero film slot

Drop these files here and rebuild (`npm run build`). The hero picks them up automatically; until then it shows the fountain photograph with a slow drift.

| File | Spec |
| --- | --- |
| `hero.webm` | VP9 or AV1, 1920 × 1080 (landscape), 24–30 fps, no audio, **under 4 MB** |
| `hero.mp4` | H.264 High profile, `+faststart`, same frame, no audio, **under 4 MB** |
| `hero-poster.jpg` | First frame, 1920 × 1080, under 250 KB |

Content: 8–15 seconds, one slow continuous move (the fountain, the staircase, light through the salon). No people facing camera, no text, no cuts. It loops, so the last frame should be close to the first.

Example encode with ffmpeg:

```bash
ffmpeg -i source.mov -an -vf "scale=1920:-2,fps=25" -c:v libx264 -profile:v high -crf 26 -preset slow -movflags +faststart hero.mp4
ffmpeg -i source.mov -an -vf "scale=1920:-2,fps=25" -c:v libvpx-vp9 -crf 36 -b:v 0 -row-mt 1 hero.webm
ffmpeg -i hero.mp4 -frames:v 1 -q:v 4 hero-poster.jpg
```

The film plays only when the visitor has not asked for reduced motion, Data Saver is off, and the connection reports 4G. It is mounted after the page is idle, so it never delays the first paint.
