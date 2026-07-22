# OurHomeLane

A private memory page. Password splash → the song starts → photo slideshow with
short video clips woven in at random. Each clip pauses the song and waits for
her to press play; when it ends, the song fades back in and the photos continue.

## 1. Add your media

Drop files into these folders (any count, any names):

```
assets/photos/   your photos (.jpg / .png / .webp)
assets/clips/    your short clips (.mp4, H.264 + AAC recommended)
assets/song/     home.mp4 is already here (the lyric video)
```

The placeholder photos/clips currently in those folders are just for testing —
delete them once your real files are in.

**Tip:** keep each clip under ~50 MB. GitHub blocks files over 100 MB, and big
files load slowly on her phone. If a clip is huge, shrink it with:

```bash
ffmpeg -i input.mp4 -vf "scale=-2:1080" -c:v libx264 -crf 26 -preset slow -c:a aac -b:a 128k output.mp4
```

## 2. Edit `config.js`

That's the only file you touch. List your photos and clips, set captions
(optional), her name, slide duration, and the closing message:

```js
photos: [
  { src: "assets/photos/beach.jpg", caption: "That first trip" },
  { src: "assets/photos/kitchen.jpg" },
],
clips: [
  { src: "assets/clips/birthday.mp4" },
],
```

Clips are shuffled into random spots among the photos on every viewing.

## 3. Test locally

From the project folder:

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080 — enter the password and run through the whole
thing once, ideally also on your phone (same Wi-Fi: http://YOUR-MAC-IP:8080).

## 4. Publish to GitHub Pages

```bash
cd OurHomeLane
git init
git add .
git commit -m "Our home lane"
git branch -M main
git remote add origin https://github.com/ktalons/OurHomeLane.git
git push -u origin main
```

Then on GitHub: **Settings → Pages → Source: Deploy from a branch →
Branch: `main` / `(root)` → Save.** After a minute or two the site is live at:

```
https://ktalons.github.io/OurHomeLane/
```

That's the link for the email.

## Changing the password

The password isn't stored in the code — only its SHA-256 hash is. To change it:

```bash
printf 'yournewpassword' | sha256sum
```

Copy the hex string into `passwordHash` in `config.js`.

**Honest note:** this is a privacy curtain, not real security. Anyone with the
link *and* enough technical determination could get at the media files, since
GitHub Pages is a public host. For sending one link to one person, it's fine.
If you want the repo itself hidden from your GitHub profile, make it private —
note that GitHub Pages on a private repo requires a Pro plan (public repo +
this password gate is the free-tier answer).

## How the pieces fit

```
index.html   page structure
style.css    look and feel (desert-dusk palette, doorway splash)
app.js       slideshow engine, password gate, clip interludes
config.js    ← the only file you edit
```
