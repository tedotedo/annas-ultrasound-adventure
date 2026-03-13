# Anna's Ultrasound Adventure — Project Overview

> Last updated: February 2026  
> Author of this doc: Antigravity (AI assistant)

---

## 🎯 What Is This?

A **companion web app** for the children's picture book *"Anna's Ultrasound Adventure"* by **Dr Moira McCarty**. The app helps children aged **4–8 years** prepare for an ultrasound scan by familiarising them with the scan room, meeting the characters, and working through a preparation checklist — all in a warm, child-friendly interactive experience.

**Core philosophy:** The app prepares and reinforces — it does **NOT** replace the book or tell the full story.

The interactive website was built by **Dr Odet Mark Aszkenasy**, Consultant Paediatrician.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 7 |
| Styling | Tailwind CSS 4 |
| Routing | React Router DOM 7 |
| Internationalisation | Custom i18n Context (`de` and `en`) |
| Persistent Storage | `localStorage` (checklist & certificate name) |
| Audio | Web Speech API (TTS) + recorded `.m4a`/`.mp3` files |
| Celebrations | `react-confetti` |
| Certificate Export | `html2canvas` (downloads as PNG at 2× scale) |
| Hosting | Netlify (static site) |

**Key config files:**
- `vite.config.js` — Vite build config
- `tailwind.config.cjs` — Tailwind setup
- `postcss.config.cjs` — PostCSS
- `netlify.toml` — SPA redirect rules for Netlify
- `eslint.config.js` — Linting rules

---

## 📁 Folder Structure

```
annas-ultrasound-adventure/
├── assets/                        # Raw media assets (not processed by Vite)
│   ├── screen.m4a                 # Recorded audio for scan room hotspots
│   ├── ultrasound-machine.m4a
│   ├── probe.m4a
│   ├── couch.m4a
│   ├── gel.m4a
│   ├── tissues.m4a
│   └── images/
│       ├── scan-room.png          # Main scan room image for Explore page
│       ├── authors/
│       │   └── moira_mccarty.jpg  # Author photo for About page
│       ├── characters/            # Full-size character images
│       │   ├── anna.jpg           # Anna (main character)
│       │   ├── annas-mum.jpg      # Anna's mum
│       │   ├── Tedrick.png        # Anna's teddy bear (NB: capital T — case-sensitive on Netlify!)
│       │   ├── nicky.jpg          # Dr Nicky (ultrasound doctor)
│       │   ├── carly.png          # Carly (department helper)
│       │   ├── anna.png           # Original book character illustration
│       │   ├── anna_happy.png     # Anna smiling illustration
│       │   ├── anna_with_tedrick.png
│       │   ├── mum.png            # Original mum illustration
│       │   ├── mum_corridor.png
│       │   ├── nicky.png          # Original Dr Nicky illustration
│       │   ├── tedrick_scan.png   # Tedrick during scan illustration
│       │   └── reszied_images/    # Web-optimised versions (for Say Hello! page)
│       │       ├── anna.jpg       (55 KB)
│       │       ├── annas-mum.jpg  (38 KB)
│       │       ├── Tedrick.png    (791 KB)
│       │       ├── nicky.jpg      (41 KB)
│       │       └── carly.png      (721 KB)
│       ├── pages/                 # Book page scans (27 pages, parts 5–7)
│       │   ├── part5_page01.png … part5_page10.png
│       │   ├── part6_page01.png … part6_page10.png
│       │   └── part7_page01.png … part7_page07.png
│       ├── scenes/                # Environment images + background videos
│       │   ├── scan_room.png
│       │   ├── corridor.png
│       │   ├── waiting_room.png
│       │   ├── Animated_Chat_Video_Generation_16by9.mp4   (desktop bg)
│       │   ├── Animated_Chat_Video_Generation_9by16.mp4   (mobile bg)
│       │   └── Animated_Chat_Video_Generation.mp4
│       └── videos/                # Character introduction videos
│           ├── anna_explains_nothing_to_be_scared_of.mp4
│           ├── annas-mum-video.mp4
│           ├── tedrick-portrait-video.mp4
│           ├── carly.mp4
│           └── drnicky.mp4
├── docs/
│   ├── PROJECT_SPEC.md            # Original app specification
│   └── WEBSITE_SPEC.md           # Detailed, up-to-date website specification
├── public/
│   └── vite.svg                   # Default Vite favicon
├── src/
│   ├── main.jsx                   # React entry point
│   ├── App.jsx                    # Router setup — maps all routes to pages
│   ├── index.css                  # Global styles and animations
│   ├── assets/                    # (currently empty — media lives in /assets)
│   ├── data/
│   │   ├── characters.js          # Character data (id, name, image filename, TTS audio script)
│   │   ├── hotspots.js            # Scan room hotspot positions (x/y %) + audio key
│   │   └── checklistItems.js      # Checklist sections and items
│   ├── hooks/
│   │   ├── useLocalStorage.js     # Custom hook: read/write any key to localStorage
│   │   └── useSpeech.js           # Custom hook: Web Speech API text-to-speech
│   └── pages/
│       ├── Home.jsx               # / — Landing page
│       ├── About.jsx              # /about — Author info + privacy policy
│       ├── Team.jsx               # /team — "Say Hello!" character cards
│       ├── Explore.jsx            # /explore — Interactive scan room
│       ├── Checklist.jsx          # /checklist — Getting ready checklist
│       ├── Book.jsx               # /book — Purchase links
│       └── Certificate.jsx        # /certificate — Downloadable bravery cert
├── index.html
├── package.json
├── README.md
└── PROJECT_OVERVIEW.md            # ← This file
```

---

## 🗺️ Pages & Routes

### 1. Home (`/`) — `Home.jsx`
- **Animated video background** — responsive (16:9 for desktop, 9:16 for mobile); fades in/out smoothly at loop points (max opacity 15%, barely visible)
- Hero image: `scan_room.png`
- Title: *"Anna's Ultrasound Adventure"* + tagline *"Get ready for your scan with Anna and Tedrick!"*
- **5 navigation buttons** (one for each main section + About):
  | Button | Colour | Destination |
  |---|---|---|
  | Say Hello! | Pink gradient | `/team` |
  | Explore the Scan Room | Blue gradient | `/explore` |
  | Getting Ready Checklist | Green gradient | `/checklist` |
  | Get the Book | Amber/orange gradient | `/book` |
  | About & Privacy | Purple gradient | `/about` |
- Footer: *"Based on the book by Dr Moira McCarty"*

---

### 2. About & Privacy (`/about`) — `About.jsx`
- Author section: Dr Moira McCarty with headshot photo, bio about the book's purpose
- Website section: Dr Odet Mark Aszkenasy, Consultant Paediatrician
- Privacy section:
  - No tracking, no cookies, no personal data collected
  - Checklist stored locally (localStorage) only
  - Copyright: book © Dr Moira McCarty; website © Dr Odet Mark Aszkenasy
  - Educational disclaimer (not medical advice)

---

### 3. Say Hello! (`/team`) — `Team.jsx`
- Grid of **5 character cards**: 2 columns mobile, 3 columns desktop
- Anna spans the full width on mobile (col-span-2)
- Each card shows character photo; **tap to play introduction video** (or TTS audio as fallback)
- Video plays inline with crossfade from static image to video (`opacity` CSS transition)
- High contrast animated **transcript text box** appears below character while playing.
- German language (`de`) uses its own `.mp4` video files with built-in `<track>` WebVTT subtitles for accessibility.
- Only one video plays at a time — others are paused when a new one starts
- TTS also cancelled when switching
- Uses **resized images** from `reszied_images/` as thumbnails (faster loading)
- Displays speaker icon; animates while playing; label says *"Tap to stop"* when active

**Characters:**
| Character | ID | Image file | Video file |
|---|---|---|---|
| Anna | `anna` | `anna.jpg` | `anna_explains_nothing_to_be_scared_of.mp4` |
| Mum | `mum` | `annas-mum.jpg` | `annas-mum-video.mp4` |
| Tedrick | `tedrick` | `Tedrick.png` | `tedrick-portrait-video.mp4` |
| Dr Nicky | `nicky` | `nicky.jpg` | `drnicky.mp4` |
| Carly | `carly` | `carly.png` | `carly.mp4` |

---

### 4. Explore the Scan Room (`/explore`) — `Explore.jsx`
- Full-width scan room image (`assets/images/scan-room.png`) in a rounded, bordered container
- **6 interactive hotspot buttons** overlaid at precise `x%/y%` positions
- Each hotspot pulses with a blue glow animation (`animate-pulse` + ping ring)
- Selected hotspot turns orange
- Clicking a hotspot:
  1. Opens **slide-up info panel** from bottom (0.3s animation)
  2. Plays **recorded `.m4a` audio** (or TTS fallback)
  3. Shows caption text and *"Playing..."* indicator
  4. "Got it!" button or clicking the backdrop closes the panel
- Legend buttons below the image for easy access (especially on mobile where some hotspots may be hard to tap)

**Hotspots:**
| Name | x% | y% | Audio file |
|---|---|---|---|
| Screen | 61.2 | 38.1 | `screen.m4a` (EN), `screen-de.mp3` (DE) |
| Ultrasound Machine | 62.6 | 51.1 | `ultrasound-machine.m4a` (EN), `ultrasound-machine-de.mp3` (DE) |
| Probe | 56.7 | 50.7 | `probe.m4a` (EN), `probe-de.mp3` (DE) |
| Couch | 66.0 | 67.2 | `couch.m4a` (EN), `couch-de.mp3` (DE) |
| Gel | 84.4 | 63.2 | `gel.m4a` (EN), `gel-de.mp3` (DE) |
| Tissue Paper | 91.8 | 60.3 | `tissues.m4a` (EN), `tissue-de.mp3` (DE) |

**To update a hotspot voice script:**
1. Record new audio in Voice Memos (iPhone)
2. Add `.m4a` to `assets/` folder
3. Update `explanation` in `src/data/hotspots.js`
4. Import file and add to `audioFiles` map in `src/pages/Explore.jsx`

---

### 5. Getting Ready Checklist (`/checklist`) — `Checklist.jsx`
- **Progress bar** at top: animated gradient fill, shows `X of Y items` and `%`
- **3 collapsible sections** (all expanded by default):
  | Section | Emoji | Items |
  |---|---|---|
  | Before the Day | 📅 | Read story, talked about it, chose comfort toy, practised lying still |
  | On the Day | 🏥 | Comfy clothes, drinks, packed toy, arrived at hospital |
  | After the Scan | 🎉 | Got brave sticker, chose a treat |
- Ticking an item: animated checkbox (green fill + check mark), label gets strikethrough
- Completing all items: **confetti animation** (5 seconds, react-confetti), "You're Ready!" banner with link to Certificate
- **Reset button** at bottom (with browser confirm dialog)
- Progress is persisted to `localStorage` key `annas-ultrasound-checklist`

---

### 6. Get the Book (`/book`) — `Book.jsx`
- Hero card: book cover preview (uses `part5_page01.png` from book page images)
- Title: *"Anna's Ultrasound Adventure"* | Author: *"By Dr Moira McCarty"*
- **Purchase options:**
  | Format | Status | Link |
  |---|---|---|
  | Kindle Edition | ✅ Available | `https://www.amazon.co.uk/dp/B0GKQ61CT8` |
  | Paperback | 🔜 Coming Soon | N/A (greyed out visually) |
- Links open in new tab (`target="_blank"`)

---

### 7. Certificate (`/certificate`) — `Certificate.jsx`
- **Access control:** redirects to `/checklist` after 3 seconds if checklist isn't 100% complete
- Name input field (saved persistently to `localStorage` key `annas-ultrasound-certificate`)
- Live certificate preview:
  - Gradient background (soft blue → white → soft orange)
  - Decorative border with stars (⭐) in corners
  - Heading: *"Certificate of Bravery"* / *"I Was Brave Like Anna!"*
  - Child's name (styled in warm orange)
  - Today's date (UK format: e.g., 24 February 2026)
  - Images of Anna and Tedrick
- **Download button** → generates PNG at 2× scale using `html2canvas`
  - Filename: `brave-like-anna-{name}.png`
  - Disabled until name is entered
- Note: Uses **full-size** character images (not resized) for better print quality

---

## 🎨 Design System

### Colour Palette
| Token | Hex | Usage |
|---|---|---|
| `primary-blue` | `#3B82F6` | Buttons, links, progress bar, hotspots |
| `soft-blue` | `#E8F4FD` | Backgrounds, character image padding |
| `warm-orange` | `#F97316` | Accents, selected hotspot, certificate name |
| `soft-orange` | `#FFF7ED` | Light background tones |
| `text-dark` | `#1E293B` | Main body text |
| `text-light` | `#64748B` | Secondary text, labels |
| `success-green` | `#22C55E` | Checklist completion, "Got it!" button |

### Typography
- **Headings:** Nunito (weights 600, 700, 800) — rounded and friendly
- **Body:** Inter (weights 400, 500, 600) — clean and readable
- Large sizes throughout for child accessibility

### Button Style
- Rounded corners (16px radius), min-height 48px (accessible tap targets)
- Soft shadow, hover scale effect, active press-down
- Focus ring (primary-blue) for keyboard accessibility

### Animations
| Animation | Where Used |
|---|---|
| Gentle fade | Page transitions |
| Scale + opacity | Checkbox tick |
| Pulse + ping | Scan room hotspots |
| Slide-up 300ms | Scan room info panel |
| Confetti burst | Checklist completion |
| Float (slow) | Scan room image on Home |
| Video opacity fade | Loop transitions on Home background video |

---

## 🔧 Custom Hooks

### `useLocalStorage(key, initialValue)`
- Wraps `useState` with `localStorage` read/write
- Handles JSON parse/stringify
- Gracefully catches errors

### `useSpeech()`
- Wraps the Web Speech API
- `speak(text, id)` — cancels ongoing speech, sets rate 0.9 / pitch 1.1, fires callbacks
- `stop()` — cancels speech
- Returns: `{ speak, stop, isSpeaking, currentId }`
- Cleans up on unmount (cancels speech)
- Currently used as **TTS fallback** on Team page (all characters now have videos); primary audio on Explore uses pre-recorded `.m4a` files

---

## 💾 localStorage Schema

```json
{
  "annas-ultrasound-checklist": {
    "read-story": true,
    "talked": false,
    "comfort-toy": true,
    "practise-still": false,
    "comfy-clothes": false,
    "drinks": false,
    "packed-toy": false,
    "arrived": false,
    "sticker": false,
    "treat": false
  },
  "annas-ultrasound-certificate": {
    "name": "Emma",
    "generatedAt": "2026-02-24T10:00:00.000Z"
  }
}
```

---

## ♿ Accessibility

- All images have descriptive `alt` text
- All interactive elements keyboard accessible
- Focus rings on all interactive elements (primary-blue)
- Colour contrast meets WCAG AA
- Audio has visual indicator when playing (animated speaker icon)
- Touch targets minimum 48×48px throughout
- Screen reader labels on hotspot buttons
- Background video is `aria-hidden="true"`

---

## 🌐 Deployment

- **Platform:** Netlify
- **Build command:** `npm run build`
- **Publish dir:** `dist`
- **SPA routing:** `netlify.toml` has redirect rules so React Router works on direct URLs

**⚠️ Important gotcha:** Netlify uses a **case-sensitive** Linux filesystem. File imports must match exact casing. Known example: `Tedrick.png` NOT `tedrick.png`.

---

## 🔮 Future Enhancements (from spec)

1. **Recorded audio on Team page** — replace TTS with recorded character voices for each character's intro (currently only scan room uses recordings)
2. **Additional scan types** — heart scan, hip scan, head scan variants of the app
3. **Multiple languages** — Welsh and other languages
4. **Parent mode** — additional tips and preparation info for adults
5. **Offline support** — service worker / PWA
6. **Analytics** — usage tracking with user consent
7. **Print-friendly** — printable checklist and certificate versions
8. **Paperback link** — add Amazon URL once the paperback edition is available

---

## 📝 Changelog Summary

### March 2026
- Built complete internationalization (`i18n`) system supporting English (EN) and German (DE).
- Integrated new scan room object coordinates to match updated background image.
- Implemented dedicated German audio clips for scan room hotspots.
- Implemented custom German character videos with `.vtt` WebVTT caption tracks for accessibility.
- Redesigned Team character cards to display an animated, high-contrast transcript text box instead of tiny video subtitles.

### February 2026
- Added recorded m4a audio for all 6 scan room hotspots (replacing TTS)

### January 2026
- Initial build of all 7 pages
- Added new realistic character images (Anna, Mum, Dr Nicky, Tedrick, Carly)
- Resized images created for faster loading on Say Hello! page
- Implemented text-to-speech for character introductions
- Interactive scan room explorer with 6 hotspots
- Checklist with localStorage and confetti
- Downloadable certificate with html2canvas
- Renamed "Meet the Team" → "Say Hello!", "Nicky" → "Dr Nicky"
- Fixed Netlify case-sensitivity issue (`Tedrick.png`)
- Added character videos for all 5 characters
- Fixed mobile video playback (`preload="auto"`, `playsInline`, Promise handling)
- Updated scan room image, repositioned all 6 hotspots
