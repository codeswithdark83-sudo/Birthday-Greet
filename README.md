# 💌 Birthday Surprise for Aayushi (Our Skyla)

An interactive digital birthday letter built with React + Vite. A sealed envelope opens to a personal card with a photo, a heartfelt message, a wish, an extra surprise, confetti and optional music. No backend, no API keys, no analytics.

## Run it locally (VS Code)

1. Install [Node.js](https://nodejs.org) 18 or newer.
2. Open this folder in VS Code (`File → Open Folder`), then open the terminal (`Ctrl+\``).
3. Install and start:

```bash
npm install
npm run dev
```

4. Open the address it prints (usually http://localhost:5173).

Production build (what gets deployed):

```bash
npm run build      # outputs the site to dist/
npm run preview    # optional: serve dist/ locally to check it
```

## Change the text, colours and file paths

Everything personal is in **`src/config/birthdayConfig.js`**: names, every message, the photo path, the music path and the theme colours. Each string in `birthdayMessage` is one paragraph.

## Add / replace Aayushi's photo

1. Pick a portrait photo (around 800 × 1000 px works best, under 1 MB).
2. Save it as **`public/images/aayushi.jpg`**, replacing any existing file.
3. Refresh. The photo is cropped to a portrait frame (`object-fit: cover`, focused slightly above centre so faces stay in frame).

Different file name or type (e.g. `skyla.png`)? Change `friendPhotoPath` in the config to `/images/skyla.png`.
If the photo is missing, a pretty flower placeholder shows instead, so the page never looks broken.

## Music

A short, original music-box "Happy Birthday" tune is already included at `public/music/birthday-music.mp3`.

Browsers never allow sound to start on their own when a link opens, so the music **starts the moment Aayushi taps the envelope** (that tap counts as her permission). She can pause or resume it with the **Music on/off** button (top-right). If the file is missing or playback fails, nothing breaks.

To use your own track (one you have the rights to), replace `public/music/birthday-music.mp3` with it, keeping the same name.

## Deploy

The site is fully static. Asset paths such as `/images/aayushi.jpg` work after deployment because everything in `public/` is served from the site root.

### Vercel (easiest)

1. Put this folder on GitHub (new repo, upload or `git push`). **Make sure the photo is included.**
2. Go to [vercel.com](https://vercel.com) → **Add New… → Project** → import the repo.
3. Vercel detects Vite automatically (Build command `npm run build`, Output directory `dist`). Click **Deploy**.
4. You get a link like `https://your-project.vercel.app`. Rename it under **Settings → Domains** if you'd like something cuter.

No GitHub? Run `npx vercel` in this folder and follow the prompts, then `npx vercel --prod`.

### Netlify

1. Push to GitHub, then **Add new site → Import an existing project** on [netlify.com](https://netlify.com).
2. Build command `npm run build`, publish directory `dist` (already set in `netlify.toml`). Deploy.
3. Or drag-and-drop: run `npm run build`, then drag the **`dist`** folder onto [app.netlify.com/drop](https://app.netlify.com/drop).

## Test on a phone

1. Open the deployed link on an Android phone and an iPhone (Chrome and Safari).
2. Check: the envelope is centred, tapping it opens the flap and the letter slides out, the photo is cropped nicely, the message isn't cut off, and all three buttons plus "Open the Letter Again" work.
3. Tap the envelope and confirm the music starts (iPhones need silent mode off to hear audio), then tap the music button to pause and resume.
4. Rotate the phone to landscape: the page should scroll rather than clip.
5. Locally on the same Wi-Fi: `npm run dev -- --host` and open the "Network" address on your phone.

Tip: after replacing the photo or music, redeploy, then hard-refresh the phone browser if you still see the old file.

## Project structure

```
src/
  App.jsx                   scene flow: sealed → opening → revealed (+ replay)
  config/birthdayConfig.js  all editable text, paths, colours
  components/
    Envelope.jsx            3D CSS envelope (flap, letter, heart wax seal)
    BirthdayCard.jsx        card, polaroid photo, wish / surprise / celebrate
    SurpriseMessage.jsx     accessible modal letter
    Confetti.jsx            canvas confetti (self-cleaning, honours reduced motion)
    MusicToggle.jsx         opt-in audio with error handling
    Decor.jsx               hearts, sparkles, flowers
  styles/                   global.css, Envelope.css, BirthdayCard.css, animations.css
public/
  images/aayushi.jpg        ← add the photo here
  music/birthday-music.mp3  ← optional music
```

## Accessibility & privacy

- The envelope is a real `<button>`: Enter / Space open it. Visible focus rings throughout; the modal traps focus and closes with Esc.
- `prefers-reduced-motion` turns off drifting hearts, bobbing and confetti (replaced by a simple message).
- No cookies, analytics or tracking. The only external request is the optional Google Fonts stylesheet, and the site looks fine with system fonts if it's blocked. To remove it entirely, delete the three `fonts.googleapis.com` / `fonts.gstatic.com` lines in `index.html`.
