# Anna's Ultrasound Adventure - Web App Specification

## Overview

A companion web app for the children's book "Anna's Ultrasound Adventure" by Dr Moira McCarty. The app helps prepare children for ultrasound scans while driving sales of the physical book.

**Key Principle:** The app prepares and reinforces - it does NOT replace the book or tell the full story.

## Target Audience
- Primary: Children aged 4-8 years having an ultrasound scan
- Secondary: Parents/carers preparing children for the appointment

## Tech Stack
- **Framework:** React (Vite)
- **Styling:** Tailwind CSS
- **Storage:** localStorage for checklist progress
- **Audio:** HTML5 Audio API (text-to-speech initially, replace with recorded audio later)
- **Hosting:** Static site (Netlify, Vercel, or GitHub Pages)

---

## App Structure

### 1. Home Screen (`/`)

**Layout:**
- App title: "Anna's Ultrasound Adventure"
- Tagline: "Get ready for your scan!"
- 4 large, child-friendly buttons:
  1. 👋 Meet the Team
  2. 🏥 Explore the Scan Room
  3. ✅ Getting Ready Checklist
  4. 📚 Get the Book

**Design:**
- Soft blue background (#E8F4FD)
- Warm orange accents (#F97316)
- Rounded corners on everything
- Large tap targets (min 48px)
- Use character images from book as decorations

---

### 2. Meet the Team (`/team`)

**Purpose:** Introduce the characters so children feel familiar before reading the book.

**Layout:** Carousel or grid of 5 character cards

**Characters:**

| Character | Image | Audio Script |
|-----------|-------|--------------|
| Anna | anna_happy.png | "Hi! I'm Anna. I'm going to the hospital for a special scan of my tummy. I was a bit nervous at first, but it was actually fun!" |
| Mum | mum.png | "I'm Anna's mum. I stayed with her the whole time during her scan." |
| Tedrick | tedrick_scan.png | "I'm Tedrick the teddy bear! I help Anna feel brave. You can bring your own special toy too!" |
| Nicky | nicky.png | "Hello! I'm Nicky, the doctor who does the ultrasound scan. It doesn't hurt at all - I promise!" |
| Carly | carly.png | "I'm Carly! I help in the ultrasound department. I'll show you where to go and give you a sticker afterwards!" |

**Interactions:**
- Tap card to play audio introduction
- Card gently highlights when tapped
- Speaker icon indicates audio is playing

---

### 3. Explore the Scan Room (`/explore`)

**Purpose:** Familiarise children with equipment they'll see, reducing anxiety.

**Layout:** 
- Full-width scan room image (`scan_room.png`)
- Overlay with tappable hotspots that pulse gently
- Info panel slides up from bottom when hotspot tapped

**Hotspots:**

| Item | Position (%) | Name | Explanation |
|------|--------------|------|-------------|
| Ultrasound machine | x:55, y:45 | "Ultrasound Machine" | "This special machine takes pictures of inside your tummy using sound waves. It doesn't hurt at all!" |
| Probe | x:58, y:52 | "Probe" | "This is called a probe. The doctor moves it gently on your skin to take pictures. It feels like a little massage!" |
| Screen | x:52, y:30 | "Screen" | "You can watch the pictures appear here. You might see your tummy, your kidneys, or even your breakfast moving around!" |
| Bed | x:65, y:65 | "Bed" | "You lie on this comfy bed during your scan. You can bring a teddy to keep you company!" |
| Gel bottle | x:72, y:55 | "Gel" | "This is special gel. It feels warm and a bit squishy. The doctor puts it on your tummy to help take better pictures." |
| Tissue | x:78, y:60 | "Tissue" | "When your scan is finished, the doctor wipes off the gel with soft tissue. Easy!" |
| Pictures | x:85, y:25 | "Pictures" | "Lots of scan rooms have nice pictures on the walls. Anna's room had a rainbow and some fish!" |

**Interactions:**
- Hotspots pulse with gentle glow animation
- Tap to show info panel with name, image highlight, and explanation
- Play audio of explanation
- "Got it!" button to dismiss

---

### 4. Getting Ready Checklist (`/checklist`)

**Purpose:** Practical preparation tool for families. Saves progress between sessions.

**Layout:**
- Progress bar at top showing completion percentage
- Three collapsible sections
- Checkbox items with satisfying tick animation
- Celebration when 100% complete

**Checklist Items:**

**Before the Day**
- [ ] Read Anna's story together
- [ ] Talked about what will happen  
- [ ] Chose a comfort toy to bring
- [ ] Practised lying still for a few minutes

**On the Day**
- [ ] Wore comfy clothes (easy to lift top up)
- [ ] Had drinks if the hospital asked
- [ ] Packed our comfort toy
- [ ] Arrived at the hospital

**After the Scan**
- [ ] Got my brave sticker!
- [ ] Chose a treat

**Interactions:**
- Tap item to toggle checkbox
- Satisfying "pop" sound and tick animation
- Progress bar animates smoothly
- When 100% complete: confetti animation + "You're ready!" message + unlock certificate

**Storage:**
- Save to localStorage: `{ checklist: { item_id: boolean }, completedAt: timestamp }`

---

### 5. Get the Book (`/book`)

**Purpose:** Drive book sales.

**Layout:**
- Book cover image (placeholder for now)
- Title: "Anna's Ultrasound Adventure"
- Author: "By Dr Moira McCarty"
- Description: "Follow Anna's ultrasound adventure in this beautifully illustrated book. Perfect for reading together before your child's scan."
- Three purchase buttons:
  - 📱 Kindle Edition
  - 📖 Paperback
  - 📕 Hardback

**Links (placeholders - replace with actual URLs):**
- Kindle: `https://www.amazon.co.uk/dp/XXXXX`
- Paperback: `https://www.amazon.co.uk/dp/XXXXX`
- Hardback: `https://www.amazon.co.uk/dp/XXXXX`

---

### 6. Certificate (`/certificate`)

**Purpose:** Reward completion, create shareable moment.

**Access:** Only available after checklist 100% complete

**Layout:**
- Certificate background with decorative border
- "I was brave like Anna!" heading
- Input field for child's name
- Auto-filled date
- Anna and Tedrick illustration
- "Download" and "Share" buttons

**Features:**
- Generate as PNG for download
- Use html2canvas or similar library
- Store name in localStorage for return visits

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
--white: #FFFFFF;
```

### Typography
- Headings: Rounded, friendly font (e.g., Nunito, Quicksand)
- Body: Clean, readable (e.g., Inter)
- Large sizes throughout for accessibility

### Components
- Buttons: Rounded (16px radius), large (min-height 48px), with subtle shadow
- Cards: White background, rounded corners, soft shadow
- Hotspots: Circular with pulsing glow animation

### Animations
- Page transitions: Gentle fade
- Checkbox tick: Scale + opacity
- Hotspot pulse: Subtle opacity/scale oscillation
- Confetti: Use react-confetti or similar
- Info panel: Slide up from bottom

---

## File Structure

```
annas-ultrasound-app/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── characters/
│   │   │   │   ├── anna.png
│   │   │   │   ├── anna_happy.png
│   │   │   │   ├── mum.png
│   │   │   │   ├── tedrick.png
│   │   │   │   ├── nicky.png
│   │   │   │   └── carly.png
│   │   │   └── scenes/
│   │   │       ├── scan_room.png
│   │   │       └── corridor.png
│   │   └── audio/
│   │       └── (placeholder - add later)
│   ├── components/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Checkbox.jsx
│   │   ├── Hotspot.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── InfoPanel.jsx
│   │   └── Confetti.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Team.jsx
│   │   ├── Explore.jsx
│   │   ├── Checklist.jsx
│   │   ├── Book.jsx
│   │   └── Certificate.jsx
│   ├── data/
│   │   ├── characters.js
│   │   ├── hotspots.js
│   │   └── checklistItems.js
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## Data Files

### `characters.js`
```javascript
export const characters = [
  {
    id: 'anna',
    name: 'Anna',
    image: '/images/characters/anna_happy.png',
    audio: 'Hi! I\'m Anna. I\'m going to the hospital for a special scan of my tummy. I was a bit nervous at first, but it was actually fun!'
  },
  // ... etc
];
```

### `hotspots.js`
```javascript
export const hotspots = [
  {
    id: 'machine',
    name: 'Ultrasound Machine',
    x: 55,
    y: 45,
    explanation: 'This special machine takes pictures of inside your tummy using sound waves. It doesn\'t hurt at all!'
  },
  // ... etc
];
```

### `checklistItems.js`
```javascript
export const checklistSections = [
  {
    id: 'before',
    title: 'Before the Day',
    items: [
      { id: 'read-story', label: 'Read Anna\'s story together' },
      { id: 'talked', label: 'Talked about what will happen' },
      // ... etc
    ]
  },
  // ... etc
];
```

---

## Audio Implementation

### Phase 1: Text-to-Speech (MVP)
Use Web Speech API for initial version:
```javascript
const speak = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9;
  utterance.pitch = 1.1;
  speechSynthesis.speak(utterance);
};
```

### Phase 2: Recorded Audio (Future)
Replace with MP3 files recorded by Moira or professional voice actor.

---

## localStorage Schema

```javascript
{
  "annas-ultrasound-app": {
    "checklist": {
      "read-story": true,
      "talked": false,
      // ... all checklist item IDs
    },
    "completedAt": "2024-01-15T10:30:00Z",  // when checklist hit 100%
    "certificateName": "Emma",
    "lastVisit": "2024-01-15T10:30:00Z"
  }
}
```

---

## Accessibility

- All images have descriptive alt text
- Buttons are keyboard accessible
- Sufficient colour contrast (WCAG AA)
- Audio has visual indicator when playing
- Touch targets minimum 48x48px
- Reduced motion option respects `prefers-reduced-motion`

---

## Browser Support

- Chrome (last 2 versions)
- Safari (last 2 versions)
- Firefox (last 2 versions)
- Edge (last 2 versions)
- iOS Safari
- Android Chrome

---

## Deployment

Static site deployment to:
- **Option 1:** Netlify (recommended - easy, free tier)
- **Option 2:** Vercel
- **Option 3:** GitHub Pages

Custom domain: e.g., `ultrasound.annasadventure.co.uk` or similar

---

## Future Enhancements

1. **Recorded audio** - Replace TTS with Moira's voice
2. **Additional scan types** - Heart, hip, head versions
3. **Multiple languages** - Welsh, other languages
4. **Parent mode** - Additional info for parents about preparation
5. **Offline support** - Service worker for offline use
6. **Analytics** - Track feature usage (with consent)

---

## Getting Started with Claude Code

To begin building:

1. Create new Vite + React project
2. Install Tailwind CSS
3. Copy images from `assets/images/` to `public/images/`
4. Build Home page first
5. Add routing (react-router-dom)
6. Build each page in order: Home → Team → Explore → Checklist → Book → Certificate
7. Add localStorage persistence
8. Add animations
9. Test on mobile devices
10. Deploy

Run these commands to start:
```bash
npm create vite@latest . -- --template react
npm install
npm install -D tailwindcss postcss autoprefixer
npm install react-router-dom react-confetti html2canvas
npx tailwindcss init -p
```
