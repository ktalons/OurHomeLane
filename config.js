/* ============================================================
   OurHomeLane — config
   This is the ONLY file you need to edit.
   ============================================================ */

const CONFIG = {

  // Who this is for (used in on-screen instructions)
  recipientName: "Sandra",

  // Splash screen text
  splashTitle: "Our Home Lane",
  splashSubtitle: "Enter the password. Made for you because words don't come close.",
  unlockButton: "Come here",
  wrongPasswordHint: "That's not it — check the email again.",

  // SHA-256 hash of the password (currently "potatopack222").
  // To change it: printf 'newpassword' | sha256sum
  passwordHash: "11f32562bf76a69ec31534510d5e9bbc246dae5059617b935045f8b854604ebb",

  // Background song (the lyric video). Lives in assets/song/
  song: "assets/song/home.mp4",

  // Seconds each photo stays on screen.
  // Math: song is 225s; ~28s is used by clip fade-outs/ins (12 clips).
  // 64 photos x 3s = 192s -> final slide lands as the song ends.
  slideDuration: 3,

  // Lyric-video dock: "small" | "large" | "hidden"
  // Hidden: the song still plays, lyrics appear as on-screen text.
  songDockMode: "hidden",

  // ── LYRICS ─────────────────────────────────────────────────
  // REPLACE this empty array with the output of:
  //   python3 lrc-convert.py lyrics.txt
  // (save your timestamped lyrics to lyrics.txt first)
  lyrics: [
    { t: 0.65, line: "I've been looking for a love like you" },
    { t: 3.77, line: "For a love like you, oh oh" },
    { t: 9.06, line: "I've been looking for a home like you" },
    { t: 12.2, line: "For a home like you, oh oh" },
    { t: 15.93, line: "" },
    { t: 18.09, line: "Ain't nobody do like me and you, you, like me and you" },
    { t: 26.36, line: "And ain't nobody knows what me and you, what me and you do" },
    { t: 34.5, line: "I've been hitting on a vibe like you got me sky high too, oh oh" },
    { t: 43.03, line: "Every second is a highlight, oh, with a love like you, oh oh" },
    { t: 49.68, line: "" },
    { t: 51.58, line: "I've been looking for a love like you" },
    { t: 54.75, line: "For a home like you, oh oh" },
    { t: 60.01, line: "Got my rhythm and it's all brand new" },
    { t: 63.24, line: "Now that I found you, oh oh" },
    { t: 68.25, line: "Oh, I can see it" },
    { t: 70.36, line: "This time I believe it" },
    { t: 72.05, line: "We'll live like we got nothing to lose" },
    { t: 77.02, line: "I've been looking for a love like you" },
    { t: 80.19, line: "For a home like you, oh oh" },
    { t: 83.9, line: "" },
    { t: 86.02, line: "Ain't nobody quite like seeing you" },
    { t: 89.79, line: "Like feeling you" },
    { t: 94.58, line: "Ain't no alibi like being true" },
    { t: 98.28, line: "Like you and I do" },
    { t: 102.87, line: "Tying back the years like younger days, like younger days" },
    { t: 111.58, line: "Crying happy tears like summer rain, like summer rain" },
    { t: 117.43, line: "" },
    { t: 119.6, line: "I've been looking for a love like you" },
    { t: 122.66, line: "For a home like you, oh oh" },
    { t: 127.93, line: "Got my rhythm and it's all brand new" },
    { t: 131.18, line: "Now that I found you, oh oh" },
    { t: 136.42, line: "Oh, I can see it" },
    { t: 138.13, line: "This time I believe it" },
    { t: 140.01, line: "We'll live like we got nothing to lose" },
    { t: 144.88, line: "I've been looking for a love like you" },
    { t: 148.1, line: "For a home like you, oh oh" },
    { t: 152.16, line: "" },
    { t: 153.8, line: "Don't let nobody talk about us" },
    { t: 158.04, line: "We know what we do" },
    { t: 162.35, line: "I went high and low a long time ago" },
    { t: 166.4, line: "And these rivers run true" },
    { t: 168.63, line: "" },
    { t: 170.47, line: "I've been looking for a love like you" },
    { t: 173.64, line: "For a home like you, oh oh" },
    { t: 178.91, line: "Got my rhythm and it's all brand new" },
    { t: 182.1, line: "Now that I found you, oh oh" },
    { t: 187.22, line: "Oh, I can see it" },
    { t: 189.08, line: "This time I believe it" },
    { t: 191.14, line: "We'll live like we got nothing to lose" },
    { t: 195.9, line: "I've been looking for a love like you" },
    { t: 199.06, line: "For a home like you, oh oh" },
    { t: 202.79, line: "" },
  ],
  // ───────────────────────────────────────────────────────────

  // Your photos, in the order you want them shown.
  // Optional caption: { src: "...", caption: "That first trip" },
  photos: [
    { src: "assets/photos/OHL - 10.jpeg" },
    { src: "assets/photos/OHL - 61.jpeg" },
    { src: "assets/photos/OHL - 48.jpeg" },
    { src: "assets/photos/OHL - 63.jpeg" },
    { src: "assets/photos/OHL - 44.jpeg" },
    { src: "assets/photos/OHL - 7.jpeg" },
    { src: "assets/photos/OHL - 6.jpeg" },
    { src: "assets/photos/OHL - 3.jpeg" },
    { src: "assets/photos/OHL - 5.jpeg" },
    { src: "assets/photos/OHL - 4.jpeg" },
    { src: "assets/photos/OHL - 29.jpeg" },
    { src: "assets/photos/OHL - 9.jpeg" },
    { src: "assets/photos/OHL - 1.jpeg" },
    { src: "assets/photos/OHL - 11.jpeg" },
    { src: "assets/photos/OHL - 8.jpeg" },
    { src: "assets/photos/OHL - 60.jpeg" },
    { src: "assets/photos/OHL - 12.jpeg" },
    { src: "assets/photos/OHL - 13.jpeg" },
    { src: "assets/photos/OHL - 14.jpeg" },
    { src: "assets/photos/OHL - 15.jpeg" },
    { src: "assets/photos/OHL - 16.jpeg" },
    { src: "assets/photos/OHL - 17.jpeg" },
    { src: "assets/photos/OHL - 18.jpeg" },
    { src: "assets/photos/OHL - 19.jpeg" },
    { src: "assets/photos/OHL - 64.jpeg" },
    { src: "assets/photos/OHL - 21.jpeg" },
    { src: "assets/photos/OHL - 22.jpeg" },
    { src: "assets/photos/OHL - 26.jpeg" },
    { src: "assets/photos/OHL - 23.jpeg" },
    { src: "assets/photos/OHL - 24.jpeg" },
    { src: "assets/photos/OHL - 25.jpeg" },
    { src: "assets/photos/OHL - 27.jpeg" },
    { src: "assets/photos/OHL - 28.jpeg" },
    { src: "assets/photos/OHL - 30.jpeg" },
    { src: "assets/photos/OHL - 31.jpeg" },
    { src: "assets/photos/OHL - 32.jpeg" },
    { src: "assets/photos/OHL - 33.jpeg" },
    { src: "assets/photos/OHL - 34.jpeg" },
    { src: "assets/photos/OHL - 49.jpeg" },
    { src: "assets/photos/OHL - 35.jpeg" },
    { src: "assets/photos/OHL - 36.jpeg" },
    { src: "assets/photos/OHL - 38.jpeg" },
    { src: "assets/photos/OHL - 39.jpeg" },
    { src: "assets/photos/OHL - 41.jpeg" },
    { src: "assets/photos/OHL - 42.jpeg" },
    { src: "assets/photos/OHL - 43.jpeg" },
    { src: "assets/photos/OHL - 45.jpeg" },
    { src: "assets/photos/OHL - 54.jpeg" },
    { src: "assets/photos/OHL - 47.jpeg" },
    { src: "assets/photos/OHL - 40.jpeg" },
    { src: "assets/photos/OHL - 50.jpeg" },
    { src: "assets/photos/OHL - 51.jpeg" },
    { src: "assets/photos/OHL - 52.jpeg" },
    { src: "assets/photos/OHL - 53.jpeg" },
    { src: "assets/photos/OHL - 20.jpeg" },
    { src: "assets/photos/OHL - 55.jpeg" },
    { src: "assets/photos/OHL - 56.jpeg" },
    { src: "assets/photos/OHL - 57.jpeg" },
    { src: "assets/photos/OHL - 58.jpeg" },
    { src: "assets/photos/OHL - 62.jpeg" },
    { src: "assets/photos/OHL - 59.jpeg" },
  ],

  // Short clips, shuffled into random spots among the photos.
  // Each pauses the song and waits for her to press play.
  clips: [
    { src: "assets/clips/OHL - 3.mp4" },
    { src: "assets/clips/OHL - 9.mp4" },
    { src: "assets/clips/OHL - 4.mp4" },
    { src: "assets/clips/OHL - 2.mp4" },
    { src: "assets/clips/OHL - 6.mp4" },
    { src: "assets/clips/OHL - 5.mp4" },
    { src: "assets/clips/OHL - 7.mp4" },
    { src: "assets/clips/OHL - 8.mp4" },
    { src: "assets/clips/OHL - 1.mp4" },
    { src: "assets/clips/OHL - 10.mp4" },
    { src: "assets/clips/OHL - 12.mp4" },
    { src: "assets/clips/OHL - 11.mp4" },
  ],

  // Shown on the final slide after everything has played.
  closingTitle: "If I lose you, it's my job to make sure you get found",
  closingMessage: "Wherever we go from here, this was home and I hope we can get back. I love you always & forever",
  replayButton: "Watch it again",
};
