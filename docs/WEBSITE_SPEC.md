# Anna's Ultrasound Adventure - Website Specification

## Overview

A companion web app for the children's book "Anna's Ultrasound Adventure" by Dr Moira McCarty. The app helps prepare children aged 4-8 for ultrasound scans while driving sales of the physical book.

**Key Principle:** The app prepares and reinforces - it does NOT replace the book or tell the full story.

**Related Book:** [View on Canva](https://www.canva.com/design/DAG5FoYmt5M/y4P9-0iL5JZj7szeMFRT3A/view?utm_content=DAG5FoYmt5M&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h7dc5b2ebe8)

---

## Current Status

| Page | Route | Status | Description |
|------|-------|--------|-------------|
| Home | `/` | **Complete** | Landing page with animated video background, navigation buttons |
| About & Privacy | `/about` | **Complete** | Author bio, website info, privacy policy |
| Meet the Team | `/team` | Placeholder | Character introductions |
| Explore Scan Room | `/explore` | Placeholder | Interactive hotspot map |
| Getting Ready Checklist | `/checklist` | Placeholder | Preparation checklist with progress tracking |
| Get the Book | `/book` | Placeholder | Book purchase links |
| Certificate | `/certificate` | Not routed | Completion certificate generator |

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

### Characters
| File | Character | Description |
|------|-----------|-------------|
| `anna.png` | Anna | Main character |
| `anna_happy.png` | Anna (happy) | Anna smiling |
| `anna_with_tedrick.png` | Anna + Tedrick | Anna holding her teddy |
| `mum.png` | Mum | Anna's mother |
| `mum_corridor.png` | Mum (corridor) | Mum in hospital corridor |
| `tedrick.png` | Tedrick | Anna's teddy bear |
| `tedrick_scan.png` | Tedrick (scan) | Tedrick during scan |
| `nicky.png` | Nicky | Ultrasound doctor |
| `carly.png` | Carly | Department helper |

### Scenes
| File | Description |
|------|-------------|
| `scan_room.png` | The ultrasound scan room |
| `corridor.png` | Hospital corridor |
| `waiting_room.png` | Hospital waiting room |

### Videos
| File | Aspect Ratio | Usage |
|------|--------------|-------|
| `Animated_Chat_Video_Generation_16by9.mp4` | 16:9 | Desktop background |
| `Animated_Chat_Video_Generation_9by16.mp4` | 9:16 | Mobile background |

### Book Pages
- 20 page images from Parts 5, 6, and 7 of the book
- Format: `part{X}_page{Y}.png`

---

## Page Specifications

### 1. Home Page (`/`) - COMPLETE

**Current Implementation:**
- Animated video background (responsive: 16:9 desktop, 9:16 mobile)
- Video fade effect at start/end of loop
- Hero image of Anna with Tedrick
- App title with tagline "Get ready for your scan!"
- Four main navigation buttons (large, child-friendly)
- About & Privacy link
- Footer attribution

**Navigation Buttons:**
1. "Meet the Team" (pink gradient) → `/team`
2. "Explore the Scan Room" (blue gradient) → `/explore`
3. "Getting Ready Checklist" (green gradient) → `/checklist`
4. "Get the Book" (amber gradient) → `/book`

---

### 2. About & Privacy (`/about`) - COMPLETE

**Current Implementation:**
- Back to Home navigation
- About the Author section (Dr Moira McCarty with photo)
- About This Website section (Dr Odet Mark Aszkenasy)
- Privacy & Copyright section:
  - No tracking, no cookies, no personal data
  - Checklist stored locally only
  - Copyright notice
  - Educational disclaimer

---

### 3. Meet the Team (`/team`) - TO BUILD

**Purpose:** Introduce characters so children feel familiar before reading the book.

**Layout:**
- Grid of 5 character cards (responsive: 1-2 columns mobile, 3+ desktop)
- Back to Home button

**Character Cards:**

| Character | Image | Audio Introduction |
|-----------|-------|-------------------|
| Anna | `anna_happy.png` | "Hi! I'm Anna. I'm going to the hospital for a special scan of my tummy. I was a bit nervous at first, but it was actually fun!" |
| Mum | `mum.png` | "I'm Anna's mum. I stayed with her the whole time during her scan." |
| Tedrick | `tedrick_scan.png` | "I'm Tedrick the teddy bear! I help Anna feel brave. You can bring your own special toy too!" |
| Nicky | `nicky.png` | "Hello! I'm Nicky, the doctor who does the ultrasound scan. It doesn't hurt at all - I promise!" |
| Carly | `carly.png` | "I'm Carly! I help in the ultrasound department. I'll show you where to go and give you a sticker afterwards!" |

**Card Design:**
- Character image (rounded, shadow)
- Character name below image
- Tap/click to play audio
- Speaker icon shows audio state (idle/playing)
- Subtle scale animation on tap
- Gentle highlight when active

**Audio Implementation:**
- Use Web Speech API (SpeechSynthesisUtterance)
- Settings: rate 0.9, pitch 1.1 (friendly child voice)
- Visual indicator while speaking
- Only one character speaks at a time

---

### 4. Explore the Scan Room (`/explore`) - TO BUILD

**Purpose:** Familiarise children with equipment, reducing anxiety.

**Layout:**
- Full-width scan room image (`scan_room.png`)
- Floating hotspot markers with pulse animation
- Info panel slides up from bottom when hotspot tapped
- Back to Home button

**Hotspots:**

| Item | Position (x%, y%) | Name | Child-Friendly Explanation |
|------|-------------------|------|---------------------------|
| Ultrasound Machine | 55%, 45% | "Ultrasound Machine" | "This special machine takes pictures of inside your tummy using sound waves. It doesn't hurt at all!" |
| Probe | 58%, 52% | "Probe" | "This is called a probe. The doctor moves it gently on your skin to take pictures. It feels like a little massage!" |
| Screen | 52%, 30% | "Screen" | "You can watch the pictures appear here. You might see your tummy, your kidneys, or even your breakfast moving around!" |
| Bed | 65%, 65% | "Bed" | "You lie on this comfy bed during your scan. You can bring a teddy to keep you company!" |
| Gel Bottle | 72%, 55% | "Gel" | "This is special gel. It feels warm and a bit squishy. The doctor puts it on your tummy to help take better pictures." |
| Tissue | 78%, 60% | "Tissue" | "When your scan is finished, the doctor wipes off the gel with soft tissue. Easy!" |
| Pictures | 85%, 25% | "Pictures" | "Lots of scan rooms have nice pictures on the walls. Anna's room had a rainbow and some fish!" |

**Hotspot Component:**
- Circular marker (24-32px)
- Pulsing glow animation (subtle opacity/scale oscillation)
- Number or icon inside
- Tap opens info panel

**Info Panel:**
- Slides up from bottom (300ms ease-out)
- Semi-transparent backdrop
- Item name as heading
- Explanation text
- Audio play button (reads explanation)
- "Got it!" dismiss button
- Swipe down or tap backdrop to close

---

### 5. Getting Ready Checklist (`/checklist`) - TO BUILD

**Purpose:** Practical preparation tool for families with persistent progress.

**Layout:**
- Progress bar at top (percentage complete)
- Three collapsible sections
- Individual checkbox items
- Celebration when 100% complete
- Back to Home button

**Checklist Sections:**

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
- Tap checkbox to toggle (satisfying tick animation)
- Optional "pop" sound effect
- Progress bar animates smoothly
- Sections collapsible (chevron indicator)
- Section header shows X/Y items complete

**100% Completion:**
- Confetti animation (react-confetti)
- "You're ready!" celebratory message
- Link to Certificate page appears

**localStorage Schema:**
```javascript
{
  "annas-ultrasound-checklist": {
    "items": {
      "read-story": true,
      "talked": false,
      "comfort-toy": true,
      // ... all item IDs
    },
    "completedAt": "2024-01-15T10:30:00Z" // null if not complete
  }
}
```

---

### 6. Get the Book (`/book`) - TO BUILD

**Purpose:** Drive book sales through clear purchase options.

**Layout:**
- Book cover image (use a book page image or placeholder)
- Book title and author
- Description text
- Three purchase buttons (Kindle, Paperback, Hardback)
- Back to Home button

**Content:**
- Title: "Anna's Ultrasound Adventure"
- Author: "By Dr Moira McCarty"
- Description: "Follow Anna's ultrasound adventure in this beautifully illustrated book. Perfect for reading together before your child's scan."

**Purchase Buttons:**
| Format | Icon | Link (placeholder) |
|--------|------|-------------------|
| Kindle Edition | Book icon | `https://www.amazon.co.uk/dp/XXXXX` |
| Paperback | Book icon | `https://www.amazon.co.uk/dp/XXXXX` |
| Hardback | Book icon | `https://www.amazon.co.uk/dp/XXXXX` |

**Button Design:**
- Large, tappable (min 48px height)
- Amazon orange/yellow colour scheme
- Opens in new tab
- Clear format labels with prices if available

---

### 7. Certificate (`/certificate`) - TO BUILD

**Purpose:** Reward checklist completion, create shareable moment.

**Access Control:**
- Only accessible after checklist is 100% complete
- Redirect to checklist page if incomplete
- Show "Complete your checklist first!" message

**Layout:**
- Certificate background (decorative border, pastel colors)
- Heading: "I was brave like Anna!"
- Subheading: "Certificate of Bravery"
- Name input field (pre-filled from localStorage if returning)
- Auto-filled date
- Anna and Tedrick illustration
- Download button
- Back to Home button

**Certificate Design:**
- Landscape orientation (ideal for printing)
- Decorative border with stars/sparkles
- Character illustrations
- Child's name prominently displayed
- Date of completion
- "Anna's Ultrasound Adventure" branding

**Generation:**
- Use html2canvas to render certificate div
- Download as PNG file
- Filename: `brave-like-anna-certificate.png`

**localStorage:**
```javascript
{
  "annas-ultrasound-certificate": {
    "name": "Emma",
    "generatedAt": "2024-01-15T10:30:00Z"
  }
}
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
- Hotspot pulse: Subtle opacity/scale oscillation (2-3 second loop)
- Confetti: Full screen celebration
- Info panel: Slide up from bottom (300ms)
- Video fade: Opacity transition near loop points

---

## Accessibility Requirements

- All images have descriptive alt text
- Keyboard navigation for all interactive elements
- Focus rings on interactive elements (primary-blue)
- Colour contrast meets WCAG AA standards
- Audio has visual indicator when playing
- Touch targets minimum 48x48px
- Respect `prefers-reduced-motion` media query
- Screen reader friendly labels

---

## Data Files to Create

### `src/data/characters.js`
```javascript
export const characters = [
  {
    id: 'anna',
    name: 'Anna',
    image: 'anna_happy.png',
    audio: "Hi! I'm Anna. I'm going to the hospital for a special scan of my tummy. I was a bit nervous at first, but it was actually fun!"
  },
  {
    id: 'mum',
    name: 'Mum',
    image: 'mum.png',
    audio: "I'm Anna's mum. I stayed with her the whole time during her scan."
  },
  {
    id: 'tedrick',
    name: 'Tedrick',
    image: 'tedrick_scan.png',
    audio: "I'm Tedrick the teddy bear! I help Anna feel brave. You can bring your own special toy too!"
  },
  {
    id: 'nicky',
    name: 'Nicky',
    image: 'nicky.png',
    audio: "Hello! I'm Nicky, the doctor who does the ultrasound scan. It doesn't hurt at all - I promise!"
  },
  {
    id: 'carly',
    name: 'Carly',
    image: 'carly.png',
    audio: "I'm Carly! I help in the ultrasound department. I'll show you where to go and give you a sticker afterwards!"
  }
];
```

### `src/data/hotspots.js`
```javascript
export const hotspots = [
  {
    id: 'machine',
    name: 'Ultrasound Machine',
    x: 55,
    y: 45,
    explanation: "This special machine takes pictures of inside your tummy using sound waves. It doesn't hurt at all!"
  },
  {
    id: 'probe',
    name: 'Probe',
    x: 58,
    y: 52,
    explanation: "This is called a probe. The doctor moves it gently on your skin to take pictures. It feels like a little massage!"
  },
  {
    id: 'screen',
    name: 'Screen',
    x: 52,
    y: 30,
    explanation: "You can watch the pictures appear here. You might see your tummy, your kidneys, or even your breakfast moving around!"
  },
  {
    id: 'bed',
    name: 'Bed',
    x: 65,
    y: 65,
    explanation: "You lie on this comfy bed during your scan. You can bring a teddy to keep you company!"
  },
  {
    id: 'gel',
    name: 'Gel',
    x: 72,
    y: 55,
    explanation: "This is special gel. It feels warm and a bit squishy. The doctor puts it on your tummy to help take better pictures."
  },
  {
    id: 'tissue',
    name: 'Tissue',
    x: 78,
    y: 60,
    explanation: "When your scan is finished, the doctor wipes off the gel with soft tissue. Easy!"
  },
  {
    id: 'pictures',
    name: 'Pictures',
    x: 85,
    y: 25,
    explanation: "Lots of scan rooms have nice pictures on the walls. Anna's room had a rainbow and some fish!"
  }
];
```

### `src/data/checklistItems.js`
```javascript
export const checklistSections = [
  {
    id: 'before',
    title: 'Before the Day',
    emoji: '📅',
    items: [
      { id: 'read-story', label: "Read Anna's story together" },
      { id: 'talked', label: 'Talked about what will happen' },
      { id: 'comfort-toy', label: 'Chose a comfort toy to bring' },
      { id: 'practise-still', label: 'Practised lying still for a few minutes' }
    ]
  },
  {
    id: 'day-of',
    title: 'On the Day',
    emoji: '🏥',
    items: [
      { id: 'comfy-clothes', label: 'Wore comfy clothes (easy to lift top up)' },
      { id: 'drinks', label: 'Had drinks if the hospital asked' },
      { id: 'packed-toy', label: 'Packed our comfort toy' },
      { id: 'arrived', label: 'Arrived at the hospital' }
    ]
  },
  {
    id: 'after',
    title: 'After the Scan',
    emoji: '🎉',
    items: [
      { id: 'sticker', label: 'Got my brave sticker!' },
      { id: 'treat', label: 'Chose a treat' }
    ]
  }
];
```

---

## Hooks to Create

### `src/hooks/useLocalStorage.js`
```javascript
import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
```

### `src/hooks/useSpeech.js`
```javascript
import { useState, useCallback } from 'react';

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const speak = useCallback((text, id) => {
    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setCurrentId(id);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentId(null);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setCurrentId(null);
    };

    speechSynthesis.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
    setCurrentId(null);
  }, []);

  return { speak, stop, isSpeaking, currentId };
}
```

---

## Implementation Order

1. **Data files** - Create characters.js, hotspots.js, checklistItems.js
2. **Hooks** - Create useLocalStorage.js, useSpeech.js
3. **Team Page** - Character cards with audio
4. **Explore Page** - Interactive hotspot map
5. **Checklist Page** - Progress tracking with localStorage
6. **Book Page** - Purchase links
7. **Certificate Page** - Generation with html2canvas
8. **Polish** - Animations, accessibility, testing

---

## Future Enhancements

1. **Recorded audio** - Replace TTS with Dr McCarty's voice recordings
2. **Additional scan types** - Heart, hip, head scan variations
3. **Multiple languages** - Welsh and other languages
4. **Parent mode** - Additional info and tips for parents
5. **Offline support** - Service worker for offline use
6. **Analytics** - Track feature usage (with consent)
7. **Print-friendly** - Printable checklist and certificate
