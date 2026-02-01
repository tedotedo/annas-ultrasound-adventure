# Anna's Ultrasound Adventure - Website Specification

## Overview

A companion web app for the children's book "Anna's Ultrasound Adventure" by Dr Moira McCarty. The app helps prepare children aged 4-8 for ultrasound scans while driving sales of the physical book.

**Key Principle:** The app prepares and reinforces - it does NOT replace the book or tell the full story.

**Related Book:** [View on Canva](https://www.canva.com/design/DAG5FoYmt5M/y4P9-0iL5JZj7szeMFRT3A/view?utm_content=DAG5FoYmt5M&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h7dc5b2ebe8)

**Character Images Source:** [iLoveIMG](https://images.net/app/my-images) - Use this for resizing character images if needed.

---

## Current Status

| Page | Route | Status | Description |
|------|-------|--------|-------------|
| Home | `/` | **Complete** | Landing page with animated video background, navigation buttons |
| About & Privacy | `/about` | **Complete** | Author bio, website info, privacy policy |
| Say Hello! | `/team` | **Complete** | Character cards with text-to-speech audio |
| Explore Scan Room | `/explore` | **Complete** | Interactive hotspot map with slide-up info panels |
| Getting Ready Checklist | `/checklist` | **Complete** | Preparation checklist with localStorage progress and confetti |
| Get the Book | `/book` | **Complete** | Book preview and purchase links |
| Certificate | `/certificate` | **Complete** | Downloadable PNG certificate (requires checklist completion) |

---

## Tech Stack

- **Framework:** React 19 + Vite 7
- **Styling:** Tailwind CSS 4
- **Routing:** React Router DOM 7
- **Storage:** localStorage for checklist progress
- **Audio:** Web Speech API (text-to-speech)
- **Effects:** react-confetti for celebrations
- **Export:** html2canvas for certificate generation
- **Hosting:** Netlify (static site)

---

## Available Assets

### Characters (Full Size)
Located in `assets/images/characters/`

| File | Character | Description |
|------|-----------|-------------|
| `anna.jpg` | Anna | Main character (new image) |
| `annas-mum.jpg` | Mum | Anna's mother (new image) |
| `Tedrick.png` | Tedrick | Anna's teddy bear (new image) |
| `nicky.jpg` | Dr Nicky | Ultrasound doctor (new image) |
| `carly.png` | Carly | Department helper (new image) |
| `anna.png` | Anna | Original book character |
| `anna_happy.png` | Anna (happy) | Anna smiling |
| `anna_with_tedrick.png` | Anna + Tedrick | Anna holding her teddy |
| `mum.png` | Mum | Original mum image |
| `mum_corridor.png` | Mum (corridor) | Mum in hospital corridor |
| `tedrick_scan.png` | Tedrick (scan) | Tedrick during scan |
| `nicky.png` | Nicky | Original doctor image |

### Characters (Resized for Web)
Located in `assets/images/characters/reszied_images/`

| File | Size | Used In |
|------|------|---------|
| `anna.jpg` | 55 KB | Say Hello! page |
| `annas-mum.jpg` | 38 KB | Say Hello! page |
| `Tedrick.png` | 791 KB | Say Hello! page |
| `nicky.jpg` | 41 KB | Say Hello! page |
| `carly.png` | 721 KB | Say Hello! page |

**Note:** Resized images are used for faster page loads on the Say Hello! page. Full-size images are used on the Certificate page for better print quality.

### Scenes
Located in `assets/images/scenes/`

| File | Description |
|------|-------------|
| `scan_room.png` | The ultrasound scan room |
| `corridor.png` | Hospital corridor |
| `waiting_room.png` | Hospital waiting room |

### Background Videos
Located in `assets/images/scenes/`

| File | Aspect Ratio | Usage |
|------|--------------|-------|
| `Animated_Chat_Video_Generation_16by9.mp4` | 16:9 | Desktop background |
| `Animated_Chat_Video_Generation_9by16.mp4` | 9:16 | Mobile background |

### Character Videos
Located in `assets/images/characters/`

| File | Character | Usage |
|------|-----------|-------|
| `anna_explains_nothing_to_be_scared_of.mp4` | Anna | Say Hello! page - plays on card click |
| `annas-mum-video.mp4` | Mum | Say Hello! page - plays on card click |
| `tedrick-portrait-video.mp4` | Tedrick | Say Hello! page - plays on card click |
| `carly.mp4` | Carly | Say Hello! page - plays on card click |
| `drnicky.mp4` | Dr Nicky | Say Hello! page - plays on card click |

### Book Pages
Located in `assets/images/pages/`
- 20+ page images from the book
- Format: `part{X}_page{Y}.png` (e.g., `part5_page01.png`)

---

## Page Specifications

### 1. Home Page (`/`) - COMPLETE

**Implementation:**
- Animated video background (responsive: 16:9 desktop, 9:16 mobile)
- Video fade effect at start/end of loop
- Hero image of scan room
- App title with tagline "Get ready for your scan with Anna and Tedrick!"
- Four main navigation buttons (large, child-friendly)
- About & Privacy link
- Footer attribution

**Navigation Buttons:**
1. "Say Hello!" (pink gradient) → `/team`
2. "Explore the Scan Room" (blue gradient) → `/explore`
3. "Getting Ready Checklist" (green gradient) → `/checklist`
4. "Get the Book" (amber gradient) → `/book`

---

### 2. About & Privacy (`/about`) - COMPLETE

**Implementation:**
- Back to Home navigation
- About the Author section (Dr Moira McCarty with photo)
- About This Website section (Dr Odet Mark Aszkenasy)
- Privacy & Copyright section:
  - No tracking, no cookies, no personal data
  - Checklist stored locally only
  - Copyright notice
  - Educational disclaimer

---

### 3. Say Hello! (`/team`) - COMPLETE

**Purpose:** Introduce characters so children feel familiar before reading the book.

**Implementation:**
- Grid of 5 character cards (responsive: 2 columns mobile, 3 columns desktop)
- Back to Home button
- Tap card to play character video with audio introduction
- Video plays inline with controls (playsInline, preload="auto" for mobile compatibility)
- Uses resized images as poster/thumbnail for faster loading
- Videos include: Anna, Mum, Tedrick, Dr Nicky, Carly

**Characters:**

| Character | Image | Audio Introduction |
|-----------|-------|-------------------|
| Anna | `anna.jpg` | "Hi! I'm Anna. I'm going to the hospital for a special scan of my tummy. I was a bit nervous at first, but it was actually fun!" |
| Mum | `annas-mum.jpg` | "I'm Anna's mum. I stayed with her the whole time during her scan." |
| Tedrick | `Tedrick.png` | "I'm Tedrick the teddy bear! I help Anna feel brave. You can bring your own special toy too!" |
| Dr Nicky | `nicky.jpg` | "Hello! I'm Dr Nicky, the doctor who does the ultrasound scan. It doesn't hurt at all - I promise!" |
| Carly | `carly.png` | "I'm Carly! I help in the ultrasound department. I'll show you where to go and give you a sticker afterwards!" |

---

### 4. Explore the Scan Room (`/explore`) - COMPLETE

**Purpose:** Familiarise children with equipment, reducing anxiety.

**Implementation:**
- Full-width scan room image (`scan-room.png` in assets/images/)
- 6 interactive hotspots with pulse animation
- Info panel slides up from bottom when hotspot tapped
- Recorded audio plays for each hotspot (with TTS fallback)
- "Got it!" button to dismiss
- Legend buttons below image for easy access

**Hotspots with Recorded Audio:**

| Item | Position (x%, y%) | Audio File | Caption |
|------|-------------------|------------|---------|
| Screen | 73.2%, 34.0% | `screen.m4a` | "This is the screen where you can watch the pictures! You'll be able to see inside your tummy, you might even see your breakfast moving around. It's like magic!" |
| Ultrasound Machine | 68.5%, 51.8% | `ultrasound-machine.m4a` | "This clever machine is called an ultrasound scanner. It uses sound waves to peek inside your body and make pictures. It's completely silent and gentle - you won't feel anything!" |
| Probe | 65.4%, 47.4% | `probe.m4a` | "This is the probe. It needs special gel to help it glide smoothly over your tummy and take clear pictures. The gel feels a bit squidgy!" |
| Couch | 82.2%, 62.9% | `couch.m4a` | "This is the comfy couch where you lie for your scan. Would you like to bring a cuddly toy like Tedrick with you?" |
| Gel | 99.2%, 60.5% | `gel.m4a` | "This is the special gel that goes on your tummy. It feels a bit squidgy! It helps us take clear pictures." |
| Tissue Paper | 78.7%, 53.9% | `tissues.m4a` | "These are soft tissues for wiping off the gel when we've finished" |

**Audio Files Location:** `assets/` folder

---

### 5. Getting Ready Checklist (`/checklist`) - COMPLETE

**Purpose:** Practical preparation tool for families with persistent progress.

**Implementation:**
- Progress bar at top (percentage complete)
- Three collapsible sections with emoji icons
- Individual checkbox items with tick animation
- Progress saved to localStorage
- Confetti animation when 100% complete
- Link to Certificate page appears on completion
- Reset button to clear progress

**Checklist Sections:**

**Before the Day (📅)**
- Read Anna's story together
- Talked about what will happen
- Chose a comfort toy to bring
- Practised lying still for a few minutes

**On the Day (🏥)**
- Wore comfy clothes (easy to lift top up)
- Had drinks if the hospital asked
- Packed our comfort toy
- Arrived at the hospital

**After the Scan (🎉)**
- Got my brave sticker!
- Chose a treat

**localStorage Key:** `annas-ultrasound-checklist`

---

### 6. Get the Book (`/book`) - COMPLETE

**Purpose:** Drive book sales through clear purchase options.

**Implementation:**
- Book cover image preview
- Book title and author
- Description text
- Three purchase buttons (Kindle, Paperback, Hardback)
- Links open in new tab
- Back to Home button

**Purchase Links:** Currently placeholders (`https://www.amazon.co.uk/dp/XXXXX`) - need to be updated with actual Amazon URLs.

---

### 7. Certificate (`/certificate`) - COMPLETE

**Purpose:** Reward checklist completion, create shareable moment.

**Implementation:**
- Access control: Redirects to checklist if not 100% complete
- Name input field (saved to localStorage)
- Live certificate preview with:
  - Decorative border with stars
  - "I Was Brave Like Anna!" heading
  - Child's name
  - Current date
  - Anna and Tedrick images
- Download as PNG button (uses html2canvas at 2x scale)
- Uses full-size character images for print quality

**localStorage Key:** `annas-ultrasound-certificate`

---

## Project Structure

```
src/
├── main.jsx                 # React app entry point
├── App.jsx                  # Root component with routing
├── index.css               # Global styles and animations
├── data/
│   ├── characters.js       # Character data with audio scripts
│   ├── hotspots.js         # Scan room hotspot positions
│   └── checklistItems.js   # Checklist sections and items
├── hooks/
│   ├── useLocalStorage.js  # Persistent state hook
│   └── useSpeech.js        # Text-to-speech hook
└── pages/
    ├── Home.jsx            # Landing page
    ├── About.jsx           # About & Privacy
    ├── Team.jsx            # Say Hello! (characters)
    ├── Explore.jsx         # Scan room explorer
    ├── Checklist.jsx       # Getting ready checklist
    ├── Book.jsx            # Purchase links
    └── Certificate.jsx     # Downloadable certificate
```

---

## Design System

### Colours
```css
--primary-blue: #3B82F6;
--soft-blue: #E8F4FD;
--warm-orange: #F97316;
--soft-orange: #FFF7ED;
--text-dark: #1E293B;
--text-light: #64748B;
--success-green: #22C55E;
```

### Typography
- **Headings:** Nunito (weights: 600, 700, 800)
- **Body:** Inter (weights: 400, 500, 600)
- Large sizes throughout for child accessibility

### Components
- **Buttons:** Rounded (16px radius), min-height 48px, subtle shadow, hover scale
- **Cards:** White background, rounded corners, soft shadow
- **Hotspots:** Circular with pulsing glow animation
- **Progress bar:** Rounded ends, smooth animation

### Animations
- Page transitions: Gentle fade
- Checkbox tick: Scale + opacity (satisfying feel)
- Hotspot pulse: Subtle opacity/scale oscillation
- Confetti: Full screen celebration (react-confetti)
- Info panel: Slide up from bottom (300ms)
- Video fade: Opacity transition near loop points

---

## Accessibility

- All images have descriptive alt text
- Keyboard navigation for all interactive elements
- Focus rings on interactive elements (primary-blue)
- Colour contrast meets WCAG AA standards
- Audio has visual indicator when playing
- Touch targets minimum 48x48px
- Screen reader friendly labels

---

## Deployment

- **Platform:** Netlify
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **SPA routing:** Configured in `netlify.toml`

**Important:** Netlify uses a case-sensitive Linux filesystem. Ensure all import paths match exact file casing (e.g., `Tedrick.png` not `tedrick.png`).

---

## Future Enhancements

1. **Recorded audio** - Replace TTS with Dr McCarty's voice recordings
2. **Additional scan types** - Heart, hip, head scan variations
3. **Multiple languages** - Welsh and other languages
4. **Parent mode** - Additional info and tips for parents
5. **Offline support** - Service worker for offline use
6. **Analytics** - Track feature usage (with consent)
7. **Print-friendly** - Printable checklist and certificate
8. **Actual Amazon links** - Replace placeholder URLs with real book purchase links

---

## Changelog

### January 2025
- Initial implementation of all pages
- Added new character images (Anna, Mum, Dr Nicky, Tedrick, Carly)
- Created resized versions for faster loading on Say Hello! page
- Implemented text-to-speech for character introductions
- Added interactive scan room explorer with hotspots
- Built checklist with localStorage persistence and confetti celebration
- Created downloadable certificate with html2canvas
- Renamed "Meet the Team" to "Say Hello!" for friendlier UX
- Renamed "Nicky" to "Dr Nicky"
- Fixed case-sensitive filename issue for Netlify deployment (Tedrick.png)
- Added character videos for all 5 characters on Say Hello! page
- Fixed video playback on mobile (preload="auto", playsInline, promise handling)
- Updated scan room image to new scan-room.png
- Repositioned all 6 hotspots with accurate coordinates:
  - Screen (73.2%, 34.0%)
  - Ultrasound Machine (68.5%, 51.8%)
  - Probe (65.4%, 47.4%)
  - Couch (82.2%, 62.9%)
  - Gel (99.2%, 60.5%)
  - Tissue Paper (78.7%, 53.9%)
- Updated child-friendly explanations for all scan room hotspots

### How to Update Hotspot Voice Scripts
To change the voice/text for scan room hotspots:
1. Record new audio in Voice Memos app on iPhone
2. Add the .m4a file to `assets/` folder
3. Update `src/data/hotspots.js` - change the `explanation` field for the caption text
4. Update `src/pages/Explore.jsx` - import the audio file and add to `audioFiles` map

### February 2025
- Added recorded audio for all 6 scan room hotspots (replacing TTS)
- Audio files: screen.m4a, ultrasound-machine.m4a, probe.m4a, couch.m4a, gel.m4a, tissues.m4a
- Updated all hotspot captions to match recordings
